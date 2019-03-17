const {RIVEN, Ø}  = require('../riven')

RIVEN.lib.Output = function (id, rect, html) {
  RIVEN.Node.call(this, id, rect)

  this.glyph = 'M65,65 L65,65 L245,65 M65,125 L65,125 L245,125 M65,185 L65,185 L245,185 M65,245 L65,245 L245,245 '

  this.receive = function (q) {
    this.container = document.querySelector('#output')
    this.container.innerHTML = q
  }
}
