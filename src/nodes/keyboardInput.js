const {RIVEN, Ø}  = require('../riven')

RIVEN.lib.KeyboardInput = function (id, rect, val) {
  RIVEN.Node.call(this, id, rect)

  this.glyph = 'M60,60 L60,60 L240,60 L240,240 L60,240 Z M240,150 L240,150 L150,150 L150,240'
  this.label = val ? `${this.id}=${val}` : this.id

  document.addEventListener('keydown', (e) => { this.handleKeyDown(e) })

  this.text = ''

  this.handleKeyDown = function (evt) {
    const char = evt.keyCode
    const key = String.fromCharCode(char)

    const isLetter = (key >= 'a' && key <= 'z');
    const isNumber = (key >= '0' && key <= '9');


    if(char == 8) {
      this.text = this.text.substring(0, this.text.length - 1);
    } else if (/[a-z]/i.test(key) || key == ' ') {
      this.text += key
    } else {
      return
    }

    this.send(this.text)
  }

  this.receive = function (q) {
    this.send(this.text)
  }
}
