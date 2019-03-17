const {RIVEN, Ø}  = require('../riven')

RIVEN.lib.Bang = function (id, rect) {
  RIVEN.Node.call(this, id, rect)
  this.glyph = 'M60,60 L60,60 L150,120 L240,120 M60,150 L60,150 L240,150 M60,240 L60,240 L150,180 L240,180'

  this.receive = function (q) {
    this.label = `${this.id}(bang!)`
    this.send(this)
  }
  
  this.handleClick = (node) => {
    this.send(this)
  }
}
