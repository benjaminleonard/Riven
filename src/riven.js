// "Don't forget, the portal combination's in my journal."" — Catherine
const Snabbdom = require('snabbdom-pragma')

const snabbdom = require('snabbdom')
const patch = snabbdom.init([
  require('snabbdom/modules/class').default,
  require('snabbdom/modules/props').default,
  require('snabbdom/modules/attributes').default,
  require('snabbdom/modules/style').default,
  require('snabbdom/modules/eventlisteners').default
])
const h = require('snabbdom/h').default

// Globals

function Riven () {
  this.lib = {}
  this.network = {}

  const GRID_SIZE = 20
  const PORT_TYPES = { default: 0, input: 1, output: 2, request: 3, answer: 4, entry: 5, exit: 6 }

  this.setup = function () {
    this.el = document.getElementById('container')

    this.cur = new RIVEN.Cursor()
    this.cur.install(this)
  }

  this.add = function (node) {
    this.network[node.id] = node

    this.render()
  }

  this.render = function () {
    window.requestAnimationFrame(() => {
      const newEl = this.concatNodes()
      this.el = patch(this.el, newEl)
    })
  }

  this.concatNodes = function () {
    const nodes = this.renderNodes()
    const routes = this.renderRoutes()
    const html = this.renderHTMLTags()

    if(nodes.length == 0 || routes.length == 0) return this.el

    return (
      <main
        id="container"
        style={{
          transform: `translate(${parseInt(this.cur.offset.x)}px,${parseInt(this.cur.offset.y)}px)`
        }}
      >
        <div id="inline_html">
          {html}
        </div>
        
        <svg
          id="riven"
        >
          <g id="routes">
            {routes}
          </g>
          <g id="nodes">
            {nodes}
          </g>
        </svg>
      </main>
    )
  }

  this.renderNodes = function () {
    let nodeData = []

    for(const id in this.network) {
      const node = this.network[id]
      nodeData.push(this.renderNode(node))
    }

    return nodeData
  }

  this.renderRoutes = function () {
    let nodeData = []

    for(const id in this.network) {
      const node = this.network[id]
      nodeData.push(this.renderRoute(node))
    }

    return nodeData
  }

  this.renderHTMLTags = function () {
    let nodeData = []

    for(const id in this.network) {
      const node = this.network[id]
      const tag = this.renderHTMLTag(node)

      if(node.html) {
        nodeData.push(tag)
      }
    }

    return nodeData
  }

  this.renderRoute = function (node) {
    const routes = this.drawRoutes(node)

    return routes
  }

  this.drawPorts = (node) => {
    let portData = []

    Object.keys(node.ports).reduce((acc, val, id) => {
      portData.push(this.drawPort(node.ports[val]))
    }, '')

    return portData
  }

  this.renderNode = (node) => {
    const rect = getRect(node)
    const ports = this.drawPorts(node)
    const glyph = this.drawGlyph(node)

    return (
      <g
        id={`node_${node.id}`}
        className="node"
        on-click={[this.nodeClickHandler, node]}
      >
        <rect
          rx={2}
          ry={2}
          x={rect.x}
          y={rect.y - (GRID_SIZE / 2)}
          width={rect.w}
          height={rect.h}
        />
        <text
          x={rect.x + (rect.w / 2) + (GRID_SIZE * 0.3)}
          y={rect.y + rect.h + (GRID_SIZE * 0.2)}
        >
          {node.label}
        </text>
        {ports}
        {glyph}
      </g>
    )
  }

  this.renderHTMLTag = (node) => {
    const rect = getRect(node)
    const html = this.drawHTMLTag(node)
    const width = node.inlineWidth * GRID_SIZE
    const height = node.inlineHeight * GRID_SIZE

    return (
      <div
        id={`html_${node.id}`}
        className='inline-output'
        style={{
          transform: `translate(${rect.x + (GRID_SIZE*2)}px, ${rect.y + (GRID_SIZE * 1.5) - height}px)`,
          width: `${width}px`,
          height: `${height}px`
        }}
      >
        {html}
      </div>
    )
  }

  this.nodeClickHandler = (node) => {
    console.log(node)
    // if(!node.handleClick) return
    // node.handleClick(node.id)
  }

  this.drawPorts = (node) => {
    let portData = []

    Object.keys(node.ports).reduce((acc, val, id) => {
      portData.push(this.drawPort(node.ports[val]))
    }, '')

    return portData
  }

  this.drawPort = (port) => {
    const pos = port ? getPortPosition(port) : { x: 0, y: 0 }
    const r = GRID_SIZE / 6

    return (
      <svg
        id={`${port.host.id}_port_${port.id}`}
        x={pos.x - r}
        y={pos.y - r}
        on-click={[this.portClickHandler, port]}
      >
        <g
          className={`port ${port.id}`}
        >
          <path
            d={`M${r},0 L${r*2},${r} L${r},${r*2} L0,${r} Z`}
          />
        </g>
      </svg>
    )
  }

  this.drawGlyph = (node) => {
    const rect = getRect(node)

    return (
      <path
        className="glyph"
        style={{
          transform: `translate(${rect.x + (GRID_SIZE / 4)}px, ${rect.y - (GRID_SIZE / 4)}px) scale(0.1)`
        }}
        d={node.glyph}
      />
    )
  }

  this.drawHTMLTag = (node) => {
    const rect = getRect(node)
    const html = node.html

    // console.log(html);

    // if(!html) return

    // html.style.transform = `translate(${rect.x + (GRID_SIZE / 4)}px, ${rect.y - (GRID_SIZE / 4)}px)`

    return html
  }

  this.portClickHandler = (port) => {
    console.log(port);
    // if(!node.handleClick) return
    // node.handleClick(node.id)
  }

  this.drawRoutes = (node) => {
    let routes = []
    for (const id in node.ports) {
      const port = node.ports[id]
      for (const routeId in port.routes) {
        const route = port.routes[routeId]
        if (!route) { continue }
        routes.push(this.drawConnection(port, route))
      }
    }

    return routes
  }

  this.drawConnection = (a, b) => {
    if (isBidirectional(a.host, b.host)) {
      return a.type !== PORT_TYPES.output ? this.drawConnectionBidirectional(a, b) : ''
    }
    return a.type === PORT_TYPES.output || a.type === PORT_TYPES.output ? this.drawConnectionOutput(a, b) : this.drawConnectionRequest(a, b)
  }

  function isBidirectional (a, b) {
    for (const id in a.ports.output.routes) {
      const routeA = a.ports.output.routes[id]
      for (const id in a.ports.request.routes) {
        const routeB = a.ports.request.routes[id]
        if (routeA.host.id === routeB.host.id) {
          return true
        }
      }
    }
    return false
  }

  const outputPath = (posA, posB, posM, posC1, posC2) => `M${posA.x},${posA.y} L${posA.x + GRID_SIZE},${posA.y} Q${posC1.x},${posC1.y} ${posM.x},${posM.y} Q ${posC2.x},${posC2.y} ${posB.x - GRID_SIZE},${posB.y} L${posB.x},${posB.y}`
  const bidirectionalRoutePath = (posA, posB, posM) => `M${posA.x},${posA.y} L${posA.x},${posA.y + GRID_SIZE} L${posA.x},${posM.y} L${posB.x},${posM.y} L${posB.x},${posB.y - GRID_SIZE} L${posB.x},${posB.y}`
  const disconnectPath = (posM, r) => `M${posM.x - r},${posM.y - r} L${posM.x + r},${posM.y + r} M${posM.x + r},${posM.y - r} L${posM.x - r},${posM.y + r}`

  this.drawConnectionOutput = (a, b) => {
    const posA = getPortPosition(a)
    const posB = getPortPosition(b)
    const posM = middle(posA, posB)
    const posC1 = { x: (posM.x + (posA.x + GRID_SIZE)) / 2, y: posA.y }
    const posC2 = { x: (posM.x + (posB.x - GRID_SIZE)) / 2, y: posB.y }

    const r = GRID_SIZE / 4

    return (
      <g
        className="route-wrapper"
      >
        <path
          className="route output"
          d={outputPath(posA, posB, posM, posC1, posC2)}
        />
        <path
          className="route route-hover-area"
          d={outputPath(posA, posB, posM, posC1, posC2)}
          on-click={[this.routeClickHandler, a, b]}
        />
        <path
        className="route route-disconnect"
          d={disconnectPath(posM, r)}
          on-click={[this.routeClickHandler, a, b]}
        />
      </g>
    )
  }

  this.routeClickHandler = (a, b) => {
    a.disconnect(b.host.id)
    this.render()
  }

  this.drawConnectionRequest = (a, b) => {
    const posA = getPortPosition(a)
    const posB = getPortPosition(b)
    const posM = middle(posA, posB)

    const r = GRID_SIZE / 4

    return (
      <g
        className="route-wrapper"
      >
        <path
          className="route request"
          d={bidirectionalRoutePath(posA, posB, posM)}
        />
        <path
          className="route route-hover-area"
          d={bidirectionalRoutePath(posA, posB, posM)}
          on-click={[this.routeClickHandler, a, b]}
        />
        <path
          className="route route-disconnect"
          d={disconnectPath(posM, r)}
          on-click={[this.routeClickHandler, a, b]}
        />
      </g>
    )
  }

  this.drawConnectionBidirectional = (a, b) => {
    const posA = getPortPosition(a)
    const posB = getPortPosition(b)
    const posM = middle(posA, posB)

    const r = GRID_SIZE / 4

    const path = `M${posA.x},${posA.y} L${posA.x},${posA.y + GRID_SIZE}
        L${posA.x},${posM.y} L${posB.x},${posM.y}
        L${posB.x},${posB.y - GRID_SIZE} L${posB.x},${posB.y}`


    return h('path', {attrs: {
        class: `route bidirectional`,
        d: `M${posA.x},${posA.y} L${posA.x},${posA.y + GRID_SIZE}
            L${posA.x},${posM.y} L${posB.x},${posM.y}
            L${posB.x},${posB.y - GRID_SIZE} L${posB.x},${posB.y}`
      }}
    )
  }


  function getRect (node) {
    const w = node.rect.w * GRID_SIZE
    const h = node.rect.h * GRID_SIZE
    let x = node.rect.x * GRID_SIZE
    let y = node.rect.y * GRID_SIZE

    if (node.parent) {
      const offset = getRect(node.parent)
      x += offset.x + (2 * GRID_SIZE)
      y += offset.y + (2 * GRID_SIZE)
    }
    return { x: x, y: y, w: w, h: h }
  }

  function middle (a, b) {
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
  }

  function getPortPosition (port) {
    const rect = getRect(port.host)
    let offset = { x: 0, y: 0 }

    if (port.type === PORT_TYPES.output || port.type === PORT_TYPES.exit) {
      offset = { x: rect.w, y: (rect.h - (GRID_SIZE * 1.5)) }
    } else if (port.type === PORT_TYPES.input || port.type === PORT_TYPES.entry) {
      offset = { x: 0, y: GRID_SIZE / 2 }
    } else if (port.type === PORT_TYPES.answer) {
      offset = { x: GRID_SIZE, y: -GRID_SIZE * 0.5 }
    } else if (port.type === PORT_TYPES.request) {
      offset = { x: (rect.w - (GRID_SIZE)), y: (rect.h - (GRID_SIZE / 2)) }
    }
    return { x: rect.x + offset.x, y: rect.y + offset.y }
  }
}

