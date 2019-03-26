const Snabbdom = require('snabbdom-pragma')
const {RIVEN, Ø}  = require('../riven')

RIVEN.lib.Text = function (id, rect, val) {
  RIVEN.Node.call(this, id, rect)

  this.glyph = 'M60,60 L60,60 L240,60 L240,240 L60,240 Z M240,150 L240,150 L150,150 L150,240'
  this.label = val ? `${this.id}=${val}` : this.id
  
  this.enabledPorts = ['in', 'out', 'request']

  this.el = function (q, styles) {
    return <h1 style={styles}>{q}</h1>
  }

  this.receive = function (q) {
    const request = this.request()
    let styles = {}

    for(let n in request) {
      let node = request[n]
      styles[node.type] = `${node.val}`
    }

    this.send(this.el(q, styles))
  }
}
