const {RIVEN, Ø}  = require('./riven')

require('./nodes/print')
require('./nodes/add')
require('./nodes/concat')
require('./nodes/value')
require('./nodes/interval')
require('./nodes/console')
require('./nodes/bang')
require('./nodes/InlineOutput')
require('./nodes/text')
require('./nodes/keyboardInput')
require('./nodes/font')
require('./nodes/randomName')

document.addEventListener('DOMContentLoaded', () => {
  RIVEN.setup()

  const lib = RIVEN.lib

  RIVEN.create = (append = true) => {
    Ø("bang").create({x:2,y:14},lib.Bang)
    Ø("interval").create({x:2,y:10},lib.Interval,5000)

    Ø("randomName").create({x:8,y:14},lib.RandomName)
    Ø("text").create({x:14,y:14},lib.Text)
    Ø("font").create({x:14,y:18},lib.Font, 'Chronicle Display')

    Ø("keyInput").create({x:8,y:18},lib.KeyboardInput)
    Ø("console").create({x:20,y:10},lib.Console)

    Ø("output").create({x:24,y:14},lib.InlineOutput)

    Ø("randomName").connect(["console"])
    Ø("bang").connect(["keyInput"])
    Ø("interval").connect(["randomName"])
    Ø("randomName").connect(["text"])
    Ø("text").syphon(["font"])
    Ø("text").connect(["output"])
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
