const {RIVEN, Ø}  = require('./riven')

require('./nodes/print')
require('./nodes/add')
require('./nodes/concat')
require('./nodes/value')
require('./nodes/interval')
require('./nodes/console')
require('./nodes/bang')
require('./nodes/inlineOutput')
require('./nodes/text')
require('./nodes/keyboardInput')
require('./nodes/fontStyle')
require('./nodes/variableFontStyle')
require('./nodes/randomName')
require('./nodes/sine')
require('./nodes/bangOnUpdate')
require('./nodes/remap')

document.addEventListener('DOMContentLoaded', () => {
  RIVEN.setup()

  const lib = RIVEN.lib

  RIVEN.create = (append = true) => {
    // SECTION 1
    Ø("draw").create({x:0,y:18},lib.Interval, 16.67)
    Ø("string").create({x:8,y:14},lib.Value, "variable")
    Ø("letterSpacing").create({x:22,y:22},lib.FontStyle, {letterSpacing: '5'}, 'px')
    Ø("fontFamily").create({x:14,y:22},lib.FontStyle, {fontFamily: 'Contra-animation'})
    Ø("fontSize").create({x:18,y:26},lib.FontStyle, {fontSize: '80'}, 'px')
    Ø("variableFontStyle").create({x:24,y:26},lib.VariableFontStyle)
    Ø("variableWeight").create({x:22,y:32},lib.FontStyle, {wdth: 100})
    Ø("variableMisc").create({x:26,y:30},lib.FontStyle, {misc: 20})
    Ø("text").create({x:14,y:14},lib.Text)
    Ø("sine").create({x:8,y:28},lib.Sine, 0.02)
    Ø("remap").create({x:13,y:28},lib.Remap, [-1, 1, 0, 100, 2])
    Ø("output").create({x:24,y:14},lib.InlineOutput)

    Ø("sine").connect(["remap"])
    Ø("remap").connect(["variableWeight"])
    Ø("draw").connect(["string"])
    Ø("string").connect(["text"])
    Ø("text").connect(["output"])
    Ø("variableFontStyle").syphon(["variableWeight", "variableMisc"])
    Ø("draw").connect(["sine"])
    Ø("text").syphon(["fontSize", "fontFamily", "variableFontStyle", "letterSpacing"])

    
    // SECTION 2
    Ø("test").create({x:0,y:40},lib.Interval, 16.67)

  }

  RIVEN.create(true)
  // Ø("bang").bang()
});
