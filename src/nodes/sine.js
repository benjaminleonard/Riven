const {RIVEN, Ø}  = require('../riven')

RIVEN.lib.Sine = function (id, rect, val) {
  RIVEN.Node.call(this, id, rect)

  this.t = 0
  this.delta = 0.01

  this.receive = function (q) {
    this.send(this.getSine())
  }
  
  this.getSine = function () {
    this.t = this.t + this.delta
    return Math.sin(this.t) * 100
  }
}