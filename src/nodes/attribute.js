const {RIVEN, Ø}  = require('../riven')

RIVEN.lib.Attribute = function (id, rect, val) {
  RIVEN.Node.call(this, id, rect)
  
  this.key = Object.keys(val)
  this.connectedValue = val[this.key]

  this.glyph = 'M60,60 L60,60 L240,60 L240,240 L60,240 Z M240,150 L240,150 L150,150 L150,240'
  this.label = val ? `${this.id}=${this.connectedValue}` : this.id
  
  this.receive = function (q) {
    if(q) this.connectedValue = q
  }

  this.answer = function (q) {
    const value = this.connectedValue ? this.connectedValue : val[this.key]
    return {type: this.key, val: value}
  }
}
