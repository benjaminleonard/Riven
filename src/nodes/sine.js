const {RIVEN, Ø}  = require('../riven')
const {round} = require('../util')

RIVEN.lib.Sine = function (id, rect, val) {
  RIVEN.Node.call(this, id, rect)

  this.enabledPorts = ['in', 'out']

  this.t = 0
  this.delta = 0.01

  this.receive = function (q) {
    this.send(this.getSine())
  }

  this.getSine = function () {
    this.t = this.t + this.delta
    const sin = Math.sin(this.t)
    this.label = sin ? `${this.id}=${round(sin, 1)}` : this.id
    return sin
  }
}
