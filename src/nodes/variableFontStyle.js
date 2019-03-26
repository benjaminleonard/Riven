const {RIVEN, Ø}  = require('../riven')

RIVEN.lib.VariableFontStyle = function (id, rect, val, units) {
  RIVEN.Node.call(this, id, rect)

  this.enabledPorts = ['request', 'answer']

  // this.key = Object.keys(val)
  // this.connectedValue = val[this.key]

  this.glyph = 'M60,60 L60,60 L240,60 L240,240 L60,240 Z M240,150 L240,150 L150,150 L150,240'
  // 
  // this.receive = function (q) {
  //   const request = this.request()
  //   this.props = []
  // 
  //   for(let n in request) {
  //     let node = request[n]
  //     this.props.push(`'${node.type}' ${node.val}`)
  //   }
  // }

  this.answer = function (q) {
    const request = this.request()
    this.props = []
    
    for(let n in request) {
      let node = request[n]
      this.props.push(`'${node.type}' ${node.val}`)
    }
    
    if(!this.props) return
    
    const joinedProps = `${this.props.join(', ')}`
    this.setLabel(joinedProps)
    return {type: 'fontVariationSettings', val: joinedProps}
  }

  this.setLabel = function(value) {
    this.label = value ? `${this.id}=${value}` : this.id
  }
  // 
  // this.setLabel(this.connectedValue)
  // 
  // this.update = function () {
  //   if(!this.onUpdate) return
  // 
  //   this.onUpdate(this.connectedValue)
  // }
}
