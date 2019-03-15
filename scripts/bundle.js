(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vnode_1 = require("./vnode");
var is = require("./is");
function addNS(data, children, sel) {
    data.ns = 'http://www.w3.org/2000/svg';
    if (sel !== 'foreignObject' && children !== undefined) {
        for (var i = 0; i < children.length; ++i) {
            var childData = children[i].data;
            if (childData !== undefined) {
                addNS(childData, children[i].children, children[i].sel);
            }
        }
    }
}
function h(sel, b, c) {
    var data = {}, children, text, i;
    if (c !== undefined) {
        data = b;
        if (is.array(c)) {
            children = c;
        }
        else if (is.primitive(c)) {
            text = c;
        }
        else if (c && c.sel) {
            children = [c];
        }
    }
    else if (b !== undefined) {
        if (is.array(b)) {
            children = b;
        }
        else if (is.primitive(b)) {
            text = b;
        }
        else if (b && b.sel) {
            children = [b];
        }
        else {
            data = b;
        }
    }
    if (children !== undefined) {
        for (i = 0; i < children.length; ++i) {
            if (is.primitive(children[i]))
                children[i] = vnode_1.vnode(undefined, undefined, undefined, children[i], undefined);
        }
    }
    if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' &&
        (sel.length === 3 || sel[3] === '.' || sel[3] === '#')) {
        addNS(data, children, sel);
    }
    return vnode_1.vnode(sel, data, children, text, undefined);
}
exports.h = h;
;
exports.default = h;

},{"./is":3,"./vnode":11}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createElement(tagName) {
    return document.createElement(tagName);
}
function createElementNS(namespaceURI, qualifiedName) {
    return document.createElementNS(namespaceURI, qualifiedName);
}
function createTextNode(text) {
    return document.createTextNode(text);
}
function createComment(text) {
    return document.createComment(text);
}
function insertBefore(parentNode, newNode, referenceNode) {
    parentNode.insertBefore(newNode, referenceNode);
}
function removeChild(node, child) {
    node.removeChild(child);
}
function appendChild(node, child) {
    node.appendChild(child);
}
function parentNode(node) {
    return node.parentNode;
}
function nextSibling(node) {
    return node.nextSibling;
}
function tagName(elm) {
    return elm.tagName;
}
function setTextContent(node, text) {
    node.textContent = text;
}
function getTextContent(node) {
    return node.textContent;
}
function isElement(node) {
    return node.nodeType === 1;
}
function isText(node) {
    return node.nodeType === 3;
}
function isComment(node) {
    return node.nodeType === 8;
}
exports.htmlDomApi = {
    createElement: createElement,
    createElementNS: createElementNS,
    createTextNode: createTextNode,
    createComment: createComment,
    insertBefore: insertBefore,
    removeChild: removeChild,
    appendChild: appendChild,
    parentNode: parentNode,
    nextSibling: nextSibling,
    tagName: tagName,
    setTextContent: setTextContent,
    getTextContent: getTextContent,
    isElement: isElement,
    isText: isText,
    isComment: isComment,
};
exports.default = exports.htmlDomApi;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.array = Array.isArray;
function primitive(s) {
    return typeof s === 'string' || typeof s === 'number';
}
exports.primitive = primitive;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xlinkNS = 'http://www.w3.org/1999/xlink';
var xmlNS = 'http://www.w3.org/XML/1998/namespace';
var colonChar = 58;
var xChar = 120;
function updateAttrs(oldVnode, vnode) {
    var key, elm = vnode.elm, oldAttrs = oldVnode.data.attrs, attrs = vnode.data.attrs;
    if (!oldAttrs && !attrs)
        return;
    if (oldAttrs === attrs)
        return;
    oldAttrs = oldAttrs || {};
    attrs = attrs || {};
    // update modified attributes, add new attributes
    for (key in attrs) {
        var cur = attrs[key];
        var old = oldAttrs[key];
        if (old !== cur) {
            if (cur === true) {
                elm.setAttribute(key, "");
            }
            else if (cur === false) {
                elm.removeAttribute(key);
            }
            else {
                if (key.charCodeAt(0) !== xChar) {
                    elm.setAttribute(key, cur);
                }
                else if (key.charCodeAt(3) === colonChar) {
                    // Assume xml namespace
                    elm.setAttributeNS(xmlNS, key, cur);
                }
                else if (key.charCodeAt(5) === colonChar) {
                    // Assume xlink namespace
                    elm.setAttributeNS(xlinkNS, key, cur);
                }
                else {
                    elm.setAttribute(key, cur);
                }
            }
        }
    }
    // remove removed attributes
    // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)
    // the other option is to remove all attributes with value == undefined
    for (key in oldAttrs) {
        if (!(key in attrs)) {
            elm.removeAttribute(key);
        }
    }
}
exports.attributesModule = { create: updateAttrs, update: updateAttrs };
exports.default = exports.attributesModule;

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function updateClass(oldVnode, vnode) {
    var cur, name, elm = vnode.elm, oldClass = oldVnode.data.class, klass = vnode.data.class;
    if (!oldClass && !klass)
        return;
    if (oldClass === klass)
        return;
    oldClass = oldClass || {};
    klass = klass || {};
    for (name in oldClass) {
        if (!klass[name]) {
            elm.classList.remove(name);
        }
    }
    for (name in klass) {
        cur = klass[name];
        if (cur !== oldClass[name]) {
            elm.classList[cur ? 'add' : 'remove'](name);
        }
    }
}
exports.classModule = { create: updateClass, update: updateClass };
exports.default = exports.classModule;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function invokeHandler(handler, vnode, event) {
    if (typeof handler === "function") {
        // call function handler
        handler.call(vnode, event, vnode);
    }
    else if (typeof handler === "object") {
        // call handler with arguments
        if (typeof handler[0] === "function") {
            // special case for single argument for performance
            if (handler.length === 2) {
                handler[0].call(vnode, handler[1], event, vnode);
            }
            else {
                var args = handler.slice(1);
                args.push(event);
                args.push(vnode);
                handler[0].apply(vnode, args);
            }
        }
        else {
            // call multiple handlers
            for (var i = 0; i < handler.length; i++) {
                invokeHandler(handler[i], vnode, event);
            }
        }
    }
}
function handleEvent(event, vnode) {
    var name = event.type, on = vnode.data.on;
    // call event handler(s) if exists
    if (on && on[name]) {
        invokeHandler(on[name], vnode, event);
    }
}
function createListener() {
    return function handler(event) {
        handleEvent(event, handler.vnode);
    };
}
function updateEventListeners(oldVnode, vnode) {
    var oldOn = oldVnode.data.on, oldListener = oldVnode.listener, oldElm = oldVnode.elm, on = vnode && vnode.data.on, elm = (vnode && vnode.elm), name;
    // optimization for reused immutable handlers
    if (oldOn === on) {
        return;
    }
    // remove existing listeners which no longer used
    if (oldOn && oldListener) {
        // if element changed or deleted we remove all existing listeners unconditionally
        if (!on) {
            for (name in oldOn) {
                // remove listener if element was changed or existing listeners removed
                oldElm.removeEventListener(name, oldListener, false);
            }
        }
        else {
            for (name in oldOn) {
                // remove listener if existing listener removed
                if (!on[name]) {
                    oldElm.removeEventListener(name, oldListener, false);
                }
            }
        }
    }
    // add new listeners which has not already attached
    if (on) {
        // reuse existing listener or create new
        var listener = vnode.listener = oldVnode.listener || createListener();
        // update vnode for listener
        listener.vnode = vnode;
        // if element changed or added we add all needed listeners unconditionally
        if (!oldOn) {
            for (name in on) {
                // add listener if element was changed or new listeners added
                elm.addEventListener(name, listener, false);
            }
        }
        else {
            for (name in on) {
                // add listener if new listener added
                if (!oldOn[name]) {
                    elm.addEventListener(name, listener, false);
                }
            }
        }
    }
}
exports.eventListenersModule = {
    create: updateEventListeners,
    update: updateEventListeners,
    destroy: updateEventListeners
};
exports.default = exports.eventListenersModule;

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function updateProps(oldVnode, vnode) {
    var key, cur, old, elm = vnode.elm, oldProps = oldVnode.data.props, props = vnode.data.props;
    if (!oldProps && !props)
        return;
    if (oldProps === props)
        return;
    oldProps = oldProps || {};
    props = props || {};
    for (key in oldProps) {
        if (!props[key]) {
            delete elm[key];
        }
    }
    for (key in props) {
        cur = props[key];
        old = oldProps[key];
        if (old !== cur && (key !== 'value' || elm[key] !== cur)) {
            elm[key] = cur;
        }
    }
}
exports.propsModule = { create: updateProps, update: updateProps };
exports.default = exports.propsModule;

},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Bindig `requestAnimationFrame` like this fixes a bug in IE/Edge. See #360 and #409.
var raf = (typeof window !== 'undefined' && (window.requestAnimationFrame).bind(window)) || setTimeout;
var nextFrame = function (fn) { raf(function () { raf(fn); }); };
var reflowForced = false;
function setNextFrame(obj, prop, val) {
    nextFrame(function () { obj[prop] = val; });
}
function updateStyle(oldVnode, vnode) {
    var cur, name, elm = vnode.elm, oldStyle = oldVnode.data.style, style = vnode.data.style;
    if (!oldStyle && !style)
        return;
    if (oldStyle === style)
        return;
    oldStyle = oldStyle || {};
    style = style || {};
    var oldHasDel = 'delayed' in oldStyle;
    for (name in oldStyle) {
        if (!style[name]) {
            if (name[0] === '-' && name[1] === '-') {
                elm.style.removeProperty(name);
            }
            else {
                elm.style[name] = '';
            }
        }
    }
    for (name in style) {
        cur = style[name];
        if (name === 'delayed' && style.delayed) {
            for (var name2 in style.delayed) {
                cur = style.delayed[name2];
                if (!oldHasDel || cur !== oldStyle.delayed[name2]) {
                    setNextFrame(elm.style, name2, cur);
                }
            }
        }
        else if (name !== 'remove' && cur !== oldStyle[name]) {
            if (name[0] === '-' && name[1] === '-') {
                elm.style.setProperty(name, cur);
            }
            else {
                elm.style[name] = cur;
            }
        }
    }
}
function applyDestroyStyle(vnode) {
    var style, name, elm = vnode.elm, s = vnode.data.style;
    if (!s || !(style = s.destroy))
        return;
    for (name in style) {
        elm.style[name] = style[name];
    }
}
function applyRemoveStyle(vnode, rm) {
    var s = vnode.data.style;
    if (!s || !s.remove) {
        rm();
        return;
    }
    if (!reflowForced) {
        getComputedStyle(document.body).transform;
        reflowForced = true;
    }
    var name, elm = vnode.elm, i = 0, compStyle, style = s.remove, amount = 0, applied = [];
    for (name in style) {
        applied.push(name);
        elm.style[name] = style[name];
    }
    compStyle = getComputedStyle(elm);
    var props = compStyle['transition-property'].split(', ');
    for (; i < props.length; ++i) {
        if (applied.indexOf(props[i]) !== -1)
            amount++;
    }
    elm.addEventListener('transitionend', function (ev) {
        if (ev.target === elm)
            --amount;
        if (amount === 0)
            rm();
    });
}
function forceReflow() {
    reflowForced = false;
}
exports.styleModule = {
    pre: forceReflow,
    create: updateStyle,
    update: updateStyle,
    destroy: applyDestroyStyle,
    remove: applyRemoveStyle
};
exports.default = exports.styleModule;

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vnode_1 = require("./vnode");
var is = require("./is");
var htmldomapi_1 = require("./htmldomapi");
function isUndef(s) { return s === undefined; }
function isDef(s) { return s !== undefined; }
var emptyNode = vnode_1.default('', {}, [], undefined, undefined);
function sameVnode(vnode1, vnode2) {
    return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
}
function isVnode(vnode) {
    return vnode.sel !== undefined;
}
function createKeyToOldIdx(children, beginIdx, endIdx) {
    var i, map = {}, key, ch;
    for (i = beginIdx; i <= endIdx; ++i) {
        ch = children[i];
        if (ch != null) {
            key = ch.key;
            if (key !== undefined)
                map[key] = i;
        }
    }
    return map;
}
var hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];
var h_1 = require("./h");
exports.h = h_1.h;
var thunk_1 = require("./thunk");
exports.thunk = thunk_1.thunk;
function init(modules, domApi) {
    var i, j, cbs = {};
    var api = domApi !== undefined ? domApi : htmldomapi_1.default;
    for (i = 0; i < hooks.length; ++i) {
        cbs[hooks[i]] = [];
        for (j = 0; j < modules.length; ++j) {
            var hook = modules[j][hooks[i]];
            if (hook !== undefined) {
                cbs[hooks[i]].push(hook);
            }
        }
    }
    function emptyNodeAt(elm) {
        var id = elm.id ? '#' + elm.id : '';
        var c = elm.className ? '.' + elm.className.split(' ').join('.') : '';
        return vnode_1.default(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm);
    }
    function createRmCb(childElm, listeners) {
        return function rmCb() {
            if (--listeners === 0) {
                var parent_1 = api.parentNode(childElm);
                api.removeChild(parent_1, childElm);
            }
        };
    }
    function createElm(vnode, insertedVnodeQueue) {
        var i, data = vnode.data;
        if (data !== undefined) {
            if (isDef(i = data.hook) && isDef(i = i.init)) {
                i(vnode);
                data = vnode.data;
            }
        }
        var children = vnode.children, sel = vnode.sel;
        if (sel === '!') {
            if (isUndef(vnode.text)) {
                vnode.text = '';
            }
            vnode.elm = api.createComment(vnode.text);
        }
        else if (sel !== undefined) {
            // Parse selector
            var hashIdx = sel.indexOf('#');
            var dotIdx = sel.indexOf('.', hashIdx);
            var hash = hashIdx > 0 ? hashIdx : sel.length;
            var dot = dotIdx > 0 ? dotIdx : sel.length;
            var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
            var elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? api.createElementNS(i, tag)
                : api.createElement(tag);
            if (hash < dot)
                elm.setAttribute('id', sel.slice(hash + 1, dot));
            if (dotIdx > 0)
                elm.setAttribute('class', sel.slice(dot + 1).replace(/\./g, ' '));
            for (i = 0; i < cbs.create.length; ++i)
                cbs.create[i](emptyNode, vnode);
            if (is.array(children)) {
                for (i = 0; i < children.length; ++i) {
                    var ch = children[i];
                    if (ch != null) {
                        api.appendChild(elm, createElm(ch, insertedVnodeQueue));
                    }
                }
            }
            else if (is.primitive(vnode.text)) {
                api.appendChild(elm, api.createTextNode(vnode.text));
            }
            i = vnode.data.hook; // Reuse variable
            if (isDef(i)) {
                if (i.create)
                    i.create(emptyNode, vnode);
                if (i.insert)
                    insertedVnodeQueue.push(vnode);
            }
        }
        else {
            vnode.elm = api.createTextNode(vnode.text);
        }
        return vnode.elm;
    }
    function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
        for (; startIdx <= endIdx; ++startIdx) {
            var ch = vnodes[startIdx];
            if (ch != null) {
                api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before);
            }
        }
    }
    function invokeDestroyHook(vnode) {
        var i, j, data = vnode.data;
        if (data !== undefined) {
            if (isDef(i = data.hook) && isDef(i = i.destroy))
                i(vnode);
            for (i = 0; i < cbs.destroy.length; ++i)
                cbs.destroy[i](vnode);
            if (vnode.children !== undefined) {
                for (j = 0; j < vnode.children.length; ++j) {
                    i = vnode.children[j];
                    if (i != null && typeof i !== "string") {
                        invokeDestroyHook(i);
                    }
                }
            }
        }
    }
    function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
        for (; startIdx <= endIdx; ++startIdx) {
            var i_1 = void 0, listeners = void 0, rm = void 0, ch = vnodes[startIdx];
            if (ch != null) {
                if (isDef(ch.sel)) {
                    invokeDestroyHook(ch);
                    listeners = cbs.remove.length + 1;
                    rm = createRmCb(ch.elm, listeners);
                    for (i_1 = 0; i_1 < cbs.remove.length; ++i_1)
                        cbs.remove[i_1](ch, rm);
                    if (isDef(i_1 = ch.data) && isDef(i_1 = i_1.hook) && isDef(i_1 = i_1.remove)) {
                        i_1(ch, rm);
                    }
                    else {
                        rm();
                    }
                }
                else {
                    api.removeChild(parentElm, ch.elm);
                }
            }
        }
    }
    function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
        var oldStartIdx = 0, newStartIdx = 0;
        var oldEndIdx = oldCh.length - 1;
        var oldStartVnode = oldCh[0];
        var oldEndVnode = oldCh[oldEndIdx];
        var newEndIdx = newCh.length - 1;
        var newStartVnode = newCh[0];
        var newEndVnode = newCh[newEndIdx];
        var oldKeyToIdx;
        var idxInOld;
        var elmToMove;
        var before;
        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
            if (oldStartVnode == null) {
                oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
            }
            else if (oldEndVnode == null) {
                oldEndVnode = oldCh[--oldEndIdx];
            }
            else if (newStartVnode == null) {
                newStartVnode = newCh[++newStartIdx];
            }
            else if (newEndVnode == null) {
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldStartVnode, newStartVnode)) {
                patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
                oldStartVnode = oldCh[++oldStartIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else if (sameVnode(oldEndVnode, newEndVnode)) {
                patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
                oldEndVnode = oldCh[--oldEndIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldStartVnode, newEndVnode)) {
                patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
                api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
                oldStartVnode = oldCh[++oldStartIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldEndVnode, newStartVnode)) {
                patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
                api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
                oldEndVnode = oldCh[--oldEndIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else {
                if (oldKeyToIdx === undefined) {
                    oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
                }
                idxInOld = oldKeyToIdx[newStartVnode.key];
                if (isUndef(idxInOld)) {
                    api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                    newStartVnode = newCh[++newStartIdx];
                }
                else {
                    elmToMove = oldCh[idxInOld];
                    if (elmToMove.sel !== newStartVnode.sel) {
                        api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                    }
                    else {
                        patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
                        oldCh[idxInOld] = undefined;
                        api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
                    }
                    newStartVnode = newCh[++newStartIdx];
                }
            }
        }
        if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
            if (oldStartIdx > oldEndIdx) {
                before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
                addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
            }
            else {
                removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
            }
        }
    }
    function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
        var i, hook;
        if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
            i(oldVnode, vnode);
        }
        var elm = vnode.elm = oldVnode.elm;
        var oldCh = oldVnode.children;
        var ch = vnode.children;
        if (oldVnode === vnode)
            return;
        if (vnode.data !== undefined) {
            for (i = 0; i < cbs.update.length; ++i)
                cbs.update[i](oldVnode, vnode);
            i = vnode.data.hook;
            if (isDef(i) && isDef(i = i.update))
                i(oldVnode, vnode);
        }
        if (isUndef(vnode.text)) {
            if (isDef(oldCh) && isDef(ch)) {
                if (oldCh !== ch)
                    updateChildren(elm, oldCh, ch, insertedVnodeQueue);
            }
            else if (isDef(ch)) {
                if (isDef(oldVnode.text))
                    api.setTextContent(elm, '');
                addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
            }
            else if (isDef(oldCh)) {
                removeVnodes(elm, oldCh, 0, oldCh.length - 1);
            }
            else if (isDef(oldVnode.text)) {
                api.setTextContent(elm, '');
            }
        }
        else if (oldVnode.text !== vnode.text) {
            if (isDef(oldCh)) {
                removeVnodes(elm, oldCh, 0, oldCh.length - 1);
            }
            api.setTextContent(elm, vnode.text);
        }
        if (isDef(hook) && isDef(i = hook.postpatch)) {
            i(oldVnode, vnode);
        }
    }
    return function patch(oldVnode, vnode) {
        var i, elm, parent;
        var insertedVnodeQueue = [];
        for (i = 0; i < cbs.pre.length; ++i)
            cbs.pre[i]();
        if (!isVnode(oldVnode)) {
            oldVnode = emptyNodeAt(oldVnode);
        }
        if (sameVnode(oldVnode, vnode)) {
            patchVnode(oldVnode, vnode, insertedVnodeQueue);
        }
        else {
            elm = oldVnode.elm;
            parent = api.parentNode(elm);
            createElm(vnode, insertedVnodeQueue);
            if (parent !== null) {
                api.insertBefore(parent, vnode.elm, api.nextSibling(elm));
                removeVnodes(parent, [oldVnode], 0, 0);
            }
        }
        for (i = 0; i < insertedVnodeQueue.length; ++i) {
            insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
        }
        for (i = 0; i < cbs.post.length; ++i)
            cbs.post[i]();
        return vnode;
    };
}
exports.init = init;

},{"./h":1,"./htmldomapi":2,"./is":3,"./thunk":10,"./vnode":11}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var h_1 = require("./h");
function copyToThunk(vnode, thunk) {
    thunk.elm = vnode.elm;
    vnode.data.fn = thunk.data.fn;
    vnode.data.args = thunk.data.args;
    thunk.data = vnode.data;
    thunk.children = vnode.children;
    thunk.text = vnode.text;
    thunk.elm = vnode.elm;
}
function init(thunk) {
    var cur = thunk.data;
    var vnode = cur.fn.apply(undefined, cur.args);
    copyToThunk(vnode, thunk);
}
function prepatch(oldVnode, thunk) {
    var i, old = oldVnode.data, cur = thunk.data;
    var oldArgs = old.args, args = cur.args;
    if (old.fn !== cur.fn || oldArgs.length !== args.length) {
        copyToThunk(cur.fn.apply(undefined, args), thunk);
        return;
    }
    for (i = 0; i < args.length; ++i) {
        if (oldArgs[i] !== args[i]) {
            copyToThunk(cur.fn.apply(undefined, args), thunk);
            return;
        }
    }
    copyToThunk(oldVnode, thunk);
}
exports.thunk = function thunk(sel, key, fn, args) {
    if (args === undefined) {
        args = fn;
        fn = key;
        key = undefined;
    }
    return h_1.h(sel, {
        key: key,
        hook: { init: init, prepatch: prepatch },
        fn: fn,
        args: args
    });
};
exports.default = exports.thunk;

},{"./h":1}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function vnode(sel, data, children, text, elm) {
    var key = data === undefined ? undefined : data.key;
    return { sel: sel, data: data, children: children,
        text: text, elm: elm, key: key };
}
exports.vnode = vnode;
exports.default = vnode;

},{}],12:[function(require,module,exports){
const {RIVEN, Ø}  = require('./riven')

require('./nodes/print')
require('./nodes/add')
require('./nodes/concat')
require('./nodes/value')
require('./nodes/interval')
require('./nodes/console')
require('./nodes/bang')
require('./nodes/output')
require('./nodes/text')
require('./nodes/keyboardInput')
require('./nodes/font')

document.addEventListener('DOMContentLoaded', () => {
  RIVEN.setup()

  const lib = RIVEN.lib

  RIVEN.create = (append = true) => {
    Ø("bang").create({x:2,y:14},lib.Bang)
    Ø("interval").create({x:2,y:10},lib.Interval,2000)

    Ø("string").create({x:8,y:10},lib.Value,'APPLE')
    Ø("text").create({x:14,y:14},lib.Text)
    Ø("font").create({x:14,y:18},lib.Font, 'Studio Pro')

    Ø("keyInput").create({x:8,y:14},lib.KeyboardInput)
    Ø("console").create({x:20,y:10},lib.Console)

    Ø("output").create({x:20,y:14},lib.Output)
    
    Ø("string").connect(["console"])
    Ø("bang").connect(["keyInput"])
    Ø("interval").connect(["string"])
    Ø("keyInput").connect(["text"])
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

},{"./nodes/add":13,"./nodes/bang":14,"./nodes/concat":15,"./nodes/console":16,"./nodes/font":17,"./nodes/interval":18,"./nodes/keyboardInput":19,"./nodes/output":20,"./nodes/print":21,"./nodes/text":22,"./nodes/value":23,"./riven":24}],13:[function(require,module,exports){
const {RIVEN, Ø}  = require('../riven')

RIVEN.lib.Add = function (id, rect) {
  RIVEN.Node.call(this, id, rect)
  this.glyph = 'M60,60 L60,60 L150,120 L240,120 M60,150 L60,150 L240,150 M60,240 L60,240 L150,180 L240,180'

  this.add = function () {
    return Object.values(this.request()).reduce((acc, val) => { return acc + val }, 0)
  }

  this.receive = function (q) {
    this.send(this.add())
  }

  this.answer = function () {
    return this.add()
  }
}

},{"../riven":24}],14:[function(require,module,exports){
const {RIVEN, Ø}  = require('../riven')

RIVEN.lib.Bang = function (id, rect) {
  RIVEN.Node.call(this, id, rect)
  this.glyph = 'M60,60 L60,60 L150,120 L240,120 M60,150 L60,150 L240,150 M60,240 L60,240 L150,180 L240,180'

  this.receive = function (q) {
    this.label = `${this.id}(bang!)`
    this.send(this)
  }
  
  this.handleClick = (node) => {
    this.send(this)
  }
}

},{"../riven":24}],15:[function(require,module,exports){
const {RIVEN, Ø}  = require('../riven')

RIVEN.lib.Concat = function (id, rect) {
  RIVEN.Node.call(this, id, rect)
  this.glyph = 'M60,60 L60,60 L150,120 L240,120 M60,150 L60,150 L240,150 M60,240 L60,240 L150,180 L240,180'

  this.receive = function (q) {
    this.send(Object.values(this.request()).join(' '))
  }
}

},{"../riven":24}],16:[function(require,module,exports){
const {RIVEN, Ø}  = require('../riven')

RIVEN.lib.Console = function (id, rect) {
  RIVEN.Node.call(this, id, rect)

  this.glyph = 'M65,65 L65,65 L245,65 M65,125 L65,125 L245,125 M65,185 L65,185 L245,185 M65,245 L65,245 L245,245 '

  this.receive = function (q) {
    console.log(this.id, q)
  }
}

},{"../riven":24}],17:[function(require,module,exports){
const {RIVEN, Ø}  = require('../riven')

RIVEN.lib.Font = function (id, rect, val) {
  RIVEN.Node.call(this, id, rect)

  this.glyph = 'M60,60 L60,60 L240,60 L240,240 L60,240 Z M240,150 L240,150 L150,150 L150,240'
  this.label = val ? `${this.id}=${val}` : this.id

  this.answer = function (q) {
    return {type: 'font', val: val}
  }

  this.receive = function (q) {
    this.send(val)
  }
}

},{"../riven":24}],18:[function(require,module,exports){
const {RIVEN, Ø}  = require('../riven')

RIVEN.lib.Interval = function (id, rect, val) {
  RIVEN.Node.call(this, id, rect)
  this.glyph = 'M60,60 L60,60 L150,120 L240,120 M60,150 L60,150 L240,150 M60,240 L60,240 L150,180 L240,180'
  
  this.interval = setInterval(() => {
    this.send(this)
  }, val);
}
},{"../riven":24}],19:[function(require,module,exports){
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

},{"../riven":24}],20:[function(require,module,exports){
const {RIVEN, Ø}  = require('../riven')

RIVEN.lib.Output = function (id, rect, html) {
  RIVEN.Node.call(this, id, rect)

  this.glyph = 'M65,65 L65,65 L245,65 M65,125 L65,125 L245,125 M65,185 L65,185 L245,185 M65,245 L65,245 L245,245 '

  this.receive = function (q) {
    this.container = document.querySelector('#output')
    this.container.innerHTML = q
  }
}

},{"../riven":24}],21:[function(require,module,exports){
const {RIVEN, Ø}  = require('../riven')

RIVEN.lib.Print = function (id, rect) {
  RIVEN.Node.call(this, id, rect)

  this.glyph = 'M65,65 L65,65 L245,65 M65,125 L65,125 L245,125 M65,185 L65,185 L245,185 M65,245 L65,245 L245,245 '

  this.receive = function (q) {
    this.label = `${q}`
    this.send(q)
  }
}

},{"../riven":24}],22:[function(require,module,exports){
const {RIVEN, Ø}  = require('../riven')

RIVEN.lib.Text = function (id, rect, val) {
  RIVEN.Node.call(this, id, rect)

  this.glyph = 'M60,60 L60,60 L240,60 L240,240 L60,240 Z M240,150 L240,150 L150,150 L150,240'
  this.label = val ? `${this.id}=${val}` : this.id

  this.html = function (q, font) {
    return `
      <h1 style='font-family: ${font}'>${q}</h1>
    `
  }

  this.receive = function (q) {
    const request = this.request()
    let font = 'sans-serif'

    for(n in request) {
      let node = request[n]
      if(node.type == 'font') {
        font = node.val
      }
    }

    this.send(this.html(q, font))
  }
}

},{"../riven":24}],23:[function(require,module,exports){
const {RIVEN, Ø}  = require('../riven')

RIVEN.lib.Value = function (id, rect, val) {
  RIVEN.Node.call(this, id, rect)

  this.glyph = 'M60,60 L60,60 L240,60 L240,240 L60,240 Z M240,150 L240,150 L150,150 L150,240'
  this.label = val ? `${this.id}=${val}` : this.id

  this.answer = function (q) {
    return val
  }
  
  this.receive = function (q) {
    this.send(val)
  }
}

},{"../riven":24}],24:[function(require,module,exports){
// "Don't forget, the portal combination's in my journal."" — Catherine

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
    const container = document.getElementById('container')
    this.el = h('svg#riven', h('g#nodes'), h('g#routes'))
    patch(container, this.el)
    
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

    if(nodes.length == 0 || routes.length == 0) return this.el
    
    return h('svg#riven', 
    {
      style: {
        transform: `translate(${parseInt(this.cur.offset.x)}px,${parseInt(this.cur.offset.y)}px)`
      }
    },
    [
      h('g#routes', routes),
      h('g#nodes', nodes)
    ])
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

  this.renderRoute = function (node) {
    const routes = this.drawRoutes(node)

    return h('g',
    routes)

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

    return h('g',
    {
      attrs: {
        class: 'node',
        id: `node_${node.id}`
      },
      on: {
        click: [this.nodeClickHandler, node]
      }
    }, [
      h('rect',
        {attrs:
          {rx: 2, ry: 2, x: rect.x, y: rect.y - (GRID_SIZE / 2), width: rect.w, height: rect.h, class: node.children.length === 0 ? 'fill' : ''}
        }),
      h('text',
        {attrs:
          {x: rect.x + (rect.w / 2) + (GRID_SIZE * 0.3), y: rect.y + rect.h + (GRID_SIZE * 0.2)}
        }, node.label
      ),
      h('g', ports),
      h('g', glyph)
    ])
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

    return h('svg',
    {
      attrs: {
        id: `${port.host.id}_port_${port.id}`,
        x: pos.x - r,
        y: pos.y - r
      },
      on: {
        click: [this.portClickHandler, port]
      }
    }, h('g',
          {
            attrs: {
              class: `port ${port.id}`
            }
          }
        ,
        h('path',
              {
                attrs: {d: `M${r},0 L${r*2},${r} L${r},${r*2} L0,${r} Z`}
              }
            )
        )
      )
  }
  
  this.drawGlyph = (node) => {
    const rect = getRect(node)
    
    return h('path',
      {
        attrs: {
          class: 'glyph',
          transform: `translate(${rect.x + (GRID_SIZE / 4)},${rect.y - (GRID_SIZE / 4)}) scale(0.1)`,
          d: `${node.glyph}`
        }
      }
    )
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
    if (a.type === PORT_TYPES.entry) {
      return this.drawConnectionEntry(a, b)
    }
    if (b.type === PORT_TYPES.exit) {
      return this.drawConnectionExit(a, b)
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

  this.drawConnectionOutput = (a, b) => {
    const posA = getPortPosition(a)
    const posB = getPortPosition(b)
    const posM = middle(posA, posB)
    const posC1 = { x: (posM.x + (posA.x + GRID_SIZE)) / 2, y: posA.y }
    const posC2 = { x: (posM.x + (posB.x - GRID_SIZE)) / 2, y: posB.y }
            
    const r = GRID_SIZE / 4

    return h('g', {
      attrs: { class: 'route-wrapper' }
    },
    [
      h('path',
        {
          attrs: {
            class: `route output`,
            d: `M${posA.x},${posA.y} L${posA.x + GRID_SIZE},${posA.y}
                Q${posC1.x},${posC1.y} ${posM.x},${posM.y}
                Q ${posC2.x},${posC2.y} ${posB.x - GRID_SIZE},${posB.y}
                L${posB.x},${posB.y}`
          }
        }
      ),
      h('path',
        {
          attrs: {
            class: `route route-hover-area`,
            d: `M${posA.x},${posA.y} L${posA.x + GRID_SIZE},${posA.y}
                Q${posC1.x},${posC1.y} ${posM.x},${posM.y}
                Q ${posC2.x},${posC2.y} ${posB.x - GRID_SIZE},${posB.y}
                L${posB.x},${posB.y}`
          },
          on: {
            click: [this.routeClickHandler, a, b]
          }
        }
      ),
      h('path',
        {
          attrs: {d: `M${posM.x - r},${posM.y - r} L${posM.x + r},${posM.y + r} M${posM.x + r},${posM.y - r} L${posM.x - r},${posM.y + r}`, class: 'route-disconnect'},
          on: {
            click: [this.routeClickHandler, a, b]
          }
        }
      )
    ])
  }
  
  this.routeClickHandler = (a, b) => {
    a.disconnect(b.host.id)
    this.render()
  }

  this.drawConnectionEntry = (a, b) => {
    const posA = getPortPosition(a)
    const posB = getPortPosition(b)

    return h('path', {attrs: {
        class: `route entry`,
        d: `M${posA.x},${posA.y} L${posA.x + GRID_SIZE},${posA.y}
            L${posA.x + GRID_SIZE},${posA.y}
            L${posA.x + GRID_SIZE},${posB.y}
            L${posB.x},${posB.y}`
      }}
    )
  }

  this.drawConnectionExit = (a, b) => {
    const posA = getPortPosition(a)
    const posB = getPortPosition(b)

    return h('path', {attrs: {
        class: `route exit`,
        d: `M${posA.x},${posA.y} L${posA.x + GRID_SIZE},${posA.y}
            L${posB.x - GRID_SIZE},${posA.y}
            L${posB.x - GRID_SIZE},${posB.y}
            L${posB.x},${posB.y}`
      }}
    )
  }

  this.drawConnectionRequest = (a, b) => {
    const posA = getPortPosition(a)
    const posB = getPortPosition(b)

    return h('path', {attrs: {
        class: `route request`,
        d: `M${posA.x},${posA.y}
            L${posA.x},${posA.y + GRID_SIZE}
            L${posB.x},${posA.y + GRID_SIZE}
            L${posB.x},${posB.y}`
      }}
    )
  }

  this.drawConnectionBidirectional = (a, b) => {
    const posA = getPortPosition(a)
    const posB = getPortPosition(b)
    const posM = middle(posA, posB)

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
      
      // console.log(host);
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

},{"snabbdom":9,"snabbdom/h":1,"snabbdom/modules/attributes":4,"snabbdom/modules/class":5,"snabbdom/modules/eventlisteners":6,"snabbdom/modules/props":7,"snabbdom/modules/style":8}]},{},[12]);