const RIVEN = new Riven()

// QUERY

function Ø (id) {
  return RIVEN.network[id] ? RIVEN.network[id] : new RIVEN.Node(id)
}

// NODE

RIVEN.Node = function (id, rect = { x: 0, y: 0, w: 2, h: 2 }) {
  const PORT_TYPES = { default: 0, input: 1, output: 2, request: 3, answer: 4, entry: 5, exit: 6 }

  this.id = id
  this.ports = {}
  this.rect = rect
  this.parent = null
  this.children = []
  this.label = id
  this.name = this.constructor.name.toLowerCase()
  this.glyph = 'M155,65 A90,90 0 0,1 245,155 A90,90 0 0,1 155,245 A90,90 0 0,1 65,155 A90,90 0 0,1 155,65 Z'

  this.setup = function (pos) {
    this.ports.input = new this.Port(this, 'in', PORT_TYPES.input)
    this.ports.output = new this.Port(this, 'out', PORT_TYPES.output)
    this.ports.answer = new this.Port(this, 'answer', PORT_TYPES.answer)
    this.ports.request = new this.Port(this, 'request', PORT_TYPES.request)
    this.rect.x = pos.x
    this.rect.y = pos.y
  }

  this.create = function (pos = { x: 0, y: 0 }, Type, ...params) {
    if (!Type) { console.warn(`Unknown NodeType for #${this.id}`); return this }
    const node = new Type(this.id, rect, ...params)
    node.setup(pos)
    RIVEN.add(node)
    return node
  }

  // Connect

  this.connect = function (q, syphon) {
    if (q instanceof Array) {
      for (const id in q) {
        this.connect(q[id], syphon)
      }
    } else if (Ø(q)) {
      const port = (syphon ? this.ports.request : this.ports.output)
      const target = syphon ? Ø(q).ports.answer : Ø(q).ports.input

      if (!port) { console.warn(`Unknown: ${q}`); return }
      port.connect(target)
    } else {
      console.warn(`Unknown ${q}`)
    }

    RIVEN.render()
  }

  this.syphon = function (q) {
    this.connect(q, true)
  }

  this.bind = function (q) {
    this.connect(q)
    this.syphon(q)
  }

  // SEND/RECEIVE

  this.send = function (payload) {
    for (const routeId in this.ports.output.routes) {
      const route = this.ports.output.routes[routeId]
      if (!route) { continue }
      route.host.receive(payload, this, route)
    }

    RIVEN.render()
  }

  this.receive = function (q, origin, route) {
    const port = this.ports.output
    for (const routeId in port.routes) {
      const route = port.routes[routeId]
      if (route) {
        route.host.receive(q, this, route)
      }
    }
  }

  this.bang = function () {
    this.send(true)
  }

  // REQUEST/ANSWER

  this.request = function (q) {
    const payload = {}
    for (const routeId in this.ports.request.routes) {
      const route = this.ports.request.routes[routeId]
      if (!route) { continue }
      const answer = route.host.answer(q, this, route)
      if (!answer) { continue }
      payload[route.host.id] = answer
    }
    return payload
  }

  this.answer = function (q, origin, route) {
    return this.request(q)
  }

  // Target

  this.signal = function (target) {
    for (const portId in this.ports) {
      const port = this.ports[portId]
      for (const routeId in port.routes) {
        const route = port.routes[routeId]
        if (!route || !route.host || route.host.id !== target.toLowerCase()) { continue }
        return route.host
      }
    }
    return null
  }

  // PORT

  this.Port = function (host, id, type = PORT_TYPES.default) {
    this.host = host
    this.id = id
    this.type = type
    this.routes = []

    this.connect = function (port) {
      if (!port) { console.warn(`Unknown port from: ${this.host.id}`); return }

      this.routes.push(port)
    }

    this.disconnect = function (node) {
      this.routes = this.routes.filter((item) => {
        return item.host.id !== node
      })
    }
  }
}

RIVEN.Cursor = function () {
  this.pos = { x: 0, y: 0 }
  this.offset =  { x: 0, y: 0 }
  this.origin = null

  this.install = function (host) {
    this.host = host
    document.addEventListener('mousedown', (e) => { this.touch({ x: e.clientX, y: e.clientY }, true); e.preventDefault() })
    document.addEventListener('mousemove', (e) => { this.touch({ x: e.clientX, y: e.clientY }, false); e.preventDefault() })
    document.addEventListener('mouseup', (e) => { this.touch({ x: e.clientX, y: e.clientY }); e.preventDefault() })
  }

  this.update = function () {
    this.host.render()
  }

  this.touch = function (pos, click = null) {
    if (click === true) {
      this.origin = pos
      return
    }
    if (this.origin) {
      this.offset.x += parseInt(pos.x - this.origin.x)
      this.offset.y += parseInt(pos.y - this.origin.y)
      this.update()
      this.origin = pos
    }
    if (click === null) {
      this.origin = null
      return
    }
    this.pos = pos
  }
}

module.exports = {
  RIVEN: RIVEN,
  Ø: Ø
}
