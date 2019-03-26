const {RIVEN, Ø}  = require('../riven')

RIVEN.lib.Interval = function (id, rect, val) {
  RIVEN.Node.call(this, id, rect)
  this.glyph = 'M60,60 L60,60 L150,120 L240,120 M60,150 L60,150 L240,150 M60,240 L60,240 L150,180 L240,180'
  this.label = val ? `${this.id}=${val}ms` : this.id

  this.enabledPorts = ['out']

  this.interval = setInterval(() => {
    this.send(this)
  }, val)
}
