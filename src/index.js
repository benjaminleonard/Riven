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
require('./nodes/attribute')
require('./nodes/randomName')
require('./nodes/sine')
require('./nodes/bangOnUpdate')
require('./nodes/remap')

document.addEventListener('DOMContentLoaded', () => {
  RIVEN.setup()

  const lib = RIVEN.lib

  RIVEN.create = (append = true) => {
    Ø("interval").create({x:2,y:18},lib.Interval, 16.67)

    // Ø("keyInput").create({x:8,y:14},lib.KeyboardInput)
    // Ø("string").create({x:8,y:14},lib.Value, "Test")
    Ø("randomName").create({x:8,y:14},lib.RandomName)
    // Ø("text").create({x:14,y:14},lib.Text)
    Ø("fontFamily").create({x:14,y:22},lib.Attribute, {fontFamily: 'Chronicle Display'})
    Ø("fontSize").create({x:18,y:26},lib.Attribute, {fontSize: '40'}, 'px')
    // Ø("fontSize").create({x:14,y:18},lib.FontSize, 'Chronicle Display')

    Ø("bang").create({x:2,y:14},lib.Bang)
    Ø("bangOnUpdate").create({x:14,y:14},lib.BangOnUpdate,[
      Ø("text").create({x:0,y:0},lib.Text)
    ], "text", "text")

    // Ø("console").create({x:24,y:30},lib.Console)

    Ø("sine").create({x:8,y:28},lib.Sine)
    Ø("remap").create({x:13,y:28},lib.Remap, [-1, 1, 10, 80, 2])

    // Ø("keyInput").create({x:4,y:18},lib.KeyboardInput)

    Ø("output").create({x:24,y:14},lib.InlineOutput)

    Ø("sine").connect(["remap"])
    Ø("remap").connect(["fontSize"])


    Ø("bang").connect(["randomName"])
    Ø("randomName").connect(["bangOnUpdate"])
    Ø("bangOnUpdate").connect(["output"])
    // Ø("string").connect(["text"])
    Ø("interval").connect(["sine"])
    // Ø("keyInput").connect(["text"])
    // Ø("text").syphon(["fontFamily"])
    Ø("bangOnUpdate").syphon(["fontSize", "fontFamily"])
    // Ø("text").connect(["output"])
    // Ø("bang").ports[1].disconnect(Ø("string"))

    // // Int nodes
    // Ø("add").create({x:14,y:4},lib.Add)
    // Ø("int1").create({x:12,y:8},lib.Value,2)
    // Ø("int2").create({x:16,y:8},lib.Value,5)
    // Ø("print_int").create({x:20,y:4},lib.Print)
    //
    // // Str nodes
    // Ø("concat").create({x:14,y:12},lib.Concat)
    // Ø("str1").create({x:12,y:16},lib.Value,"hello")
    // Ø("str2").create({x:16,y:16},lib.Value,"world")
    // Ø("print_str").create({x:20,y:12},lib.Console)
    //
    // Ø("bang").connect(["add","concat"])
    // Ø("add").connect(["print_int"])
    // Ø("add").syphon(["int1","int2"])
    // Ø("concat").syphon(["str1","str2"])
    // Ø("concat").connect(["print_str"])
    //
    // Ø("int3").create({x:22,y:8},lib.Value,2)
    // Ø("int4").create({x:26,y:8},lib.Value,8)
    // Ø("add2").create({x:24,y:4},lib.Add)
    // Ø("print_int2").create({x:28,y:4},lib.Print)
  }

  RIVEN.create(true)
  Ø("bang").bang()
});
