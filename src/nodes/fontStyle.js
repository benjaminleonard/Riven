const {RIVEN, Ø}  = require('../riven')

RIVEN.lib.FontStyle = function (id, rect, val, units) {
  RIVEN.Node.call(this, id, rect)

  this.enabledPorts = ['in', 'answer']

  this.key = Object.keys(val)
  this.connectedValue = val[this.key]

  this.glyph = 'M60,60 L60,60 L240,60 L240,240 L60,240 Z M240,150 L240,150 L150,150 L150,240'

  this.receive = function (q) {
    if(q) this.connectedValue = q

    this.update()
  }

  this.answer = function (q) {
    let value = this.connectedValue ? this.connectedValue : val[this.key]
    if(units) value = value + units
    this.setLabel(value)
    return {type: this.key[0], val: value}
  }

  this.setLabel = function(value) {
    this.label = value ? `${this.id}=${value}` : this.id
  }

  this.setLabel(this.connectedValue)

  this.update = function () {
    if(!this.onUpdate) return

    this.onUpdate(this.connectedValue)
  }
}
