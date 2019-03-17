const {RIVEN, Ø}  = require('../riven')

RIVEN.lib.Font = function (id, rect, val) {
  RIVEN.Node.call(this, id, rect)

  this.glyph = 'M60,60 L60,60 L240,60 L240,240 L60,240 Z M240,150 L240,150 L150,150 L150,240'
  this.label = val ? `${this.id}=${val}` : this.id

  this.answer = function (q) {
    return {type: 'font', val: val}
  }

  this.receive = function (q) {
    this.send(val)
  }
}
