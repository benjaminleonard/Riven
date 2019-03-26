const {RIVEN, Ø}  = require('../riven')

RIVEN.lib.Remap = function (id, rect, val) {
  RIVEN.Node.call(this, id, rect)
  this.glyph = 'M60,60 L60,60 L150,120 L240,120 M60,150 L60,150 L240,150 M60,240 L60,240 L150,180 L240,180'
  this.label = val ? `${this.id}=${val}` : this.id

  this.receive = function (q) {
    let mappedVal = mapRange(q, val[0], val[1], val[2], val[3])

    // Round with optional fifth value
    let decimals = val[4]
    if(decimals !== undefined) {
      mappedVal = round(mappedVal, decimals)
    }
    this.label = val ? `${this.id}=${val}:${mappedVal}` : this.id
    this.send(mappedVal)
  }

  function mapRange(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1)
  }

  function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals)
  }
}
