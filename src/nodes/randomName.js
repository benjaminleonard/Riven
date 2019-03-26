const axios = require('axios')
const {RIVEN, Ø}  = require('../riven')

RIVEN.lib.RandomName = function (id, rect, val) {
  RIVEN.Node.call(this, id, rect)

  const url = 'https://randomuser.me/api/'

  this.answer = function (q) {
    return val
  }

  this.receive = function (q) {
    axios.get(url)
    .then((data) => {
      const name = data.data.results[0].name
      const joinedName = `${name.first} ${name.last}`

      this.label = joinedName ? `${this.id}=${joinedName}` : this.id
      this.send(joinedName)
    })
  }
}
