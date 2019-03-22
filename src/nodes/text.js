const Snabbdom = require('snabbdom-pragma')
const {RIVEN, Ø}  = require('../riven')

RIVEN.lib.Text = function (id, rect, val) {
  RIVEN.Node.call(this, id, rect)

  this.glyph = 'M60,60 L60,60 L240,60 L240,240 L60,240 Z M240,150 L240,150 L150,150 L150,240'
  this.label = val ? `${this.id}=${val}` : this.id

  this.el = function (q, fontFamily, fontSize) {
    return <h1 style={{
      fontFamily: fontFamily,
      fontSize: fontSize
    }}>{q}</h1>
  }

  this.receive = function (q) {
    const request = this.request()
    let fontFamily = 'sans-serif'
    let fontSize = '20px'

    for(n in request) {
      let node = request[n]
      if(node.type == 'fontFamily') {
        fontFamily = node.val
      }
      
      if(node.type == 'fontSize') {
        fontSize = `${node.val}px`
      }
    }
    
    this.send(this.el(q, fontFamily, fontSize))
  }
}
