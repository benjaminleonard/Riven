/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./lib/axios */ \"./node_modules/axios/lib/axios.js\");\n\n//# sourceURL=webpack:///./node_modules/axios/index.js?");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar settle = __webpack_require__(/*! ./../core/settle */ \"./node_modules/axios/lib/core/settle.js\");\nvar buildURL = __webpack_require__(/*! ./../helpers/buildURL */ \"./node_modules/axios/lib/helpers/buildURL.js\");\nvar parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ \"./node_modules/axios/lib/helpers/parseHeaders.js\");\nvar isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ \"./node_modules/axios/lib/helpers/isURLSameOrigin.js\");\nvar createError = __webpack_require__(/*! ../core/createError */ \"./node_modules/axios/lib/core/createError.js\");\nvar btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(/*! ./../helpers/btoa */ \"./node_modules/axios/lib/helpers/btoa.js\");\n\nmodule.exports = function xhrAdapter(config) {\n  return new Promise(function dispatchXhrRequest(resolve, reject) {\n    var requestData = config.data;\n    var requestHeaders = config.headers;\n\n    if (utils.isFormData(requestData)) {\n      delete requestHeaders['Content-Type']; // Let the browser set it\n    }\n\n    var request = new XMLHttpRequest();\n    var loadEvent = 'onreadystatechange';\n    var xDomain = false;\n\n    // For IE 8/9 CORS support\n    // Only supports POST and GET calls and doesn't returns the response headers.\n    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.\n    if ( true &&\n        typeof window !== 'undefined' &&\n        window.XDomainRequest && !('withCredentials' in request) &&\n        !isURLSameOrigin(config.url)) {\n      request = new window.XDomainRequest();\n      loadEvent = 'onload';\n      xDomain = true;\n      request.onprogress = function handleProgress() {};\n      request.ontimeout = function handleTimeout() {};\n    }\n\n    // HTTP basic authentication\n    if (config.auth) {\n      var username = config.auth.username || '';\n      var password = config.auth.password || '';\n      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);\n    }\n\n    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);\n\n    // Set the request timeout in MS\n    request.timeout = config.timeout;\n\n    // Listen for ready state\n    request[loadEvent] = function handleLoad() {\n      if (!request || (request.readyState !== 4 && !xDomain)) {\n        return;\n      }\n\n      // The request errored out and we didn't get a response, this will be\n      // handled by onerror instead\n      // With one exception: request that using file: protocol, most browsers\n      // will return status as 0 even though it's a successful request\n      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {\n        return;\n      }\n\n      // Prepare the response\n      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;\n      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;\n      var response = {\n        data: responseData,\n        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)\n        status: request.status === 1223 ? 204 : request.status,\n        statusText: request.status === 1223 ? 'No Content' : request.statusText,\n        headers: responseHeaders,\n        config: config,\n        request: request\n      };\n\n      settle(resolve, reject, response);\n\n      // Clean up request\n      request = null;\n    };\n\n    // Handle low level network errors\n    request.onerror = function handleError() {\n      // Real errors are hidden from us by the browser\n      // onerror should only fire if it's a network error\n      reject(createError('Network Error', config, null, request));\n\n      // Clean up request\n      request = null;\n    };\n\n    // Handle timeout\n    request.ontimeout = function handleTimeout() {\n      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',\n        request));\n\n      // Clean up request\n      request = null;\n    };\n\n    // Add xsrf header\n    // This is only done if running in a standard browser environment.\n    // Specifically not if we're in a web worker, or react-native.\n    if (utils.isStandardBrowserEnv()) {\n      var cookies = __webpack_require__(/*! ./../helpers/cookies */ \"./node_modules/axios/lib/helpers/cookies.js\");\n\n      // Add xsrf header\n      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?\n          cookies.read(config.xsrfCookieName) :\n          undefined;\n\n      if (xsrfValue) {\n        requestHeaders[config.xsrfHeaderName] = xsrfValue;\n      }\n    }\n\n    // Add headers to the request\n    if ('setRequestHeader' in request) {\n      utils.forEach(requestHeaders, function setRequestHeader(val, key) {\n        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {\n          // Remove Content-Type if data is undefined\n          delete requestHeaders[key];\n        } else {\n          // Otherwise add header to the request\n          request.setRequestHeader(key, val);\n        }\n      });\n    }\n\n    // Add withCredentials to request if needed\n    if (config.withCredentials) {\n      request.withCredentials = true;\n    }\n\n    // Add responseType to request if needed\n    if (config.responseType) {\n      try {\n        request.responseType = config.responseType;\n      } catch (e) {\n        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.\n        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.\n        if (config.responseType !== 'json') {\n          throw e;\n        }\n      }\n    }\n\n    // Handle progress if needed\n    if (typeof config.onDownloadProgress === 'function') {\n      request.addEventListener('progress', config.onDownloadProgress);\n    }\n\n    // Not all browsers support upload events\n    if (typeof config.onUploadProgress === 'function' && request.upload) {\n      request.upload.addEventListener('progress', config.onUploadProgress);\n    }\n\n    if (config.cancelToken) {\n      // Handle cancellation\n      config.cancelToken.promise.then(function onCanceled(cancel) {\n        if (!request) {\n          return;\n        }\n\n        request.abort();\n        reject(cancel);\n        // Clean up request\n        request = null;\n      });\n    }\n\n    if (requestData === undefined) {\n      requestData = null;\n    }\n\n    // Send the request\n    request.send(requestData);\n  });\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/adapters/xhr.js?");

/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./utils */ \"./node_modules/axios/lib/utils.js\");\nvar bind = __webpack_require__(/*! ./helpers/bind */ \"./node_modules/axios/lib/helpers/bind.js\");\nvar Axios = __webpack_require__(/*! ./core/Axios */ \"./node_modules/axios/lib/core/Axios.js\");\nvar defaults = __webpack_require__(/*! ./defaults */ \"./node_modules/axios/lib/defaults.js\");\n\n/**\n * Create an instance of Axios\n *\n * @param {Object} defaultConfig The default config for the instance\n * @return {Axios} A new instance of Axios\n */\nfunction createInstance(defaultConfig) {\n  var context = new Axios(defaultConfig);\n  var instance = bind(Axios.prototype.request, context);\n\n  // Copy axios.prototype to instance\n  utils.extend(instance, Axios.prototype, context);\n\n  // Copy context to instance\n  utils.extend(instance, context);\n\n  return instance;\n}\n\n// Create the default instance to be exported\nvar axios = createInstance(defaults);\n\n// Expose Axios class to allow class inheritance\naxios.Axios = Axios;\n\n// Factory for creating new instances\naxios.create = function create(instanceConfig) {\n  return createInstance(utils.merge(defaults, instanceConfig));\n};\n\n// Expose Cancel & CancelToken\naxios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ \"./node_modules/axios/lib/cancel/Cancel.js\");\naxios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ \"./node_modules/axios/lib/cancel/CancelToken.js\");\naxios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ \"./node_modules/axios/lib/cancel/isCancel.js\");\n\n// Expose all/spread\naxios.all = function all(promises) {\n  return Promise.all(promises);\n};\naxios.spread = __webpack_require__(/*! ./helpers/spread */ \"./node_modules/axios/lib/helpers/spread.js\");\n\nmodule.exports = axios;\n\n// Allow use of default import syntax in TypeScript\nmodule.exports.default = axios;\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/axios.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * A `Cancel` is an object that is thrown when an operation is canceled.\n *\n * @class\n * @param {string=} message The message.\n */\nfunction Cancel(message) {\n  this.message = message;\n}\n\nCancel.prototype.toString = function toString() {\n  return 'Cancel' + (this.message ? ': ' + this.message : '');\n};\n\nCancel.prototype.__CANCEL__ = true;\n\nmodule.exports = Cancel;\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/cancel/Cancel.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar Cancel = __webpack_require__(/*! ./Cancel */ \"./node_modules/axios/lib/cancel/Cancel.js\");\n\n/**\n * A `CancelToken` is an object that can be used to request cancellation of an operation.\n *\n * @class\n * @param {Function} executor The executor function.\n */\nfunction CancelToken(executor) {\n  if (typeof executor !== 'function') {\n    throw new TypeError('executor must be a function.');\n  }\n\n  var resolvePromise;\n  this.promise = new Promise(function promiseExecutor(resolve) {\n    resolvePromise = resolve;\n  });\n\n  var token = this;\n  executor(function cancel(message) {\n    if (token.reason) {\n      // Cancellation has already been requested\n      return;\n    }\n\n    token.reason = new Cancel(message);\n    resolvePromise(token.reason);\n  });\n}\n\n/**\n * Throws a `Cancel` if cancellation has been requested.\n */\nCancelToken.prototype.throwIfRequested = function throwIfRequested() {\n  if (this.reason) {\n    throw this.reason;\n  }\n};\n\n/**\n * Returns an object that contains a new `CancelToken` and a function that, when called,\n * cancels the `CancelToken`.\n */\nCancelToken.source = function source() {\n  var cancel;\n  var token = new CancelToken(function executor(c) {\n    cancel = c;\n  });\n  return {\n    token: token,\n    cancel: cancel\n  };\n};\n\nmodule.exports = CancelToken;\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/cancel/CancelToken.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function isCancel(value) {\n  return !!(value && value.__CANCEL__);\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/cancel/isCancel.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar defaults = __webpack_require__(/*! ./../defaults */ \"./node_modules/axios/lib/defaults.js\");\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ \"./node_modules/axios/lib/core/InterceptorManager.js\");\nvar dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ \"./node_modules/axios/lib/core/dispatchRequest.js\");\n\n/**\n * Create a new instance of Axios\n *\n * @param {Object} instanceConfig The default config for the instance\n */\nfunction Axios(instanceConfig) {\n  this.defaults = instanceConfig;\n  this.interceptors = {\n    request: new InterceptorManager(),\n    response: new InterceptorManager()\n  };\n}\n\n/**\n * Dispatch a request\n *\n * @param {Object} config The config specific for this request (merged with this.defaults)\n */\nAxios.prototype.request = function request(config) {\n  /*eslint no-param-reassign:0*/\n  // Allow for axios('example/url'[, config]) a la fetch API\n  if (typeof config === 'string') {\n    config = utils.merge({\n      url: arguments[0]\n    }, arguments[1]);\n  }\n\n  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);\n  config.method = config.method.toLowerCase();\n\n  // Hook up interceptors middleware\n  var chain = [dispatchRequest, undefined];\n  var promise = Promise.resolve(config);\n\n  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {\n    chain.unshift(interceptor.fulfilled, interceptor.rejected);\n  });\n\n  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {\n    chain.push(interceptor.fulfilled, interceptor.rejected);\n  });\n\n  while (chain.length) {\n    promise = promise.then(chain.shift(), chain.shift());\n  }\n\n  return promise;\n};\n\n// Provide aliases for supported request methods\nutils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {\n  /*eslint func-names:0*/\n  Axios.prototype[method] = function(url, config) {\n    return this.request(utils.merge(config || {}, {\n      method: method,\n      url: url\n    }));\n  };\n});\n\nutils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {\n  /*eslint func-names:0*/\n  Axios.prototype[method] = function(url, data, config) {\n    return this.request(utils.merge(config || {}, {\n      method: method,\n      url: url,\n      data: data\n    }));\n  };\n});\n\nmodule.exports = Axios;\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/Axios.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nfunction InterceptorManager() {\n  this.handlers = [];\n}\n\n/**\n * Add a new interceptor to the stack\n *\n * @param {Function} fulfilled The function to handle `then` for a `Promise`\n * @param {Function} rejected The function to handle `reject` for a `Promise`\n *\n * @return {Number} An ID used to remove interceptor later\n */\nInterceptorManager.prototype.use = function use(fulfilled, rejected) {\n  this.handlers.push({\n    fulfilled: fulfilled,\n    rejected: rejected\n  });\n  return this.handlers.length - 1;\n};\n\n/**\n * Remove an interceptor from the stack\n *\n * @param {Number} id The ID that was returned by `use`\n */\nInterceptorManager.prototype.eject = function eject(id) {\n  if (this.handlers[id]) {\n    this.handlers[id] = null;\n  }\n};\n\n/**\n * Iterate over all the registered interceptors\n *\n * This method is particularly useful for skipping over any\n * interceptors that may have become `null` calling `eject`.\n *\n * @param {Function} fn The function to call for each interceptor\n */\nInterceptorManager.prototype.forEach = function forEach(fn) {\n  utils.forEach(this.handlers, function forEachHandler(h) {\n    if (h !== null) {\n      fn(h);\n    }\n  });\n};\n\nmodule.exports = InterceptorManager;\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/InterceptorManager.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar enhanceError = __webpack_require__(/*! ./enhanceError */ \"./node_modules/axios/lib/core/enhanceError.js\");\n\n/**\n * Create an Error with the specified message, config, error code, request and response.\n *\n * @param {string} message The error message.\n * @param {Object} config The config.\n * @param {string} [code] The error code (for example, 'ECONNABORTED').\n * @param {Object} [request] The request.\n * @param {Object} [response] The response.\n * @returns {Error} The created error.\n */\nmodule.exports = function createError(message, config, code, request, response) {\n  var error = new Error(message);\n  return enhanceError(error, config, code, request, response);\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/createError.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar transformData = __webpack_require__(/*! ./transformData */ \"./node_modules/axios/lib/core/transformData.js\");\nvar isCancel = __webpack_require__(/*! ../cancel/isCancel */ \"./node_modules/axios/lib/cancel/isCancel.js\");\nvar defaults = __webpack_require__(/*! ../defaults */ \"./node_modules/axios/lib/defaults.js\");\nvar isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ \"./node_modules/axios/lib/helpers/isAbsoluteURL.js\");\nvar combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ \"./node_modules/axios/lib/helpers/combineURLs.js\");\n\n/**\n * Throws a `Cancel` if cancellation has been requested.\n */\nfunction throwIfCancellationRequested(config) {\n  if (config.cancelToken) {\n    config.cancelToken.throwIfRequested();\n  }\n}\n\n/**\n * Dispatch a request to the server using the configured adapter.\n *\n * @param {object} config The config that is to be used for the request\n * @returns {Promise} The Promise to be fulfilled\n */\nmodule.exports = function dispatchRequest(config) {\n  throwIfCancellationRequested(config);\n\n  // Support baseURL config\n  if (config.baseURL && !isAbsoluteURL(config.url)) {\n    config.url = combineURLs(config.baseURL, config.url);\n  }\n\n  // Ensure headers exist\n  config.headers = config.headers || {};\n\n  // Transform request data\n  config.data = transformData(\n    config.data,\n    config.headers,\n    config.transformRequest\n  );\n\n  // Flatten headers\n  config.headers = utils.merge(\n    config.headers.common || {},\n    config.headers[config.method] || {},\n    config.headers || {}\n  );\n\n  utils.forEach(\n    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],\n    function cleanHeaderConfig(method) {\n      delete config.headers[method];\n    }\n  );\n\n  var adapter = config.adapter || defaults.adapter;\n\n  return adapter(config).then(function onAdapterResolution(response) {\n    throwIfCancellationRequested(config);\n\n    // Transform response data\n    response.data = transformData(\n      response.data,\n      response.headers,\n      config.transformResponse\n    );\n\n    return response;\n  }, function onAdapterRejection(reason) {\n    if (!isCancel(reason)) {\n      throwIfCancellationRequested(config);\n\n      // Transform response data\n      if (reason && reason.response) {\n        reason.response.data = transformData(\n          reason.response.data,\n          reason.response.headers,\n          config.transformResponse\n        );\n      }\n    }\n\n    return Promise.reject(reason);\n  });\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/dispatchRequest.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Update an Error with the specified config, error code, and response.\n *\n * @param {Error} error The error to update.\n * @param {Object} config The config.\n * @param {string} [code] The error code (for example, 'ECONNABORTED').\n * @param {Object} [request] The request.\n * @param {Object} [response] The response.\n * @returns {Error} The error.\n */\nmodule.exports = function enhanceError(error, config, code, request, response) {\n  error.config = config;\n  if (code) {\n    error.code = code;\n  }\n  error.request = request;\n  error.response = response;\n  return error;\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/enhanceError.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar createError = __webpack_require__(/*! ./createError */ \"./node_modules/axios/lib/core/createError.js\");\n\n/**\n * Resolve or reject a Promise based on response status.\n *\n * @param {Function} resolve A function that resolves the promise.\n * @param {Function} reject A function that rejects the promise.\n * @param {object} response The response.\n */\nmodule.exports = function settle(resolve, reject, response) {\n  var validateStatus = response.config.validateStatus;\n  // Note: status is not exposed by XDomainRequest\n  if (!response.status || !validateStatus || validateStatus(response.status)) {\n    resolve(response);\n  } else {\n    reject(createError(\n      'Request failed with status code ' + response.status,\n      response.config,\n      null,\n      response.request,\n      response\n    ));\n  }\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/settle.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\n/**\n * Transform the data for a request or a response\n *\n * @param {Object|String} data The data to be transformed\n * @param {Array} headers The headers for the request or response\n * @param {Array|Function} fns A single function or Array of functions\n * @returns {*} The resulting transformed data\n */\nmodule.exports = function transformData(data, headers, fns) {\n  /*eslint no-param-reassign:0*/\n  utils.forEach(fns, function transform(fn) {\n    data = fn(data, headers);\n  });\n\n  return data;\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/transformData.js?");

/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(process) {\n\nvar utils = __webpack_require__(/*! ./utils */ \"./node_modules/axios/lib/utils.js\");\nvar normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ \"./node_modules/axios/lib/helpers/normalizeHeaderName.js\");\n\nvar DEFAULT_CONTENT_TYPE = {\n  'Content-Type': 'application/x-www-form-urlencoded'\n};\n\nfunction setContentTypeIfUnset(headers, value) {\n  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {\n    headers['Content-Type'] = value;\n  }\n}\n\nfunction getDefaultAdapter() {\n  var adapter;\n  if (typeof XMLHttpRequest !== 'undefined') {\n    // For browsers use XHR adapter\n    adapter = __webpack_require__(/*! ./adapters/xhr */ \"./node_modules/axios/lib/adapters/xhr.js\");\n  } else if (typeof process !== 'undefined') {\n    // For node use HTTP adapter\n    adapter = __webpack_require__(/*! ./adapters/http */ \"./node_modules/axios/lib/adapters/xhr.js\");\n  }\n  return adapter;\n}\n\nvar defaults = {\n  adapter: getDefaultAdapter(),\n\n  transformRequest: [function transformRequest(data, headers) {\n    normalizeHeaderName(headers, 'Content-Type');\n    if (utils.isFormData(data) ||\n      utils.isArrayBuffer(data) ||\n      utils.isBuffer(data) ||\n      utils.isStream(data) ||\n      utils.isFile(data) ||\n      utils.isBlob(data)\n    ) {\n      return data;\n    }\n    if (utils.isArrayBufferView(data)) {\n      return data.buffer;\n    }\n    if (utils.isURLSearchParams(data)) {\n      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');\n      return data.toString();\n    }\n    if (utils.isObject(data)) {\n      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');\n      return JSON.stringify(data);\n    }\n    return data;\n  }],\n\n  transformResponse: [function transformResponse(data) {\n    /*eslint no-param-reassign:0*/\n    if (typeof data === 'string') {\n      try {\n        data = JSON.parse(data);\n      } catch (e) { /* Ignore */ }\n    }\n    return data;\n  }],\n\n  /**\n   * A timeout in milliseconds to abort a request. If set to 0 (default) a\n   * timeout is not created.\n   */\n  timeout: 0,\n\n  xsrfCookieName: 'XSRF-TOKEN',\n  xsrfHeaderName: 'X-XSRF-TOKEN',\n\n  maxContentLength: -1,\n\n  validateStatus: function validateStatus(status) {\n    return status >= 200 && status < 300;\n  }\n};\n\ndefaults.headers = {\n  common: {\n    'Accept': 'application/json, text/plain, */*'\n  }\n};\n\nutils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {\n  defaults.headers[method] = {};\n});\n\nutils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {\n  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);\n});\n\nmodule.exports = defaults;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ \"./node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///./node_modules/axios/lib/defaults.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function bind(fn, thisArg) {\n  return function wrap() {\n    var args = new Array(arguments.length);\n    for (var i = 0; i < args.length; i++) {\n      args[i] = arguments[i];\n    }\n    return fn.apply(thisArg, args);\n  };\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/bind.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/btoa.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/btoa.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js\n\nvar chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';\n\nfunction E() {\n  this.message = 'String contains an invalid character';\n}\nE.prototype = new Error;\nE.prototype.code = 5;\nE.prototype.name = 'InvalidCharacterError';\n\nfunction btoa(input) {\n  var str = String(input);\n  var output = '';\n  for (\n    // initialize result and counter\n    var block, charCode, idx = 0, map = chars;\n    // if the next str index does not exist:\n    //   change the mapping table to \"=\"\n    //   check if d has no fractional digits\n    str.charAt(idx | 0) || (map = '=', idx % 1);\n    // \"8 - idx % 1 * 8\" generates the sequence 2, 4, 6, 8\n    output += map.charAt(63 & block >> 8 - idx % 1 * 8)\n  ) {\n    charCode = str.charCodeAt(idx += 3 / 4);\n    if (charCode > 0xFF) {\n      throw new E();\n    }\n    block = block << 8 | charCode;\n  }\n  return output;\n}\n\nmodule.exports = btoa;\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/btoa.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nfunction encode(val) {\n  return encodeURIComponent(val).\n    replace(/%40/gi, '@').\n    replace(/%3A/gi, ':').\n    replace(/%24/g, '$').\n    replace(/%2C/gi, ',').\n    replace(/%20/g, '+').\n    replace(/%5B/gi, '[').\n    replace(/%5D/gi, ']');\n}\n\n/**\n * Build a URL by appending params to the end\n *\n * @param {string} url The base of the url (e.g., http://www.google.com)\n * @param {object} [params] The params to be appended\n * @returns {string} The formatted url\n */\nmodule.exports = function buildURL(url, params, paramsSerializer) {\n  /*eslint no-param-reassign:0*/\n  if (!params) {\n    return url;\n  }\n\n  var serializedParams;\n  if (paramsSerializer) {\n    serializedParams = paramsSerializer(params);\n  } else if (utils.isURLSearchParams(params)) {\n    serializedParams = params.toString();\n  } else {\n    var parts = [];\n\n    utils.forEach(params, function serialize(val, key) {\n      if (val === null || typeof val === 'undefined') {\n        return;\n      }\n\n      if (utils.isArray(val)) {\n        key = key + '[]';\n      } else {\n        val = [val];\n      }\n\n      utils.forEach(val, function parseValue(v) {\n        if (utils.isDate(v)) {\n          v = v.toISOString();\n        } else if (utils.isObject(v)) {\n          v = JSON.stringify(v);\n        }\n        parts.push(encode(key) + '=' + encode(v));\n      });\n    });\n\n    serializedParams = parts.join('&');\n  }\n\n  if (serializedParams) {\n    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;\n  }\n\n  return url;\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/buildURL.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Creates a new URL by combining the specified URLs\n *\n * @param {string} baseURL The base URL\n * @param {string} relativeURL The relative URL\n * @returns {string} The combined URL\n */\nmodule.exports = function combineURLs(baseURL, relativeURL) {\n  return relativeURL\n    ? baseURL.replace(/\\/+$/, '') + '/' + relativeURL.replace(/^\\/+/, '')\n    : baseURL;\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/combineURLs.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = (\n  utils.isStandardBrowserEnv() ?\n\n  // Standard browser envs support document.cookie\n  (function standardBrowserEnv() {\n    return {\n      write: function write(name, value, expires, path, domain, secure) {\n        var cookie = [];\n        cookie.push(name + '=' + encodeURIComponent(value));\n\n        if (utils.isNumber(expires)) {\n          cookie.push('expires=' + new Date(expires).toGMTString());\n        }\n\n        if (utils.isString(path)) {\n          cookie.push('path=' + path);\n        }\n\n        if (utils.isString(domain)) {\n          cookie.push('domain=' + domain);\n        }\n\n        if (secure === true) {\n          cookie.push('secure');\n        }\n\n        document.cookie = cookie.join('; ');\n      },\n\n      read: function read(name) {\n        var match = document.cookie.match(new RegExp('(^|;\\\\s*)(' + name + ')=([^;]*)'));\n        return (match ? decodeURIComponent(match[3]) : null);\n      },\n\n      remove: function remove(name) {\n        this.write(name, '', Date.now() - 86400000);\n      }\n    };\n  })() :\n\n  // Non standard browser env (web workers, react-native) lack needed support.\n  (function nonStandardBrowserEnv() {\n    return {\n      write: function write() {},\n      read: function read() { return null; },\n      remove: function remove() {}\n    };\n  })()\n);\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/cookies.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Determines whether the specified URL is absolute\n *\n * @param {string} url The URL to test\n * @returns {boolean} True if the specified URL is absolute, otherwise false\n */\nmodule.exports = function isAbsoluteURL(url) {\n  // A URL is considered absolute if it begins with \"<scheme>://\" or \"//\" (protocol-relative URL).\n  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed\n  // by any combination of letters, digits, plus, period, or hyphen.\n  return /^([a-z][a-z\\d\\+\\-\\.]*:)?\\/\\//i.test(url);\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/isAbsoluteURL.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = (\n  utils.isStandardBrowserEnv() ?\n\n  // Standard browser envs have full support of the APIs needed to test\n  // whether the request URL is of the same origin as current location.\n  (function standardBrowserEnv() {\n    var msie = /(msie|trident)/i.test(navigator.userAgent);\n    var urlParsingNode = document.createElement('a');\n    var originURL;\n\n    /**\n    * Parse a URL to discover it's components\n    *\n    * @param {String} url The URL to be parsed\n    * @returns {Object}\n    */\n    function resolveURL(url) {\n      var href = url;\n\n      if (msie) {\n        // IE needs attribute set twice to normalize properties\n        urlParsingNode.setAttribute('href', href);\n        href = urlParsingNode.href;\n      }\n\n      urlParsingNode.setAttribute('href', href);\n\n      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils\n      return {\n        href: urlParsingNode.href,\n        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',\n        host: urlParsingNode.host,\n        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\\?/, '') : '',\n        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',\n        hostname: urlParsingNode.hostname,\n        port: urlParsingNode.port,\n        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?\n                  urlParsingNode.pathname :\n                  '/' + urlParsingNode.pathname\n      };\n    }\n\n    originURL = resolveURL(window.location.href);\n\n    /**\n    * Determine if a URL shares the same origin as the current location\n    *\n    * @param {String} requestURL The URL to test\n    * @returns {boolean} True if URL shares the same origin, otherwise false\n    */\n    return function isURLSameOrigin(requestURL) {\n      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;\n      return (parsed.protocol === originURL.protocol &&\n            parsed.host === originURL.host);\n    };\n  })() :\n\n  // Non standard browser envs (web workers, react-native) lack needed support.\n  (function nonStandardBrowserEnv() {\n    return function isURLSameOrigin() {\n      return true;\n    };\n  })()\n);\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/isURLSameOrigin.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = function normalizeHeaderName(headers, normalizedName) {\n  utils.forEach(headers, function processHeader(value, name) {\n    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {\n      headers[normalizedName] = value;\n      delete headers[name];\n    }\n  });\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/normalizeHeaderName.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\n// Headers whose duplicates are ignored by node\n// c.f. https://nodejs.org/api/http.html#http_message_headers\nvar ignoreDuplicateOf = [\n  'age', 'authorization', 'content-length', 'content-type', 'etag',\n  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',\n  'last-modified', 'location', 'max-forwards', 'proxy-authorization',\n  'referer', 'retry-after', 'user-agent'\n];\n\n/**\n * Parse headers into an object\n *\n * ```\n * Date: Wed, 27 Aug 2014 08:58:49 GMT\n * Content-Type: application/json\n * Connection: keep-alive\n * Transfer-Encoding: chunked\n * ```\n *\n * @param {String} headers Headers needing to be parsed\n * @returns {Object} Headers parsed into an object\n */\nmodule.exports = function parseHeaders(headers) {\n  var parsed = {};\n  var key;\n  var val;\n  var i;\n\n  if (!headers) { return parsed; }\n\n  utils.forEach(headers.split('\\n'), function parser(line) {\n    i = line.indexOf(':');\n    key = utils.trim(line.substr(0, i)).toLowerCase();\n    val = utils.trim(line.substr(i + 1));\n\n    if (key) {\n      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {\n        return;\n      }\n      if (key === 'set-cookie') {\n        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);\n      } else {\n        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;\n      }\n    }\n  });\n\n  return parsed;\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/parseHeaders.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Syntactic sugar for invoking a function and expanding an array for arguments.\n *\n * Common use case would be to use `Function.prototype.apply`.\n *\n *  ```js\n *  function f(x, y, z) {}\n *  var args = [1, 2, 3];\n *  f.apply(null, args);\n *  ```\n *\n * With `spread` this example can be re-written.\n *\n *  ```js\n *  spread(function(x, y, z) {})([1, 2, 3]);\n *  ```\n *\n * @param {Function} callback\n * @returns {Function}\n */\nmodule.exports = function spread(callback) {\n  return function wrap(arr) {\n    return callback.apply(null, arr);\n  };\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/spread.js?");

/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar bind = __webpack_require__(/*! ./helpers/bind */ \"./node_modules/axios/lib/helpers/bind.js\");\nvar isBuffer = __webpack_require__(/*! is-buffer */ \"./node_modules/is-buffer/index.js\");\n\n/*global toString:true*/\n\n// utils is a library of generic helper functions non-specific to axios\n\nvar toString = Object.prototype.toString;\n\n/**\n * Determine if a value is an Array\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an Array, otherwise false\n */\nfunction isArray(val) {\n  return toString.call(val) === '[object Array]';\n}\n\n/**\n * Determine if a value is an ArrayBuffer\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an ArrayBuffer, otherwise false\n */\nfunction isArrayBuffer(val) {\n  return toString.call(val) === '[object ArrayBuffer]';\n}\n\n/**\n * Determine if a value is a FormData\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an FormData, otherwise false\n */\nfunction isFormData(val) {\n  return (typeof FormData !== 'undefined') && (val instanceof FormData);\n}\n\n/**\n * Determine if a value is a view on an ArrayBuffer\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false\n */\nfunction isArrayBufferView(val) {\n  var result;\n  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {\n    result = ArrayBuffer.isView(val);\n  } else {\n    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);\n  }\n  return result;\n}\n\n/**\n * Determine if a value is a String\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a String, otherwise false\n */\nfunction isString(val) {\n  return typeof val === 'string';\n}\n\n/**\n * Determine if a value is a Number\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Number, otherwise false\n */\nfunction isNumber(val) {\n  return typeof val === 'number';\n}\n\n/**\n * Determine if a value is undefined\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if the value is undefined, otherwise false\n */\nfunction isUndefined(val) {\n  return typeof val === 'undefined';\n}\n\n/**\n * Determine if a value is an Object\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an Object, otherwise false\n */\nfunction isObject(val) {\n  return val !== null && typeof val === 'object';\n}\n\n/**\n * Determine if a value is a Date\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Date, otherwise false\n */\nfunction isDate(val) {\n  return toString.call(val) === '[object Date]';\n}\n\n/**\n * Determine if a value is a File\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a File, otherwise false\n */\nfunction isFile(val) {\n  return toString.call(val) === '[object File]';\n}\n\n/**\n * Determine if a value is a Blob\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Blob, otherwise false\n */\nfunction isBlob(val) {\n  return toString.call(val) === '[object Blob]';\n}\n\n/**\n * Determine if a value is a Function\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Function, otherwise false\n */\nfunction isFunction(val) {\n  return toString.call(val) === '[object Function]';\n}\n\n/**\n * Determine if a value is a Stream\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Stream, otherwise false\n */\nfunction isStream(val) {\n  return isObject(val) && isFunction(val.pipe);\n}\n\n/**\n * Determine if a value is a URLSearchParams object\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a URLSearchParams object, otherwise false\n */\nfunction isURLSearchParams(val) {\n  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;\n}\n\n/**\n * Trim excess whitespace off the beginning and end of a string\n *\n * @param {String} str The String to trim\n * @returns {String} The String freed of excess whitespace\n */\nfunction trim(str) {\n  return str.replace(/^\\s*/, '').replace(/\\s*$/, '');\n}\n\n/**\n * Determine if we're running in a standard browser environment\n *\n * This allows axios to run in a web worker, and react-native.\n * Both environments support XMLHttpRequest, but not fully standard globals.\n *\n * web workers:\n *  typeof window -> undefined\n *  typeof document -> undefined\n *\n * react-native:\n *  navigator.product -> 'ReactNative'\n */\nfunction isStandardBrowserEnv() {\n  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {\n    return false;\n  }\n  return (\n    typeof window !== 'undefined' &&\n    typeof document !== 'undefined'\n  );\n}\n\n/**\n * Iterate over an Array or an Object invoking a function for each item.\n *\n * If `obj` is an Array callback will be called passing\n * the value, index, and complete array for each item.\n *\n * If 'obj' is an Object callback will be called passing\n * the value, key, and complete object for each property.\n *\n * @param {Object|Array} obj The object to iterate\n * @param {Function} fn The callback to invoke for each item\n */\nfunction forEach(obj, fn) {\n  // Don't bother if no value provided\n  if (obj === null || typeof obj === 'undefined') {\n    return;\n  }\n\n  // Force an array if not already something iterable\n  if (typeof obj !== 'object') {\n    /*eslint no-param-reassign:0*/\n    obj = [obj];\n  }\n\n  if (isArray(obj)) {\n    // Iterate over array values\n    for (var i = 0, l = obj.length; i < l; i++) {\n      fn.call(null, obj[i], i, obj);\n    }\n  } else {\n    // Iterate over object keys\n    for (var key in obj) {\n      if (Object.prototype.hasOwnProperty.call(obj, key)) {\n        fn.call(null, obj[key], key, obj);\n      }\n    }\n  }\n}\n\n/**\n * Accepts varargs expecting each argument to be an object, then\n * immutably merges the properties of each object and returns result.\n *\n * When multiple objects contain the same key the later object in\n * the arguments list will take precedence.\n *\n * Example:\n *\n * ```js\n * var result = merge({foo: 123}, {foo: 456});\n * console.log(result.foo); // outputs 456\n * ```\n *\n * @param {Object} obj1 Object to merge\n * @returns {Object} Result of all merge properties\n */\nfunction merge(/* obj1, obj2, obj3, ... */) {\n  var result = {};\n  function assignValue(val, key) {\n    if (typeof result[key] === 'object' && typeof val === 'object') {\n      result[key] = merge(result[key], val);\n    } else {\n      result[key] = val;\n    }\n  }\n\n  for (var i = 0, l = arguments.length; i < l; i++) {\n    forEach(arguments[i], assignValue);\n  }\n  return result;\n}\n\n/**\n * Extends object a by mutably adding to it the properties of object b.\n *\n * @param {Object} a The object to be extended\n * @param {Object} b The object to copy properties from\n * @param {Object} thisArg The object to bind function to\n * @return {Object} The resulting value of object a\n */\nfunction extend(a, b, thisArg) {\n  forEach(b, function assignValue(val, key) {\n    if (thisArg && typeof val === 'function') {\n      a[key] = bind(val, thisArg);\n    } else {\n      a[key] = val;\n    }\n  });\n  return a;\n}\n\nmodule.exports = {\n  isArray: isArray,\n  isArrayBuffer: isArrayBuffer,\n  isBuffer: isBuffer,\n  isFormData: isFormData,\n  isArrayBufferView: isArrayBufferView,\n  isString: isString,\n  isNumber: isNumber,\n  isObject: isObject,\n  isUndefined: isUndefined,\n  isDate: isDate,\n  isFile: isFile,\n  isBlob: isBlob,\n  isFunction: isFunction,\n  isStream: isStream,\n  isURLSearchParams: isURLSearchParams,\n  isStandardBrowserEnv: isStandardBrowserEnv,\n  forEach: forEach,\n  merge: merge,\n  extend: extend,\n  trim: trim\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/utils.js?");

/***/ }),

/***/ "./node_modules/extend/index.js":
/*!**************************************!*\
  !*** ./node_modules/extend/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar hasOwn = Object.prototype.hasOwnProperty;\nvar toStr = Object.prototype.toString;\nvar defineProperty = Object.defineProperty;\nvar gOPD = Object.getOwnPropertyDescriptor;\n\nvar isArray = function isArray(arr) {\n\tif (typeof Array.isArray === 'function') {\n\t\treturn Array.isArray(arr);\n\t}\n\n\treturn toStr.call(arr) === '[object Array]';\n};\n\nvar isPlainObject = function isPlainObject(obj) {\n\tif (!obj || toStr.call(obj) !== '[object Object]') {\n\t\treturn false;\n\t}\n\n\tvar hasOwnConstructor = hasOwn.call(obj, 'constructor');\n\tvar hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');\n\t// Not own constructor property must be Object\n\tif (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {\n\t\treturn false;\n\t}\n\n\t// Own properties are enumerated firstly, so to speed up,\n\t// if last one is own, then all properties are own.\n\tvar key;\n\tfor (key in obj) { /**/ }\n\n\treturn typeof key === 'undefined' || hasOwn.call(obj, key);\n};\n\n// If name is '__proto__', and Object.defineProperty is available, define __proto__ as an own property on target\nvar setProperty = function setProperty(target, options) {\n\tif (defineProperty && options.name === '__proto__') {\n\t\tdefineProperty(target, options.name, {\n\t\t\tenumerable: true,\n\t\t\tconfigurable: true,\n\t\t\tvalue: options.newValue,\n\t\t\twritable: true\n\t\t});\n\t} else {\n\t\ttarget[options.name] = options.newValue;\n\t}\n};\n\n// Return undefined instead of __proto__ if '__proto__' is not an own property\nvar getProperty = function getProperty(obj, name) {\n\tif (name === '__proto__') {\n\t\tif (!hasOwn.call(obj, name)) {\n\t\t\treturn void 0;\n\t\t} else if (gOPD) {\n\t\t\t// In early versions of node, obj['__proto__'] is buggy when obj has\n\t\t\t// __proto__ as an own property. Object.getOwnPropertyDescriptor() works.\n\t\t\treturn gOPD(obj, name).value;\n\t\t}\n\t}\n\n\treturn obj[name];\n};\n\nmodule.exports = function extend() {\n\tvar options, name, src, copy, copyIsArray, clone;\n\tvar target = arguments[0];\n\tvar i = 1;\n\tvar length = arguments.length;\n\tvar deep = false;\n\n\t// Handle a deep copy situation\n\tif (typeof target === 'boolean') {\n\t\tdeep = target;\n\t\ttarget = arguments[1] || {};\n\t\t// skip the boolean and the target\n\t\ti = 2;\n\t}\n\tif (target == null || (typeof target !== 'object' && typeof target !== 'function')) {\n\t\ttarget = {};\n\t}\n\n\tfor (; i < length; ++i) {\n\t\toptions = arguments[i];\n\t\t// Only deal with non-null/undefined values\n\t\tif (options != null) {\n\t\t\t// Extend the base object\n\t\t\tfor (name in options) {\n\t\t\t\tsrc = getProperty(target, name);\n\t\t\t\tcopy = getProperty(options, name);\n\n\t\t\t\t// Prevent never-ending loop\n\t\t\t\tif (target !== copy) {\n\t\t\t\t\t// Recurse if we're merging plain objects or arrays\n\t\t\t\t\tif (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {\n\t\t\t\t\t\tif (copyIsArray) {\n\t\t\t\t\t\t\tcopyIsArray = false;\n\t\t\t\t\t\t\tclone = src && isArray(src) ? src : [];\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tclone = src && isPlainObject(src) ? src : {};\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\t// Never move original objects, clone them\n\t\t\t\t\t\tsetProperty(target, { name: name, newValue: extend(deep, clone, copy) });\n\n\t\t\t\t\t// Don't bring in undefined values\n\t\t\t\t\t} else if (typeof copy !== 'undefined') {\n\t\t\t\t\t\tsetProperty(target, { name: name, newValue: copy });\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\t// Return the modified object\n\treturn target;\n};\n\n\n//# sourceURL=webpack:///./node_modules/extend/index.js?");

/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*!\n * Determine if an object is a Buffer\n *\n * @author   Feross Aboukhadijeh <https://feross.org>\n * @license  MIT\n */\n\n// The _isBuffer check is for Safari 5-7 support, because it's missing\n// Object.prototype.constructor. Remove this eventually\nmodule.exports = function (obj) {\n  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)\n}\n\nfunction isBuffer (obj) {\n  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)\n}\n\n// For Node v0.10 support. Remove this eventually.\nfunction isSlowBuffer (obj) {\n  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))\n}\n\n\n//# sourceURL=webpack:///./node_modules/is-buffer/index.js?");

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n\n//# sourceURL=webpack:///./node_modules/process/browser.js?");

/***/ }),

/***/ "./node_modules/snabbdom-pragma/dist/index.es6.js":
/*!********************************************************!*\
  !*** ./node_modules/snabbdom-pragma/dist/index.es6.js ***!
  \********************************************************/
/*! exports provided: createElementWithModules, createElement, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createElementWithModules\", function() { return createElementWithModules; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createElement\", function() { return createElement; });\n/* harmony import */ var extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! extend */ \"./node_modules/extend/index.js\");\n/* harmony import */ var extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(extend__WEBPACK_IMPORTED_MODULE_0__);\n\n\nvar undefinedv = function (v) { return v === undefined; };\n\nvar number = function (v) { return typeof v === 'number'; };\n\nvar string = function (v) { return typeof v === 'string'; };\n\nvar text = function (v) { return string(v) || number(v); };\n\nvar array = function (v) { return Array.isArray(v); };\n\nvar object = function (v) { return typeof v === 'object' && v !== null; };\n\nvar fun = function (v) { return typeof v === 'function'; };\n\nvar vnode = function (v) { return object(v) && 'sel' in v && 'data' in v && 'children' in v && 'text' in v; };\n\nvar svgPropsMap = { svg: 1, circle: 1, ellipse: 1, line: 1, polygon: 1,\n  polyline: 1, rect: 1, g: 1, path: 1, text: 1 };\n\nvar svg = function (v) { return v.sel in svgPropsMap; };\n\n// TODO: stop using extend here\nvar extend = function () {\n  var objs = [], len = arguments.length;\n  while ( len-- ) objs[ len ] = arguments[ len ];\n\n  return extend__WEBPACK_IMPORTED_MODULE_0___default.a.apply(void 0, [ true ].concat( objs ));\n};\n\nvar assign = function () {\n  var objs = [], len = arguments.length;\n  while ( len-- ) objs[ len ] = arguments[ len ];\n\n  return extend__WEBPACK_IMPORTED_MODULE_0___default.a.apply(void 0, [ false ].concat( objs ));\n};\n\nvar reduceDeep = function (arr, fn, initial) {\n  var result = initial;\n  for (var i = 0; i < arr.length; i++) {\n    var value = arr[i];\n    if (array(value)) {\n      result = reduceDeep(value, fn, result);\n    } else {\n      result = fn(result, value);\n    }\n  }\n  return result\n};\n\nvar mapObject = function (obj, fn) { return Object.keys(obj).map(\n  function (key) { return fn(key, obj[key]); }\n).reduce(\n  function (acc, curr) { return extend(acc, curr); },\n  {}\n); };\n\nvar deepifyKeys = function (obj, modules) { return mapObject(obj,\n  function (key, val) {\n    var dashIndex = key.indexOf('-');\n    if (dashIndex > -1 && modules[key.slice(0, dashIndex)] !== undefined) {\n      var moduleData = {};\n      moduleData[key.slice(dashIndex + 1)] = val;\n      return ( obj = {}, obj[key.slice(0, dashIndex)] = moduleData, obj )\n      var obj;\n    }\n    return ( obj$1 = {}, obj$1[key] = val, obj$1 )\n    var obj$1;\n  }\n); };\n\n\n\nvar omit = function (key, obj) { return mapObject(obj,\n  function (mod, data) { return mod !== key ? (( obj = {}, obj[mod] = data, obj )) : {}\n    var obj; }\n); };\n\n// Const fnName = (...params) => guard ? default : ...\n\nvar createTextElement = function (text$$1) { return !text(text$$1) ? undefined : {\n  text: text$$1,\n  sel: undefined,\n  data: undefined,\n  children: undefined,\n  elm: undefined,\n  key: undefined\n}; };\n\nvar considerSvg = function (vnode$$1) { return !svg(vnode$$1) ? vnode$$1 :\n  assign(vnode$$1,\n    { data: omit('props', extend(vnode$$1.data,\n      { ns: 'http://www.w3.org/2000/svg', attrs: omit('className', extend(vnode$$1.data.props,\n        { class: vnode$$1.data.props ? vnode$$1.data.props.className : undefined }\n      )) }\n    )) },\n    { children: undefinedv(vnode$$1.children) ? undefined :\n      vnode$$1.children.map(function (child) { return considerSvg(child); })\n    }\n  ); };\n\nvar rewrites = {\n  for: 'attrs',\n  role: 'attrs',\n  tabindex: 'attrs',\n  'aria-*': 'attrs',\n  key: null\n};\n\nvar rewriteModules = function (data, modules) { return mapObject(data, function (key, val) {\n  var inner = {};\n  inner[key] = val;\n  if (rewrites[key] && modules[rewrites[key]] !== undefined) {\n    return ( obj = {}, obj[rewrites[key]] = inner, obj )\n    var obj;\n  }\n  if (rewrites[key] === null) {\n    return {}\n  }\n  var keys = Object.keys(rewrites);\n  for (var i = 0; i < keys.length; i++) {\n    var k = keys[i];\n    if (k.charAt(k.length - 1) === '*' && key.indexOf(k.slice(0, -1)) === 0 && modules[rewrites[k]] !== undefined) {\n      return ( obj$1 = {}, obj$1[rewrites[k]] = inner, obj$1 )\n      var obj$1;\n    }\n  }\n  if (modules[key] !== undefined) {\n    return ( obj$2 = {}, obj$2[modules[key] ? modules[key] : key] = val, obj$2 )\n    var obj$2;\n  }\n  if (modules.props !== undefined) {\n    return { props: inner }\n  }\n  return inner\n}); };\n\nvar sanitizeData = function (data, modules) { return considerSvg(rewriteModules(deepifyKeys(data, modules), modules)); };\n\nvar sanitizeText = function (children) { return children.length > 1 || !text(children[0]) ? undefined : children[0]; };\n\nvar sanitizeChildren = function (children) { return reduceDeep(children, function (acc, child) {\n  var vnode$$1 = vnode(child) ? child : createTextElement(child);\n  acc.push(vnode$$1);\n  return acc\n}\n, []); };\n\nvar defaultModules = {\n  attrs: '',\n  props: '',\n  class: '',\n  data: 'dataset',\n  style: '',\n  hook: '',\n  on: ''\n};\n\nvar createElementWithModules = function (modules) {\n  return function (sel, data) {\n    var children = [], len = arguments.length - 2;\n    while ( len-- > 0 ) children[ len ] = arguments[ len + 2 ];\n\n    if (fun(sel)) {\n      return sel(data || {}, children)\n    }\n    var text$$1 = sanitizeText(children, modules);\n    return considerSvg({\n      sel: sel,\n      data: data ? sanitizeData(data, modules) : {},\n      children: text$$1 ? undefined : sanitizeChildren(children),\n      text: text$$1,\n      elm: undefined,\n      key: data ? data.key : undefined\n    })\n  }\n};\n\nvar createElement = createElementWithModules(defaultModules);\n\nvar index = {\n  createElement: createElement,\n  createElementWithModules: createElementWithModules\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (index);\n\n\n//# sourceURL=webpack:///./node_modules/snabbdom-pragma/dist/index.es6.js?");

/***/ }),

/***/ "./node_modules/snabbdom/es/h.js":
/*!***************************************!*\
  !*** ./node_modules/snabbdom/es/h.js ***!
  \***************************************/
/*! exports provided: h, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"h\", function() { return h; });\n/* harmony import */ var _vnode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vnode */ \"./node_modules/snabbdom/es/vnode.js\");\n/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./is */ \"./node_modules/snabbdom/es/is.js\");\n\n\nfunction addNS(data, children, sel) {\n    data.ns = 'http://www.w3.org/2000/svg';\n    if (sel !== 'foreignObject' && children !== undefined) {\n        for (var i = 0; i < children.length; ++i) {\n            var childData = children[i].data;\n            if (childData !== undefined) {\n                addNS(childData, children[i].children, children[i].sel);\n            }\n        }\n    }\n}\nfunction h(sel, b, c) {\n    var data = {}, children, text, i;\n    if (c !== undefined) {\n        data = b;\n        if (_is__WEBPACK_IMPORTED_MODULE_1__[\"array\"](c)) {\n            children = c;\n        }\n        else if (_is__WEBPACK_IMPORTED_MODULE_1__[\"primitive\"](c)) {\n            text = c;\n        }\n        else if (c && c.sel) {\n            children = [c];\n        }\n    }\n    else if (b !== undefined) {\n        if (_is__WEBPACK_IMPORTED_MODULE_1__[\"array\"](b)) {\n            children = b;\n        }\n        else if (_is__WEBPACK_IMPORTED_MODULE_1__[\"primitive\"](b)) {\n            text = b;\n        }\n        else if (b && b.sel) {\n            children = [b];\n        }\n        else {\n            data = b;\n        }\n    }\n    if (children !== undefined) {\n        for (i = 0; i < children.length; ++i) {\n            if (_is__WEBPACK_IMPORTED_MODULE_1__[\"primitive\"](children[i]))\n                children[i] = Object(_vnode__WEBPACK_IMPORTED_MODULE_0__[\"vnode\"])(undefined, undefined, undefined, children[i], undefined);\n        }\n    }\n    if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' &&\n        (sel.length === 3 || sel[3] === '.' || sel[3] === '#')) {\n        addNS(data, children, sel);\n    }\n    return Object(_vnode__WEBPACK_IMPORTED_MODULE_0__[\"vnode\"])(sel, data, children, text, undefined);\n}\n;\n/* harmony default export */ __webpack_exports__[\"default\"] = (h);\n//# sourceMappingURL=h.js.map\n\n//# sourceURL=webpack:///./node_modules/snabbdom/es/h.js?");

/***/ }),

/***/ "./node_modules/snabbdom/es/htmldomapi.js":
/*!************************************************!*\
  !*** ./node_modules/snabbdom/es/htmldomapi.js ***!
  \************************************************/
/*! exports provided: htmlDomApi, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"htmlDomApi\", function() { return htmlDomApi; });\nfunction createElement(tagName) {\n    return document.createElement(tagName);\n}\nfunction createElementNS(namespaceURI, qualifiedName) {\n    return document.createElementNS(namespaceURI, qualifiedName);\n}\nfunction createTextNode(text) {\n    return document.createTextNode(text);\n}\nfunction createComment(text) {\n    return document.createComment(text);\n}\nfunction insertBefore(parentNode, newNode, referenceNode) {\n    parentNode.insertBefore(newNode, referenceNode);\n}\nfunction removeChild(node, child) {\n    node.removeChild(child);\n}\nfunction appendChild(node, child) {\n    node.appendChild(child);\n}\nfunction parentNode(node) {\n    return node.parentNode;\n}\nfunction nextSibling(node) {\n    return node.nextSibling;\n}\nfunction tagName(elm) {\n    return elm.tagName;\n}\nfunction setTextContent(node, text) {\n    node.textContent = text;\n}\nfunction getTextContent(node) {\n    return node.textContent;\n}\nfunction isElement(node) {\n    return node.nodeType === 1;\n}\nfunction isText(node) {\n    return node.nodeType === 3;\n}\nfunction isComment(node) {\n    return node.nodeType === 8;\n}\nvar htmlDomApi = {\n    createElement: createElement,\n    createElementNS: createElementNS,\n    createTextNode: createTextNode,\n    createComment: createComment,\n    insertBefore: insertBefore,\n    removeChild: removeChild,\n    appendChild: appendChild,\n    parentNode: parentNode,\n    nextSibling: nextSibling,\n    tagName: tagName,\n    setTextContent: setTextContent,\n    getTextContent: getTextContent,\n    isElement: isElement,\n    isText: isText,\n    isComment: isComment,\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (htmlDomApi);\n//# sourceMappingURL=htmldomapi.js.map\n\n//# sourceURL=webpack:///./node_modules/snabbdom/es/htmldomapi.js?");

/***/ }),

/***/ "./node_modules/snabbdom/es/is.js":
/*!****************************************!*\
  !*** ./node_modules/snabbdom/es/is.js ***!
  \****************************************/
/*! exports provided: array, primitive */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"array\", function() { return array; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"primitive\", function() { return primitive; });\nvar array = Array.isArray;\nfunction primitive(s) {\n    return typeof s === 'string' || typeof s === 'number';\n}\n//# sourceMappingURL=is.js.map\n\n//# sourceURL=webpack:///./node_modules/snabbdom/es/is.js?");

/***/ }),

/***/ "./node_modules/snabbdom/es/snabbdom.js":
/*!**********************************************!*\
  !*** ./node_modules/snabbdom/es/snabbdom.js ***!
  \**********************************************/
/*! exports provided: h, thunk, init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"init\", function() { return init; });\n/* harmony import */ var _vnode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vnode */ \"./node_modules/snabbdom/es/vnode.js\");\n/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./is */ \"./node_modules/snabbdom/es/is.js\");\n/* harmony import */ var _htmldomapi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./htmldomapi */ \"./node_modules/snabbdom/es/htmldomapi.js\");\n/* harmony import */ var _h__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./h */ \"./node_modules/snabbdom/es/h.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"h\", function() { return _h__WEBPACK_IMPORTED_MODULE_3__[\"h\"]; });\n\n/* harmony import */ var _thunk__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./thunk */ \"./node_modules/snabbdom/es/thunk.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"thunk\", function() { return _thunk__WEBPACK_IMPORTED_MODULE_4__[\"thunk\"]; });\n\n\n\n\nfunction isUndef(s) { return s === undefined; }\nfunction isDef(s) { return s !== undefined; }\nvar emptyNode = Object(_vnode__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('', {}, [], undefined, undefined);\nfunction sameVnode(vnode1, vnode2) {\n    return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;\n}\nfunction isVnode(vnode) {\n    return vnode.sel !== undefined;\n}\nfunction createKeyToOldIdx(children, beginIdx, endIdx) {\n    var i, map = {}, key, ch;\n    for (i = beginIdx; i <= endIdx; ++i) {\n        ch = children[i];\n        if (ch != null) {\n            key = ch.key;\n            if (key !== undefined)\n                map[key] = i;\n        }\n    }\n    return map;\n}\nvar hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];\n\n\nfunction init(modules, domApi) {\n    var i, j, cbs = {};\n    var api = domApi !== undefined ? domApi : _htmldomapi__WEBPACK_IMPORTED_MODULE_2__[\"default\"];\n    for (i = 0; i < hooks.length; ++i) {\n        cbs[hooks[i]] = [];\n        for (j = 0; j < modules.length; ++j) {\n            var hook = modules[j][hooks[i]];\n            if (hook !== undefined) {\n                cbs[hooks[i]].push(hook);\n            }\n        }\n    }\n    function emptyNodeAt(elm) {\n        var id = elm.id ? '#' + elm.id : '';\n        var c = elm.className ? '.' + elm.className.split(' ').join('.') : '';\n        return Object(_vnode__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm);\n    }\n    function createRmCb(childElm, listeners) {\n        return function rmCb() {\n            if (--listeners === 0) {\n                var parent_1 = api.parentNode(childElm);\n                api.removeChild(parent_1, childElm);\n            }\n        };\n    }\n    function createElm(vnode, insertedVnodeQueue) {\n        var i, data = vnode.data;\n        if (data !== undefined) {\n            if (isDef(i = data.hook) && isDef(i = i.init)) {\n                i(vnode);\n                data = vnode.data;\n            }\n        }\n        var children = vnode.children, sel = vnode.sel;\n        if (sel === '!') {\n            if (isUndef(vnode.text)) {\n                vnode.text = '';\n            }\n            vnode.elm = api.createComment(vnode.text);\n        }\n        else if (sel !== undefined) {\n            // Parse selector\n            var hashIdx = sel.indexOf('#');\n            var dotIdx = sel.indexOf('.', hashIdx);\n            var hash = hashIdx > 0 ? hashIdx : sel.length;\n            var dot = dotIdx > 0 ? dotIdx : sel.length;\n            var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;\n            var elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? api.createElementNS(i, tag)\n                : api.createElement(tag);\n            if (hash < dot)\n                elm.setAttribute('id', sel.slice(hash + 1, dot));\n            if (dotIdx > 0)\n                elm.setAttribute('class', sel.slice(dot + 1).replace(/\\./g, ' '));\n            for (i = 0; i < cbs.create.length; ++i)\n                cbs.create[i](emptyNode, vnode);\n            if (_is__WEBPACK_IMPORTED_MODULE_1__[\"array\"](children)) {\n                for (i = 0; i < children.length; ++i) {\n                    var ch = children[i];\n                    if (ch != null) {\n                        api.appendChild(elm, createElm(ch, insertedVnodeQueue));\n                    }\n                }\n            }\n            else if (_is__WEBPACK_IMPORTED_MODULE_1__[\"primitive\"](vnode.text)) {\n                api.appendChild(elm, api.createTextNode(vnode.text));\n            }\n            i = vnode.data.hook; // Reuse variable\n            if (isDef(i)) {\n                if (i.create)\n                    i.create(emptyNode, vnode);\n                if (i.insert)\n                    insertedVnodeQueue.push(vnode);\n            }\n        }\n        else {\n            vnode.elm = api.createTextNode(vnode.text);\n        }\n        return vnode.elm;\n    }\n    function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {\n        for (; startIdx <= endIdx; ++startIdx) {\n            var ch = vnodes[startIdx];\n            if (ch != null) {\n                api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before);\n            }\n        }\n    }\n    function invokeDestroyHook(vnode) {\n        var i, j, data = vnode.data;\n        if (data !== undefined) {\n            if (isDef(i = data.hook) && isDef(i = i.destroy))\n                i(vnode);\n            for (i = 0; i < cbs.destroy.length; ++i)\n                cbs.destroy[i](vnode);\n            if (vnode.children !== undefined) {\n                for (j = 0; j < vnode.children.length; ++j) {\n                    i = vnode.children[j];\n                    if (i != null && typeof i !== \"string\") {\n                        invokeDestroyHook(i);\n                    }\n                }\n            }\n        }\n    }\n    function removeVnodes(parentElm, vnodes, startIdx, endIdx) {\n        for (; startIdx <= endIdx; ++startIdx) {\n            var i_1 = void 0, listeners = void 0, rm = void 0, ch = vnodes[startIdx];\n            if (ch != null) {\n                if (isDef(ch.sel)) {\n                    invokeDestroyHook(ch);\n                    listeners = cbs.remove.length + 1;\n                    rm = createRmCb(ch.elm, listeners);\n                    for (i_1 = 0; i_1 < cbs.remove.length; ++i_1)\n                        cbs.remove[i_1](ch, rm);\n                    if (isDef(i_1 = ch.data) && isDef(i_1 = i_1.hook) && isDef(i_1 = i_1.remove)) {\n                        i_1(ch, rm);\n                    }\n                    else {\n                        rm();\n                    }\n                }\n                else {\n                    api.removeChild(parentElm, ch.elm);\n                }\n            }\n        }\n    }\n    function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {\n        var oldStartIdx = 0, newStartIdx = 0;\n        var oldEndIdx = oldCh.length - 1;\n        var oldStartVnode = oldCh[0];\n        var oldEndVnode = oldCh[oldEndIdx];\n        var newEndIdx = newCh.length - 1;\n        var newStartVnode = newCh[0];\n        var newEndVnode = newCh[newEndIdx];\n        var oldKeyToIdx;\n        var idxInOld;\n        var elmToMove;\n        var before;\n        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {\n            if (oldStartVnode == null) {\n                oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left\n            }\n            else if (oldEndVnode == null) {\n                oldEndVnode = oldCh[--oldEndIdx];\n            }\n            else if (newStartVnode == null) {\n                newStartVnode = newCh[++newStartIdx];\n            }\n            else if (newEndVnode == null) {\n                newEndVnode = newCh[--newEndIdx];\n            }\n            else if (sameVnode(oldStartVnode, newStartVnode)) {\n                patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);\n                oldStartVnode = oldCh[++oldStartIdx];\n                newStartVnode = newCh[++newStartIdx];\n            }\n            else if (sameVnode(oldEndVnode, newEndVnode)) {\n                patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);\n                oldEndVnode = oldCh[--oldEndIdx];\n                newEndVnode = newCh[--newEndIdx];\n            }\n            else if (sameVnode(oldStartVnode, newEndVnode)) {\n                patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);\n                api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));\n                oldStartVnode = oldCh[++oldStartIdx];\n                newEndVnode = newCh[--newEndIdx];\n            }\n            else if (sameVnode(oldEndVnode, newStartVnode)) {\n                patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);\n                api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);\n                oldEndVnode = oldCh[--oldEndIdx];\n                newStartVnode = newCh[++newStartIdx];\n            }\n            else {\n                if (oldKeyToIdx === undefined) {\n                    oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);\n                }\n                idxInOld = oldKeyToIdx[newStartVnode.key];\n                if (isUndef(idxInOld)) {\n                    api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);\n                    newStartVnode = newCh[++newStartIdx];\n                }\n                else {\n                    elmToMove = oldCh[idxInOld];\n                    if (elmToMove.sel !== newStartVnode.sel) {\n                        api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);\n                    }\n                    else {\n                        patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);\n                        oldCh[idxInOld] = undefined;\n                        api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);\n                    }\n                    newStartVnode = newCh[++newStartIdx];\n                }\n            }\n        }\n        if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {\n            if (oldStartIdx > oldEndIdx) {\n                before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;\n                addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);\n            }\n            else {\n                removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);\n            }\n        }\n    }\n    function patchVnode(oldVnode, vnode, insertedVnodeQueue) {\n        var i, hook;\n        if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {\n            i(oldVnode, vnode);\n        }\n        var elm = vnode.elm = oldVnode.elm;\n        var oldCh = oldVnode.children;\n        var ch = vnode.children;\n        if (oldVnode === vnode)\n            return;\n        if (vnode.data !== undefined) {\n            for (i = 0; i < cbs.update.length; ++i)\n                cbs.update[i](oldVnode, vnode);\n            i = vnode.data.hook;\n            if (isDef(i) && isDef(i = i.update))\n                i(oldVnode, vnode);\n        }\n        if (isUndef(vnode.text)) {\n            if (isDef(oldCh) && isDef(ch)) {\n                if (oldCh !== ch)\n                    updateChildren(elm, oldCh, ch, insertedVnodeQueue);\n            }\n            else if (isDef(ch)) {\n                if (isDef(oldVnode.text))\n                    api.setTextContent(elm, '');\n                addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);\n            }\n            else if (isDef(oldCh)) {\n                removeVnodes(elm, oldCh, 0, oldCh.length - 1);\n            }\n            else if (isDef(oldVnode.text)) {\n                api.setTextContent(elm, '');\n            }\n        }\n        else if (oldVnode.text !== vnode.text) {\n            if (isDef(oldCh)) {\n                removeVnodes(elm, oldCh, 0, oldCh.length - 1);\n            }\n            api.setTextContent(elm, vnode.text);\n        }\n        if (isDef(hook) && isDef(i = hook.postpatch)) {\n            i(oldVnode, vnode);\n        }\n    }\n    return function patch(oldVnode, vnode) {\n        var i, elm, parent;\n        var insertedVnodeQueue = [];\n        for (i = 0; i < cbs.pre.length; ++i)\n            cbs.pre[i]();\n        if (!isVnode(oldVnode)) {\n            oldVnode = emptyNodeAt(oldVnode);\n        }\n        if (sameVnode(oldVnode, vnode)) {\n            patchVnode(oldVnode, vnode, insertedVnodeQueue);\n        }\n        else {\n            elm = oldVnode.elm;\n            parent = api.parentNode(elm);\n            createElm(vnode, insertedVnodeQueue);\n            if (parent !== null) {\n                api.insertBefore(parent, vnode.elm, api.nextSibling(elm));\n                removeVnodes(parent, [oldVnode], 0, 0);\n            }\n        }\n        for (i = 0; i < insertedVnodeQueue.length; ++i) {\n            insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);\n        }\n        for (i = 0; i < cbs.post.length; ++i)\n            cbs.post[i]();\n        return vnode;\n    };\n}\n//# sourceMappingURL=snabbdom.js.map\n\n//# sourceURL=webpack:///./node_modules/snabbdom/es/snabbdom.js?");

/***/ }),

/***/ "./node_modules/snabbdom/es/thunk.js":
/*!*******************************************!*\
  !*** ./node_modules/snabbdom/es/thunk.js ***!
  \*******************************************/
/*! exports provided: thunk, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"thunk\", function() { return thunk; });\n/* harmony import */ var _h__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./h */ \"./node_modules/snabbdom/es/h.js\");\n\nfunction copyToThunk(vnode, thunk) {\n    thunk.elm = vnode.elm;\n    vnode.data.fn = thunk.data.fn;\n    vnode.data.args = thunk.data.args;\n    thunk.data = vnode.data;\n    thunk.children = vnode.children;\n    thunk.text = vnode.text;\n    thunk.elm = vnode.elm;\n}\nfunction init(thunk) {\n    var cur = thunk.data;\n    var vnode = cur.fn.apply(undefined, cur.args);\n    copyToThunk(vnode, thunk);\n}\nfunction prepatch(oldVnode, thunk) {\n    var i, old = oldVnode.data, cur = thunk.data;\n    var oldArgs = old.args, args = cur.args;\n    if (old.fn !== cur.fn || oldArgs.length !== args.length) {\n        copyToThunk(cur.fn.apply(undefined, args), thunk);\n        return;\n    }\n    for (i = 0; i < args.length; ++i) {\n        if (oldArgs[i] !== args[i]) {\n            copyToThunk(cur.fn.apply(undefined, args), thunk);\n            return;\n        }\n    }\n    copyToThunk(oldVnode, thunk);\n}\nvar thunk = function thunk(sel, key, fn, args) {\n    if (args === undefined) {\n        args = fn;\n        fn = key;\n        key = undefined;\n    }\n    return Object(_h__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(sel, {\n        key: key,\n        hook: { init: init, prepatch: prepatch },\n        fn: fn,\n        args: args\n    });\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (thunk);\n//# sourceMappingURL=thunk.js.map\n\n//# sourceURL=webpack:///./node_modules/snabbdom/es/thunk.js?");

/***/ }),

/***/ "./node_modules/snabbdom/es/vnode.js":
/*!*******************************************!*\
  !*** ./node_modules/snabbdom/es/vnode.js ***!
  \*******************************************/
/*! exports provided: vnode, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"vnode\", function() { return vnode; });\nfunction vnode(sel, data, children, text, elm) {\n    var key = data === undefined ? undefined : data.key;\n    return { sel: sel, data: data, children: children,\n        text: text, elm: elm, key: key };\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (vnode);\n//# sourceMappingURL=vnode.js.map\n\n//# sourceURL=webpack:///./node_modules/snabbdom/es/vnode.js?");

/***/ }),

/***/ "./node_modules/snabbdom/h.js":
/*!************************************!*\
  !*** ./node_modules/snabbdom/h.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar vnode_1 = __webpack_require__(/*! ./vnode */ \"./node_modules/snabbdom/vnode.js\");\nvar is = __webpack_require__(/*! ./is */ \"./node_modules/snabbdom/is.js\");\nfunction addNS(data, children, sel) {\n    data.ns = 'http://www.w3.org/2000/svg';\n    if (sel !== 'foreignObject' && children !== undefined) {\n        for (var i = 0; i < children.length; ++i) {\n            var childData = children[i].data;\n            if (childData !== undefined) {\n                addNS(childData, children[i].children, children[i].sel);\n            }\n        }\n    }\n}\nfunction h(sel, b, c) {\n    var data = {}, children, text, i;\n    if (c !== undefined) {\n        data = b;\n        if (is.array(c)) {\n            children = c;\n        }\n        else if (is.primitive(c)) {\n            text = c;\n        }\n        else if (c && c.sel) {\n            children = [c];\n        }\n    }\n    else if (b !== undefined) {\n        if (is.array(b)) {\n            children = b;\n        }\n        else if (is.primitive(b)) {\n            text = b;\n        }\n        else if (b && b.sel) {\n            children = [b];\n        }\n        else {\n            data = b;\n        }\n    }\n    if (children !== undefined) {\n        for (i = 0; i < children.length; ++i) {\n            if (is.primitive(children[i]))\n                children[i] = vnode_1.vnode(undefined, undefined, undefined, children[i], undefined);\n        }\n    }\n    if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' &&\n        (sel.length === 3 || sel[3] === '.' || sel[3] === '#')) {\n        addNS(data, children, sel);\n    }\n    return vnode_1.vnode(sel, data, children, text, undefined);\n}\nexports.h = h;\n;\nexports.default = h;\n//# sourceMappingURL=h.js.map\n\n//# sourceURL=webpack:///./node_modules/snabbdom/h.js?");

/***/ }),

/***/ "./node_modules/snabbdom/is.js":
/*!*************************************!*\
  !*** ./node_modules/snabbdom/is.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.array = Array.isArray;\nfunction primitive(s) {\n    return typeof s === 'string' || typeof s === 'number';\n}\nexports.primitive = primitive;\n//# sourceMappingURL=is.js.map\n\n//# sourceURL=webpack:///./node_modules/snabbdom/is.js?");

/***/ }),

/***/ "./node_modules/snabbdom/modules/attributes.js":
/*!*****************************************************!*\
  !*** ./node_modules/snabbdom/modules/attributes.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar xlinkNS = 'http://www.w3.org/1999/xlink';\nvar xmlNS = 'http://www.w3.org/XML/1998/namespace';\nvar colonChar = 58;\nvar xChar = 120;\nfunction updateAttrs(oldVnode, vnode) {\n    var key, elm = vnode.elm, oldAttrs = oldVnode.data.attrs, attrs = vnode.data.attrs;\n    if (!oldAttrs && !attrs)\n        return;\n    if (oldAttrs === attrs)\n        return;\n    oldAttrs = oldAttrs || {};\n    attrs = attrs || {};\n    // update modified attributes, add new attributes\n    for (key in attrs) {\n        var cur = attrs[key];\n        var old = oldAttrs[key];\n        if (old !== cur) {\n            if (cur === true) {\n                elm.setAttribute(key, \"\");\n            }\n            else if (cur === false) {\n                elm.removeAttribute(key);\n            }\n            else {\n                if (key.charCodeAt(0) !== xChar) {\n                    elm.setAttribute(key, cur);\n                }\n                else if (key.charCodeAt(3) === colonChar) {\n                    // Assume xml namespace\n                    elm.setAttributeNS(xmlNS, key, cur);\n                }\n                else if (key.charCodeAt(5) === colonChar) {\n                    // Assume xlink namespace\n                    elm.setAttributeNS(xlinkNS, key, cur);\n                }\n                else {\n                    elm.setAttribute(key, cur);\n                }\n            }\n        }\n    }\n    // remove removed attributes\n    // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)\n    // the other option is to remove all attributes with value == undefined\n    for (key in oldAttrs) {\n        if (!(key in attrs)) {\n            elm.removeAttribute(key);\n        }\n    }\n}\nexports.attributesModule = { create: updateAttrs, update: updateAttrs };\nexports.default = exports.attributesModule;\n//# sourceMappingURL=attributes.js.map\n\n//# sourceURL=webpack:///./node_modules/snabbdom/modules/attributes.js?");

/***/ }),

/***/ "./node_modules/snabbdom/modules/class.js":
/*!************************************************!*\
  !*** ./node_modules/snabbdom/modules/class.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction updateClass(oldVnode, vnode) {\n    var cur, name, elm = vnode.elm, oldClass = oldVnode.data.class, klass = vnode.data.class;\n    if (!oldClass && !klass)\n        return;\n    if (oldClass === klass)\n        return;\n    oldClass = oldClass || {};\n    klass = klass || {};\n    for (name in oldClass) {\n        if (!klass[name]) {\n            elm.classList.remove(name);\n        }\n    }\n    for (name in klass) {\n        cur = klass[name];\n        if (cur !== oldClass[name]) {\n            elm.classList[cur ? 'add' : 'remove'](name);\n        }\n    }\n}\nexports.classModule = { create: updateClass, update: updateClass };\nexports.default = exports.classModule;\n//# sourceMappingURL=class.js.map\n\n//# sourceURL=webpack:///./node_modules/snabbdom/modules/class.js?");

/***/ }),

/***/ "./node_modules/snabbdom/modules/eventlisteners.js":
/*!*********************************************************!*\
  !*** ./node_modules/snabbdom/modules/eventlisteners.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction invokeHandler(handler, vnode, event) {\n    if (typeof handler === \"function\") {\n        // call function handler\n        handler.call(vnode, event, vnode);\n    }\n    else if (typeof handler === \"object\") {\n        // call handler with arguments\n        if (typeof handler[0] === \"function\") {\n            // special case for single argument for performance\n            if (handler.length === 2) {\n                handler[0].call(vnode, handler[1], event, vnode);\n            }\n            else {\n                var args = handler.slice(1);\n                args.push(event);\n                args.push(vnode);\n                handler[0].apply(vnode, args);\n            }\n        }\n        else {\n            // call multiple handlers\n            for (var i = 0; i < handler.length; i++) {\n                invokeHandler(handler[i], vnode, event);\n            }\n        }\n    }\n}\nfunction handleEvent(event, vnode) {\n    var name = event.type, on = vnode.data.on;\n    // call event handler(s) if exists\n    if (on && on[name]) {\n        invokeHandler(on[name], vnode, event);\n    }\n}\nfunction createListener() {\n    return function handler(event) {\n        handleEvent(event, handler.vnode);\n    };\n}\nfunction updateEventListeners(oldVnode, vnode) {\n    var oldOn = oldVnode.data.on, oldListener = oldVnode.listener, oldElm = oldVnode.elm, on = vnode && vnode.data.on, elm = (vnode && vnode.elm), name;\n    // optimization for reused immutable handlers\n    if (oldOn === on) {\n        return;\n    }\n    // remove existing listeners which no longer used\n    if (oldOn && oldListener) {\n        // if element changed or deleted we remove all existing listeners unconditionally\n        if (!on) {\n            for (name in oldOn) {\n                // remove listener if element was changed or existing listeners removed\n                oldElm.removeEventListener(name, oldListener, false);\n            }\n        }\n        else {\n            for (name in oldOn) {\n                // remove listener if existing listener removed\n                if (!on[name]) {\n                    oldElm.removeEventListener(name, oldListener, false);\n                }\n            }\n        }\n    }\n    // add new listeners which has not already attached\n    if (on) {\n        // reuse existing listener or create new\n        var listener = vnode.listener = oldVnode.listener || createListener();\n        // update vnode for listener\n        listener.vnode = vnode;\n        // if element changed or added we add all needed listeners unconditionally\n        if (!oldOn) {\n            for (name in on) {\n                // add listener if element was changed or new listeners added\n                elm.addEventListener(name, listener, false);\n            }\n        }\n        else {\n            for (name in on) {\n                // add listener if new listener added\n                if (!oldOn[name]) {\n                    elm.addEventListener(name, listener, false);\n                }\n            }\n        }\n    }\n}\nexports.eventListenersModule = {\n    create: updateEventListeners,\n    update: updateEventListeners,\n    destroy: updateEventListeners\n};\nexports.default = exports.eventListenersModule;\n//# sourceMappingURL=eventlisteners.js.map\n\n//# sourceURL=webpack:///./node_modules/snabbdom/modules/eventlisteners.js?");

/***/ }),

/***/ "./node_modules/snabbdom/modules/props.js":
/*!************************************************!*\
  !*** ./node_modules/snabbdom/modules/props.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction updateProps(oldVnode, vnode) {\n    var key, cur, old, elm = vnode.elm, oldProps = oldVnode.data.props, props = vnode.data.props;\n    if (!oldProps && !props)\n        return;\n    if (oldProps === props)\n        return;\n    oldProps = oldProps || {};\n    props = props || {};\n    for (key in oldProps) {\n        if (!props[key]) {\n            delete elm[key];\n        }\n    }\n    for (key in props) {\n        cur = props[key];\n        old = oldProps[key];\n        if (old !== cur && (key !== 'value' || elm[key] !== cur)) {\n            elm[key] = cur;\n        }\n    }\n}\nexports.propsModule = { create: updateProps, update: updateProps };\nexports.default = exports.propsModule;\n//# sourceMappingURL=props.js.map\n\n//# sourceURL=webpack:///./node_modules/snabbdom/modules/props.js?");

/***/ }),

/***/ "./node_modules/snabbdom/modules/style.js":
/*!************************************************!*\
  !*** ./node_modules/snabbdom/modules/style.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n// Bindig `requestAnimationFrame` like this fixes a bug in IE/Edge. See #360 and #409.\nvar raf = (typeof window !== 'undefined' && (window.requestAnimationFrame).bind(window)) || setTimeout;\nvar nextFrame = function (fn) { raf(function () { raf(fn); }); };\nvar reflowForced = false;\nfunction setNextFrame(obj, prop, val) {\n    nextFrame(function () { obj[prop] = val; });\n}\nfunction updateStyle(oldVnode, vnode) {\n    var cur, name, elm = vnode.elm, oldStyle = oldVnode.data.style, style = vnode.data.style;\n    if (!oldStyle && !style)\n        return;\n    if (oldStyle === style)\n        return;\n    oldStyle = oldStyle || {};\n    style = style || {};\n    var oldHasDel = 'delayed' in oldStyle;\n    for (name in oldStyle) {\n        if (!style[name]) {\n            if (name[0] === '-' && name[1] === '-') {\n                elm.style.removeProperty(name);\n            }\n            else {\n                elm.style[name] = '';\n            }\n        }\n    }\n    for (name in style) {\n        cur = style[name];\n        if (name === 'delayed' && style.delayed) {\n            for (var name2 in style.delayed) {\n                cur = style.delayed[name2];\n                if (!oldHasDel || cur !== oldStyle.delayed[name2]) {\n                    setNextFrame(elm.style, name2, cur);\n                }\n            }\n        }\n        else if (name !== 'remove' && cur !== oldStyle[name]) {\n            if (name[0] === '-' && name[1] === '-') {\n                elm.style.setProperty(name, cur);\n            }\n            else {\n                elm.style[name] = cur;\n            }\n        }\n    }\n}\nfunction applyDestroyStyle(vnode) {\n    var style, name, elm = vnode.elm, s = vnode.data.style;\n    if (!s || !(style = s.destroy))\n        return;\n    for (name in style) {\n        elm.style[name] = style[name];\n    }\n}\nfunction applyRemoveStyle(vnode, rm) {\n    var s = vnode.data.style;\n    if (!s || !s.remove) {\n        rm();\n        return;\n    }\n    if (!reflowForced) {\n        getComputedStyle(document.body).transform;\n        reflowForced = true;\n    }\n    var name, elm = vnode.elm, i = 0, compStyle, style = s.remove, amount = 0, applied = [];\n    for (name in style) {\n        applied.push(name);\n        elm.style[name] = style[name];\n    }\n    compStyle = getComputedStyle(elm);\n    var props = compStyle['transition-property'].split(', ');\n    for (; i < props.length; ++i) {\n        if (applied.indexOf(props[i]) !== -1)\n            amount++;\n    }\n    elm.addEventListener('transitionend', function (ev) {\n        if (ev.target === elm)\n            --amount;\n        if (amount === 0)\n            rm();\n    });\n}\nfunction forceReflow() {\n    reflowForced = false;\n}\nexports.styleModule = {\n    pre: forceReflow,\n    create: updateStyle,\n    update: updateStyle,\n    destroy: applyDestroyStyle,\n    remove: applyRemoveStyle\n};\nexports.default = exports.styleModule;\n//# sourceMappingURL=style.js.map\n\n//# sourceURL=webpack:///./node_modules/snabbdom/modules/style.js?");

/***/ }),

/***/ "./node_modules/snabbdom/vnode.js":
/*!****************************************!*\
  !*** ./node_modules/snabbdom/vnode.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction vnode(sel, data, children, text, elm) {\n    var key = data === undefined ? undefined : data.key;\n    return { sel: sel, data: data, children: children,\n        text: text, elm: elm, key: key };\n}\nexports.vnode = vnode;\nexports.default = vnode;\n//# sourceMappingURL=vnode.js.map\n\n//# sourceURL=webpack:///./node_modules/snabbdom/vnode.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _require = __webpack_require__(/*! ./riven */ \"./src/riven.js\"),\n    RIVEN = _require.RIVEN,\n    Ø = _require.Ø;\n\n__webpack_require__(/*! ./nodes/print */ \"./src/nodes/print.js\");\n\n__webpack_require__(/*! ./nodes/add */ \"./src/nodes/add.js\");\n\n__webpack_require__(/*! ./nodes/concat */ \"./src/nodes/concat.js\");\n\n__webpack_require__(/*! ./nodes/value */ \"./src/nodes/value.js\");\n\n__webpack_require__(/*! ./nodes/interval */ \"./src/nodes/interval.js\");\n\n__webpack_require__(/*! ./nodes/console */ \"./src/nodes/console.js\");\n\n__webpack_require__(/*! ./nodes/bang */ \"./src/nodes/bang.js\");\n\n__webpack_require__(/*! ./nodes/inlineOutput */ \"./src/nodes/inlineOutput.js\");\n\n__webpack_require__(/*! ./nodes/text */ \"./src/nodes/text.js\");\n\n__webpack_require__(/*! ./nodes/keyboardInput */ \"./src/nodes/keyboardInput.js\");\n\n__webpack_require__(/*! ./nodes/fontStyle */ \"./src/nodes/fontStyle.js\");\n\n__webpack_require__(/*! ./nodes/variableFontStyle */ \"./src/nodes/variableFontStyle.js\");\n\n__webpack_require__(/*! ./nodes/randomName */ \"./src/nodes/randomName.js\");\n\n__webpack_require__(/*! ./nodes/sine */ \"./src/nodes/sine.js\");\n\n__webpack_require__(/*! ./nodes/bangOnUpdate */ \"./src/nodes/bangOnUpdate.js\");\n\n__webpack_require__(/*! ./nodes/remap */ \"./src/nodes/remap.js\");\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  RIVEN.setup();\n  var lib = RIVEN.lib;\n\n  RIVEN.create = function () {\n    var append = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;\n    // SECTION 1\n    Ø(\"draw\").create({\n      x: 0,\n      y: 18\n    }, lib.Interval, 16.67);\n    Ø(\"string\").create({\n      x: 8,\n      y: 14\n    }, lib.Value, \"variable\");\n    Ø(\"letterSpacing\").create({\n      x: 22,\n      y: 22\n    }, lib.FontStyle, {\n      letterSpacing: '5'\n    }, 'px');\n    Ø(\"fontFamily\").create({\n      x: 14,\n      y: 22\n    }, lib.FontStyle, {\n      fontFamily: 'Contra-animation'\n    });\n    Ø(\"fontSize\").create({\n      x: 18,\n      y: 26\n    }, lib.FontStyle, {\n      fontSize: '80'\n    }, 'px');\n    Ø(\"variableFontStyle\").create({\n      x: 24,\n      y: 26\n    }, lib.VariableFontStyle);\n    Ø(\"variableWeight\").create({\n      x: 22,\n      y: 32\n    }, lib.FontStyle, {\n      wdth: 100\n    });\n    Ø(\"variableMisc\").create({\n      x: 26,\n      y: 30\n    }, lib.FontStyle, {\n      misc: 20\n    });\n    Ø(\"text\").create({\n      x: 14,\n      y: 14\n    }, lib.Text);\n    Ø(\"sine\").create({\n      x: 8,\n      y: 28\n    }, lib.Sine, 0.02);\n    Ø(\"remap\").create({\n      x: 13,\n      y: 28\n    }, lib.Remap, [-1, 1, 0, 100, 2]);\n    Ø(\"output\").create({\n      x: 24,\n      y: 14\n    }, lib.InlineOutput);\n    Ø(\"sine\").connect([\"remap\"]);\n    Ø(\"remap\").connect([\"variableWeight\"]);\n    Ø(\"draw\").connect([\"string\"]);\n    Ø(\"string\").connect([\"text\"]);\n    Ø(\"text\").connect([\"output\"]);\n    Ø(\"variableFontStyle\").syphon([\"variableWeight\", \"variableMisc\"]);\n    Ø(\"draw\").connect([\"sine\"]);\n    Ø(\"text\").syphon([\"fontSize\", \"fontFamily\", \"variableFontStyle\", \"letterSpacing\"]); // SECTION 2\n\n    Ø(\"test\").create({\n      x: 0,\n      y: 40\n    }, lib.Interval, 16.67);\n  };\n\n  RIVEN.create(true); // Ø(\"bang\").bang()\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/nodes/add.js":
/*!**************************!*\
  !*** ./src/nodes/add.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _require = __webpack_require__(/*! ../riven */ \"./src/riven.js\"),\n    RIVEN = _require.RIVEN,\n    Ø = _require.Ø;\n\nRIVEN.lib.Add = function (id, rect) {\n  RIVEN.Node.call(this, id, rect);\n  this.glyph = 'M60,60 L60,60 L150,120 L240,120 M60,150 L60,150 L240,150 M60,240 L60,240 L150,180 L240,180';\n\n  this.add = function () {\n    return Object.values(this.request()).reduce(function (acc, val) {\n      return acc + val;\n    }, 0);\n  };\n\n  this.receive = function (q) {\n    this.send(this.add());\n  };\n\n  this.answer = function () {\n    return this.add();\n  };\n};\n\n//# sourceURL=webpack:///./src/nodes/add.js?");

/***/ }),

/***/ "./src/nodes/bang.js":
/*!***************************!*\
  !*** ./src/nodes/bang.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _require = __webpack_require__(/*! ../riven */ \"./src/riven.js\"),\n    RIVEN = _require.RIVEN,\n    Ø = _require.Ø;\n\nRIVEN.lib.Bang = function (id, rect) {\n  var _this = this;\n\n  RIVEN.Node.call(this, id, rect);\n  this.glyph = 'M60,60 L60,60 L150,120 L240,120 M60,150 L60,150 L240,150 M60,240 L60,240 L150,180 L240,180';\n  this.enabledPorts = ['out'];\n\n  this.receive = function (q) {\n    this.label = \"\".concat(this.id, \"(bang!)\");\n    this.send(this);\n  };\n\n  this.handleClick = function (node) {\n    _this.send(_this);\n  };\n};\n\n//# sourceURL=webpack:///./src/nodes/bang.js?");

/***/ }),

/***/ "./src/nodes/bangOnUpdate.js":
/*!***********************************!*\
  !*** ./src/nodes/bangOnUpdate.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _require = __webpack_require__(/*! ../riven */ \"./src/riven.js\"),\n    RIVEN = _require.RIVEN,\n    Ø = _require.Ø;\n\nRIVEN.lib.BangOnUpdate = function (id, rect, children, entry, exit) {\n  RIVEN.Node.call(this, id, rect);\n  this.name = 'bang-on-update';\n  this.enabledPorts = ['in', 'out', 'request'];\n  var PORT_TYPES = {\n    default: 0,\n    input: 1,\n    output: 2,\n    request: 3,\n    answer: 4,\n    entry: 5,\n    exit: 6\n  };\n  this.glyph = '';\n  this.ports.entry = new this.Port(this, 'entry', PORT_TYPES.entry);\n  this.ports.exit = new this.Port(this, 'exit', PORT_TYPES.exit);\n  this.ports.request = new this.Port(this, 'request', PORT_TYPES.request);\n\n  if (RIVEN.network[entry]) {\n    this.ports.entry.connect(Ø(entry).ports.input);\n  }\n\n  if (RIVEN.network[exit]) {\n    Ø(exit).ports.output.connect(this.ports.exit);\n  }\n\n  this.update = function () {\n    var bounds = {\n      x: 0,\n      y: 0\n    };\n\n    for (var _id in this.children) {\n      var node = this.children[_id];\n      bounds.x = node.rect.x > bounds.x ? node.rect.x : bounds.x;\n      bounds.y = node.rect.y > bounds.y ? node.rect.y : bounds.y;\n    }\n\n    this.rect.w = bounds.x + 6;\n    this.rect.h = bounds.y + 6;\n  };\n\n  for (var cid in children) {\n    children[cid].parent = this;\n    this.children.push(children[cid]);\n    this.update();\n  } // Re-Route SEND/RECEIVE\n\n\n  this.receive = function (q, origin, route) {\n    if (route.id === 'in') {\n      this.entry(q, origin, route);\n      this.onAttributeUpdate();\n    }\n\n    if (route.id === 'exit') {\n      this.exit(q, origin, route);\n    }\n  };\n\n  this.entry = function (q, origin, route) {\n    var _this = this;\n\n    var port = this.ports.entry;\n\n    var _loop = function _loop(routeId) {\n      var route = port.routes[routeId];\n\n      if (route) {\n        _this.cachedReceive = function () {\n          route.host.request = function () {\n            return _this.request();\n          };\n\n          route.host.receive(q, origin, route);\n        };\n\n        _this.cachedReceive();\n      }\n    };\n\n    for (var routeId in port.routes) {\n      _loop(routeId);\n    }\n  };\n\n  this.onAttributeUpdate = function () {\n    var _this2 = this;\n\n    var port = this.ports.request;\n\n    for (var routeId in port.routes) {\n      var route = port.routes[routeId];\n\n      if (route) {\n        route.host.onUpdate = function () {\n          return _this2.cachedReceive();\n        };\n      }\n    }\n  };\n\n  this.exit = function (q, origin, route) {\n    var port = this.ports.output;\n\n    for (var routeId in port.routes) {\n      var _route = port.routes[routeId];\n\n      if (_route) {\n        _route.host.receive(q, origin, _route);\n      }\n    }\n  };\n};\n\n//# sourceURL=webpack:///./src/nodes/bangOnUpdate.js?");

/***/ }),

/***/ "./src/nodes/concat.js":
/*!*****************************!*\
  !*** ./src/nodes/concat.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _require = __webpack_require__(/*! ../riven */ \"./src/riven.js\"),\n    RIVEN = _require.RIVEN,\n    Ø = _require.Ø;\n\nRIVEN.lib.Concat = function (id, rect) {\n  RIVEN.Node.call(this, id, rect);\n  this.glyph = 'M60,60 L60,60 L150,120 L240,120 M60,150 L60,150 L240,150 M60,240 L60,240 L150,180 L240,180';\n\n  this.receive = function (q) {\n    this.send(Object.values(this.request()).join(' '));\n  };\n};\n\n//# sourceURL=webpack:///./src/nodes/concat.js?");

/***/ }),

/***/ "./src/nodes/console.js":
/*!******************************!*\
  !*** ./src/nodes/console.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _require = __webpack_require__(/*! ../riven */ \"./src/riven.js\"),\n    RIVEN = _require.RIVEN,\n    Ø = _require.Ø;\n\nRIVEN.lib.Console = function (id, rect) {\n  RIVEN.Node.call(this, id, rect);\n  this.glyph = 'M65,65 L65,65 L245,65 M65,125 L65,125 L245,125 M65,185 L65,185 L245,185 M65,245 L65,245 L245,245 ';\n\n  this.receive = function (q) {\n    console.log(this.id, q);\n  };\n};\n\n//# sourceURL=webpack:///./src/nodes/console.js?");

/***/ }),

/***/ "./src/nodes/fontStyle.js":
/*!********************************!*\
  !*** ./src/nodes/fontStyle.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _require = __webpack_require__(/*! ../riven */ \"./src/riven.js\"),\n    RIVEN = _require.RIVEN,\n    Ø = _require.Ø;\n\nRIVEN.lib.FontStyle = function (id, rect, val, units) {\n  RIVEN.Node.call(this, id, rect);\n  this.enabledPorts = ['in', 'answer'];\n  this.key = Object.keys(val);\n  this.connectedValue = val[this.key];\n  this.glyph = 'M60,60 L60,60 L240,60 L240,240 L60,240 Z M240,150 L240,150 L150,150 L150,240';\n\n  this.receive = function (q) {\n    if (q) this.connectedValue = q;\n    this.update();\n  };\n\n  this.answer = function (q) {\n    var value = this.connectedValue ? this.connectedValue : val[this.key];\n    if (units) value = value + units;\n    this.setLabel(value);\n    return {\n      type: this.key[0],\n      val: value\n    };\n  };\n\n  this.setLabel = function (value) {\n    this.label = value ? \"\".concat(this.id, \"=\").concat(value) : this.id;\n  };\n\n  this.setLabel(this.connectedValue);\n\n  this.update = function () {\n    if (!this.onUpdate) return;\n    this.onUpdate(this.connectedValue);\n  };\n};\n\n//# sourceURL=webpack:///./src/nodes/fontStyle.js?");

/***/ }),

/***/ "./src/nodes/inlineOutput.js":
/*!***********************************!*\
  !*** ./src/nodes/inlineOutput.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Snabbdom = __webpack_require__(/*! snabbdom-pragma */ \"./node_modules/snabbdom-pragma/dist/index.es6.js\");\n\nvar _require = __webpack_require__(/*! ../riven */ \"./src/riven.js\"),\n    RIVEN = _require.RIVEN,\n    Ø = _require.Ø;\n\nRIVEN.lib.InlineOutput = function (id, rect, html) {\n  RIVEN.Node.call(this, id, rect);\n  this.enabledPorts = ['in', 'out'];\n  this.glyph = 'M65,65 L65,65 L245,65 M65,125 L65,125 L245,125 M65,185 L65,185 L245,185 M65,245 L65,245 L245,245 ';\n  this.inlineWidth = 30;\n  this.inlineHeight = 10;\n\n  this.receive = function (q) {\n    this.html = q;\n  };\n};\n\n//# sourceURL=webpack:///./src/nodes/inlineOutput.js?");

/***/ }),

/***/ "./src/nodes/interval.js":
/*!*******************************!*\
  !*** ./src/nodes/interval.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _require = __webpack_require__(/*! ../riven */ \"./src/riven.js\"),\n    RIVEN = _require.RIVEN,\n    Ø = _require.Ø;\n\nRIVEN.lib.Interval = function (id, rect, val) {\n  var _this = this;\n\n  RIVEN.Node.call(this, id, rect);\n  this.glyph = 'M60,60 L60,60 L150,120 L240,120 M60,150 L60,150 L240,150 M60,240 L60,240 L150,180 L240,180';\n  this.label = val ? \"\".concat(this.id, \"=\").concat(val, \"ms\") : this.id;\n  this.enabledPorts = ['out'];\n  this.interval = setInterval(function () {\n    _this.send(_this);\n  }, val);\n};\n\n//# sourceURL=webpack:///./src/nodes/interval.js?");

/***/ }),

/***/ "./src/nodes/keyboardInput.js":
/*!************************************!*\
  !*** ./src/nodes/keyboardInput.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _require = __webpack_require__(/*! ../riven */ \"./src/riven.js\"),\n    RIVEN = _require.RIVEN,\n    Ø = _require.Ø;\n\nRIVEN.lib.KeyboardInput = function (id, rect, val) {\n  var _this = this;\n\n  RIVEN.Node.call(this, id, rect);\n  this.glyph = 'M60,60 L60,60 L240,60 L240,240 L60,240 Z M240,150 L240,150 L150,150 L150,240';\n  this.label = val ? \"\".concat(this.id, \"=\").concat(val) : this.id;\n  document.addEventListener('keydown', function (e) {\n    _this.handleKeyDown(e);\n  });\n  this.text = '';\n\n  this.handleKeyDown = function (evt) {\n    var char = evt.keyCode;\n    var key = String.fromCharCode(char);\n    var isLetter = key >= 'a' && key <= 'z';\n    var isNumber = key >= '0' && key <= '9';\n\n    if (char == 8) {\n      this.text = this.text.substring(0, this.text.length - 1);\n    } else if (/[a-z]/i.test(key) || key == ' ') {\n      this.text += key;\n    } else {\n      return;\n    }\n\n    this.send(this.text);\n  };\n\n  this.receive = function (q) {\n    this.send(this.text);\n  };\n};\n\n//# sourceURL=webpack:///./src/nodes/keyboardInput.js?");

/***/ }),

/***/ "./src/nodes/print.js":
/*!****************************!*\
  !*** ./src/nodes/print.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _require = __webpack_require__(/*! ../riven */ \"./src/riven.js\"),\n    RIVEN = _require.RIVEN,\n    Ø = _require.Ø;\n\nRIVEN.lib.Print = function (id, rect) {\n  RIVEN.Node.call(this, id, rect);\n  this.glyph = 'M65,65 L65,65 L245,65 M65,125 L65,125 L245,125 M65,185 L65,185 L245,185 M65,245 L65,245 L245,245 ';\n\n  this.receive = function (q) {\n    this.label = \"\".concat(q);\n    this.send(q);\n  };\n};\n\n//# sourceURL=webpack:///./src/nodes/print.js?");

/***/ }),

/***/ "./src/nodes/randomName.js":
/*!*********************************!*\
  !*** ./src/nodes/randomName.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var axios = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n\nvar _require = __webpack_require__(/*! ../riven */ \"./src/riven.js\"),\n    RIVEN = _require.RIVEN,\n    Ø = _require.Ø;\n\nRIVEN.lib.RandomName = function (id, rect, val) {\n  RIVEN.Node.call(this, id, rect);\n  var url = 'https://randomuser.me/api/';\n\n  this.answer = function (q) {\n    return val;\n  };\n\n  this.receive = function (q) {\n    var _this = this;\n\n    axios.get(url).then(function (data) {\n      var name = data.data.results[0].name;\n      var joinedName = \"\".concat(name.first, \" \").concat(name.last);\n      _this.label = joinedName ? \"\".concat(_this.id, \"=\").concat(joinedName) : _this.id;\n\n      _this.send(joinedName);\n    });\n  };\n};\n\n//# sourceURL=webpack:///./src/nodes/randomName.js?");

/***/ }),

/***/ "./src/nodes/remap.js":
/*!****************************!*\
  !*** ./src/nodes/remap.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _require = __webpack_require__(/*! ../riven */ \"./src/riven.js\"),\n    RIVEN = _require.RIVEN,\n    Ø = _require.Ø;\n\nRIVEN.lib.Remap = function (id, rect, val) {\n  RIVEN.Node.call(this, id, rect);\n  this.glyph = 'M60,60 L60,60 L150,120 L240,120 M60,150 L60,150 L240,150 M60,240 L60,240 L150,180 L240,180';\n  this.label = val ? \"\".concat(this.id, \"=\").concat(val) : this.id;\n\n  this.receive = function (q) {\n    var mappedVal = mapRange(q, val[0], val[1], val[2], val[3]); // Round with optional fifth value\n\n    var decimals = val[4];\n\n    if (decimals !== undefined) {\n      mappedVal = round(mappedVal, decimals);\n    }\n\n    this.label = val ? \"\".concat(this.id, \"=\").concat(val, \":\").concat(mappedVal) : this.id;\n    this.send(mappedVal);\n  };\n\n  function mapRange(value, low1, high1, low2, high2) {\n    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);\n  }\n\n  function round(value, decimals) {\n    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);\n  }\n};\n\n//# sourceURL=webpack:///./src/nodes/remap.js?");

/***/ }),

/***/ "./src/nodes/sine.js":
/*!***************************!*\
  !*** ./src/nodes/sine.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _require = __webpack_require__(/*! ../riven */ \"./src/riven.js\"),\n    RIVEN = _require.RIVEN,\n    Ø = _require.Ø;\n\nvar _require2 = __webpack_require__(/*! ../util */ \"./src/util.js\"),\n    round = _require2.round;\n\nRIVEN.lib.Sine = function (id, rect, val) {\n  RIVEN.Node.call(this, id, rect);\n  this.enabledPorts = ['in', 'out'];\n  this.t = 0;\n  this.delta = val ? val : 0.01;\n\n  this.receive = function (q) {\n    this.send(this.getSine());\n  };\n\n  this.getSine = function () {\n    this.t = this.t + this.delta;\n    var sin = Math.sin(this.t);\n    this.label = sin ? \"\".concat(this.id, \"\\u0394\").concat(this.delta, \"=\").concat(round(sin, 1)) : this.id;\n    return sin;\n  };\n};\n\n//# sourceURL=webpack:///./src/nodes/sine.js?");

/***/ }),

/***/ "./src/nodes/text.js":
/*!***************************!*\
  !*** ./src/nodes/text.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Snabbdom = __webpack_require__(/*! snabbdom-pragma */ \"./node_modules/snabbdom-pragma/dist/index.es6.js\");\n\nvar _require = __webpack_require__(/*! ../riven */ \"./src/riven.js\"),\n    RIVEN = _require.RIVEN,\n    Ø = _require.Ø;\n\nRIVEN.lib.Text = function (id, rect, val) {\n  RIVEN.Node.call(this, id, rect);\n  this.glyph = 'M60,60 L60,60 L240,60 L240,240 L60,240 Z M240,150 L240,150 L150,150 L150,240';\n  this.label = val ? \"\".concat(this.id, \"=\").concat(val) : this.id;\n  this.enabledPorts = ['in', 'out', 'request'];\n\n  this.el = function (q, styles) {\n    return Snabbdom.createElement(\"h1\", {\n      style: styles\n    }, q);\n  };\n\n  this.receive = function (q) {\n    var request = this.request();\n    var styles = {};\n\n    for (var n in request) {\n      var node = request[n];\n      styles[node.type] = \"\".concat(node.val);\n    }\n\n    this.send(this.el(q, styles));\n  };\n};\n\n//# sourceURL=webpack:///./src/nodes/text.js?");

/***/ }),

/***/ "./src/nodes/value.js":
/*!****************************!*\
  !*** ./src/nodes/value.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _require = __webpack_require__(/*! ../riven */ \"./src/riven.js\"),\n    RIVEN = _require.RIVEN,\n    Ø = _require.Ø;\n\nRIVEN.lib.Value = function (id, rect, val) {\n  RIVEN.Node.call(this, id, rect);\n  this.glyph = 'M60,60 L60,60 L240,60 L240,240 L60,240 Z M240,150 L240,150 L150,150 L150,240';\n  this.label = val ? \"\".concat(this.id, \"=\").concat(val) : this.id;\n  this.enabledPorts = ['in', 'out'];\n\n  this.answer = function (q) {\n    return val;\n  };\n\n  this.receive = function (q) {\n    this.send(val);\n  };\n};\n\n//# sourceURL=webpack:///./src/nodes/value.js?");

/***/ }),

/***/ "./src/nodes/variableFontStyle.js":
/*!****************************************!*\
  !*** ./src/nodes/variableFontStyle.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _require = __webpack_require__(/*! ../riven */ \"./src/riven.js\"),\n    RIVEN = _require.RIVEN,\n    Ø = _require.Ø;\n\nRIVEN.lib.VariableFontStyle = function (id, rect, val, units) {\n  RIVEN.Node.call(this, id, rect);\n  this.enabledPorts = ['request', 'answer']; // this.key = Object.keys(val)\n  // this.connectedValue = val[this.key]\n\n  this.glyph = 'M60,60 L60,60 L240,60 L240,240 L60,240 Z M240,150 L240,150 L150,150 L150,240'; // \n  // this.receive = function (q) {\n  //   const request = this.request()\n  //   this.props = []\n  // \n  //   for(let n in request) {\n  //     let node = request[n]\n  //     this.props.push(`'${node.type}' ${node.val}`)\n  //   }\n  // }\n\n  this.answer = function (q) {\n    var request = this.request();\n    this.props = [];\n\n    for (var n in request) {\n      var node = request[n];\n      this.props.push(\"'\".concat(node.type, \"' \").concat(node.val));\n    }\n\n    if (!this.props) return;\n    var joinedProps = \"\".concat(this.props.join(', '));\n    this.setLabel(joinedProps);\n    return {\n      type: 'fontVariationSettings',\n      val: joinedProps\n    };\n  };\n\n  this.setLabel = function (value) {\n    this.label = value ? \"\".concat(this.id, \"=\").concat(value) : this.id;\n  }; // \n  // this.setLabel(this.connectedValue)\n  // \n  // this.update = function () {\n  //   if(!this.onUpdate) return\n  // \n  //   this.onUpdate(this.connectedValue)\n  // }\n\n};\n\n//# sourceURL=webpack:///./src/nodes/variableFontStyle.js?");

/***/ }),

/***/ "./src/riven.js":
/*!**********************!*\
  !*** ./src/riven.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n// \"Don't forget, the portal combination's in my journal.\"\" — Catherine\nvar Snabbdom = __webpack_require__(/*! snabbdom-pragma */ \"./node_modules/snabbdom-pragma/dist/index.es6.js\");\n\nvar snabbdom = __webpack_require__(/*! snabbdom */ \"./node_modules/snabbdom/es/snabbdom.js\");\n\nvar patch = snabbdom.init([__webpack_require__(/*! snabbdom/modules/class */ \"./node_modules/snabbdom/modules/class.js\").default, __webpack_require__(/*! snabbdom/modules/props */ \"./node_modules/snabbdom/modules/props.js\").default, __webpack_require__(/*! snabbdom/modules/attributes */ \"./node_modules/snabbdom/modules/attributes.js\").default, __webpack_require__(/*! snabbdom/modules/style */ \"./node_modules/snabbdom/modules/style.js\").default, __webpack_require__(/*! snabbdom/modules/eventlisteners */ \"./node_modules/snabbdom/modules/eventlisteners.js\").default]);\n\nvar h = __webpack_require__(/*! snabbdom/h */ \"./node_modules/snabbdom/h.js\").default; // Globals\n\n\nfunction Riven() {\n  var _this2 = this;\n\n  this.lib = {};\n  this.network = {};\n  var GRID_SIZE = 20;\n  var PORT_TYPES = {\n    default: 0,\n    input: 1,\n    output: 2,\n    request: 3,\n    answer: 4,\n    entry: 5,\n    exit: 6\n  };\n\n  this.setup = function () {\n    this.el = document.getElementById('container');\n    this.cur = new RIVEN.Cursor();\n    this.cur.install(this); // this.patchGrid()\n  };\n\n  this.add = function (node) {\n    this.network[node.id] = node;\n    this.render();\n  };\n\n  this.render = function () {\n    var _this = this;\n\n    window.requestAnimationFrame(function () {\n      var newEl = _this.concatNodes();\n\n      _this.el = patch(_this.el, newEl);\n    });\n  };\n\n  this.patchGrid = function () {\n    this.gridEl = document.getElementById('grid');\n    var grid = this.renderGrid();\n    this.gridEl = patch(this.gridEl, grid);\n  };\n\n  this.renderGrid = function () {\n    var grid = [];\n    var size = GRID_SIZE * 100;\n\n    for (var x = 0; x < 100; x++) {\n      for (var y = 0; y < 100; y++) {\n        var circle = Snabbdom.createElement(\"circle\", {\n          cx: GRID_SIZE * x - size / 4,\n          cy: GRID_SIZE * y - GRID_SIZE / 2 - size / 4,\n          r: GRID_SIZE / 20,\n          className: \"grid-circle\"\n        });\n        grid.push(circle);\n      }\n    }\n\n    return Snabbdom.createElement(\"svg\", {\n      id: \"grid\"\n    }, grid);\n  };\n\n  this.concatNodes = function () {\n    var nodes = this.renderNodes();\n    var routes = this.renderRoutes();\n    var html = this.renderHTMLTags();\n    if (nodes.length == 0 || routes.length == 0) return this.el;\n    return Snabbdom.createElement(\"main\", {\n      id: \"container\"\n    }, Snabbdom.createElement(\"div\", {\n      id: \"inline_html\"\n    }, html), Snabbdom.createElement(\"svg\", {\n      id: \"riven\"\n    }, Snabbdom.createElement(\"g\", {\n      id: \"routes\"\n    }, routes), Snabbdom.createElement(\"g\", {\n      id: \"nodes\"\n    }, nodes)));\n  };\n\n  this.renderNodes = function () {\n    var nodeData = [];\n\n    for (var id in this.network) {\n      var node = this.network[id];\n      nodeData.push(this.renderNode(node));\n    }\n\n    return nodeData;\n  };\n\n  this.renderRoutes = function () {\n    var nodeData = [];\n\n    for (var id in this.network) {\n      var node = this.network[id];\n      nodeData.push(this.renderRoute(node));\n    }\n\n    return nodeData;\n  };\n\n  this.renderHTMLTags = function () {\n    var nodeData = [];\n\n    for (var id in this.network) {\n      var node = this.network[id];\n      var tag = this.renderHTMLTag(node);\n\n      if (node.html) {\n        nodeData.push(tag);\n      }\n    }\n\n    return nodeData;\n  };\n\n  this.renderRoute = function (node) {\n    var routes = this.drawRoutes(node);\n    return routes;\n  };\n\n  this.renderNode = function (node) {\n    var rect = getRect(node);\n\n    var ports = _this2.drawPorts(node);\n\n    var glyph = _this2.drawGlyph(node);\n\n    return Snabbdom.createElement(\"g\", {\n      id: \"node_\".concat(node.id),\n      className: \"node \".concat(node.name),\n      \"on-click\": [_this2.nodeClickHandler, node]\n    }, Snabbdom.createElement(\"rect\", {\n      rx: 2,\n      ry: 2,\n      x: rect.x,\n      y: rect.y - GRID_SIZE / 2,\n      width: rect.w,\n      height: rect.h\n    }), Snabbdom.createElement(\"text\", {\n      x: rect.x + rect.w / 2 + GRID_SIZE * 0.3,\n      y: rect.y + rect.h + GRID_SIZE * 0.2\n    }, node.label), ports, glyph);\n  };\n\n  this.renderHTMLTag = function (node) {\n    var rect = getRect(node);\n\n    var html = _this2.drawHTMLTag(node);\n\n    var width = node.inlineWidth * GRID_SIZE;\n    var height = node.inlineHeight * GRID_SIZE;\n    return Snabbdom.createElement(\"div\", {\n      id: \"html_\".concat(node.id),\n      className: \"inline-output\",\n      style: {\n        transform: \"translate(\".concat(rect.x + GRID_SIZE * 2, \"px, \").concat(rect.y + GRID_SIZE * 1.5 - height, \"px)\"),\n        width: \"\".concat(width, \"px\"),\n        height: \"\".concat(height, \"px\")\n      }\n    }, html);\n  };\n\n  this.nodeClickHandler = function (node) {\n    console.log(node); // if(!node.handleClick) return\n    // node.handleClick(node.id)\n  };\n\n  this.drawPorts = function (node) {\n    var portData = [];\n    Object.keys(node.ports).reduce(function (acc, val, id) {\n      var port = node.ports[val];\n      if (!node.enabledPorts.includes(port.id)) return true;\n      portData.push(_this2.drawPort(port));\n    }, '');\n    return portData;\n  };\n\n  this.drawPort = function (port) {\n    var pos = port ? getPortPosition(port) : {\n      x: 0,\n      y: 0\n    };\n    var r = GRID_SIZE / 6;\n    return Snabbdom.createElement(\"svg\", {\n      id: \"\".concat(port.host.id, \"_port_\").concat(port.id),\n      x: pos.x - r,\n      y: pos.y - r,\n      \"on-click\": [_this2.portClickHandler, port]\n    }, Snabbdom.createElement(\"g\", {\n      className: \"port \".concat(port.id)\n    }, Snabbdom.createElement(\"path\", {\n      d: \"M\".concat(r, \",0 L\").concat(r * 2, \",\").concat(r, \" L\").concat(r, \",\").concat(r * 2, \" L0,\").concat(r, \" Z\")\n    })));\n  };\n\n  this.drawGlyph = function (node) {\n    var rect = getRect(node);\n    return Snabbdom.createElement(\"path\", {\n      className: \"glyph\",\n      style: {\n        transform: \"translate(\".concat(rect.x + GRID_SIZE / 4, \"px, \").concat(rect.y - GRID_SIZE / 4, \"px) scale(0.1)\")\n      },\n      d: node.glyph\n    });\n  };\n\n  this.drawHTMLTag = function (node) {\n    var rect = getRect(node);\n    var html = node.html; // console.log(html);\n    // if(!html) return\n    // html.style.transform = `translate(${rect.x + (GRID_SIZE / 4)}px, ${rect.y - (GRID_SIZE / 4)}px)`\n\n    return html;\n  };\n\n  this.portClickHandler = function (port) {\n    console.log(port); // if(!node.handleClick) return\n    // node.handleClick(node.id)\n  };\n\n  this.drawRoutes = function (node) {\n    var routes = [];\n\n    for (var id in node.ports) {\n      var port = node.ports[id];\n\n      for (var routeId in port.routes) {\n        var route = port.routes[routeId];\n\n        if (!route) {\n          continue;\n        }\n\n        routes.push(_this2.drawConnection(port, route));\n      }\n    }\n\n    return routes;\n  };\n\n  this.drawConnection = function (a, b) {\n    if (a.type === PORT_TYPES.entry) {\n      return _this2.drawConnectionEntry(a, b);\n    }\n\n    if (b.type === PORT_TYPES.exit) {\n      return _this2.drawConnectionExit(a, b);\n    }\n\n    return a.type === PORT_TYPES.output || a.type === PORT_TYPES.output ? _this2.drawConnectionOutput(a, b) : _this2.drawConnectionRequest(a, b);\n  };\n\n  var outputPath = function outputPath(posA, posB, posM, posC1, posC2) {\n    return \"M\".concat(posA.x, \",\").concat(posA.y, \" L\").concat(posA.x + GRID_SIZE, \",\").concat(posA.y, \" Q\").concat(posC1.x, \",\").concat(posC1.y, \" \").concat(posM.x, \",\").concat(posM.y, \" Q \").concat(posC2.x, \",\").concat(posC2.y, \" \").concat(posB.x - GRID_SIZE, \",\").concat(posB.y, \" L\").concat(posB.x, \",\").concat(posB.y);\n  };\n\n  var requestPath = function requestPath(posA, posB, posM) {\n    return \"M\".concat(posA.x, \",\").concat(posA.y, \" L\").concat(posA.x, \",\").concat(posA.y + GRID_SIZE, \" L\").concat(posA.x, \",\").concat(posM.y, \" L\").concat(posB.x, \",\").concat(posM.y, \" L\").concat(posB.x, \",\").concat(posB.y - GRID_SIZE, \" L\").concat(posB.x, \",\").concat(posB.y);\n  };\n\n  var disconnectPath = function disconnectPath(posM, r) {\n    return \"M\".concat(posM.x - r, \",\").concat(posM.y - r, \" L\").concat(posM.x + r, \",\").concat(posM.y + r, \" M\").concat(posM.x + r, \",\").concat(posM.y - r, \" L\").concat(posM.x - r, \",\").concat(posM.y + r);\n  };\n\n  this.drawConnectionOutput = function (a, b) {\n    var posA = getPortPosition(a);\n    var posB = getPortPosition(b);\n    var posM = middle(posA, posB);\n    var posC1 = {\n      x: (posM.x + (posA.x + GRID_SIZE)) / 2,\n      y: posA.y\n    };\n    var posC2 = {\n      x: (posM.x + (posB.x - GRID_SIZE)) / 2,\n      y: posB.y\n    };\n    var r = GRID_SIZE / 4;\n    return Snabbdom.createElement(\"g\", {\n      className: \"route-wrapper\"\n    }, Snabbdom.createElement(\"path\", {\n      className: \"route output\",\n      d: outputPath(posA, posB, posM, posC1, posC2)\n    }), Snabbdom.createElement(\"path\", {\n      className: \"route route-hover-area\",\n      d: outputPath(posA, posB, posM, posC1, posC2),\n      \"on-click\": [_this2.routeClickHandler, a, b]\n    }), Snabbdom.createElement(\"path\", {\n      className: \"route route-disconnect\",\n      d: disconnectPath(posM, r),\n      \"on-click\": [_this2.routeClickHandler, a, b]\n    }));\n  };\n\n  this.routeClickHandler = function (a, b) {\n    a.disconnect(b.host.id);\n\n    _this2.render();\n  };\n\n  this.drawConnectionRequest = function (a, b) {\n    var posA = getPortPosition(a);\n    var posB = getPortPosition(b);\n    var posM = middle(posA, posB);\n    var r = GRID_SIZE / 4;\n    return Snabbdom.createElement(\"g\", {\n      className: \"route-wrapper\"\n    }, Snabbdom.createElement(\"path\", {\n      className: \"route request\",\n      d: requestPath(posA, posB, posM)\n    }), Snabbdom.createElement(\"path\", {\n      className: \"route route-hover-area\",\n      d: requestPath(posA, posB, posM),\n      \"on-click\": [_this2.routeClickHandler, a, b]\n    }), Snabbdom.createElement(\"path\", {\n      className: \"route route-disconnect\",\n      d: disconnectPath(posM, r),\n      \"on-click\": [_this2.routeClickHandler, a, b]\n    }));\n  };\n\n  this.drawConnectionEntry = function (a, b) {\n    var posA = getPortPosition(a);\n    var posB = getPortPosition(b);\n    return Snabbdom.createElement(\"g\", {\n      className: \"route-wrapper\"\n    }, Snabbdom.createElement(\"path\", {\n      className: \"route entry\",\n      d: \"M\".concat(posA.x, \",\").concat(posA.y, \" L\").concat(posA.x + GRID_SIZE, \",\").concat(posA.y, \"\\n              L\").concat(posA.x + GRID_SIZE, \",\").concat(posA.y, \"\\n              L\").concat(posA.x + GRID_SIZE, \",\").concat(posB.y, \"\\n              L\").concat(posB.x, \",\").concat(posB.y)\n    }));\n  };\n\n  this.drawConnectionExit = function (a, b) {\n    var posA = getPortPosition(a);\n    var posB = getPortPosition(b);\n    return Snabbdom.createElement(\"g\", {\n      className: \"route-wrapper\"\n    }, Snabbdom.createElement(\"path\", {\n      className: \"route ext\",\n      d: \"M\".concat(posA.x, \",\").concat(posA.y, \" L\").concat(posA.x + GRID_SIZE, \",\").concat(posA.y, \"\\n              L\").concat(posB.x - GRID_SIZE, \",\").concat(posA.y, \"\\n              L\").concat(posB.x - GRID_SIZE, \",\").concat(posB.y, \"\\n              L\").concat(posB.x, \",\").concat(posB.y)\n    }));\n  };\n\n  function getRect(node) {\n    var w = node.rect.w * GRID_SIZE;\n    var h = node.rect.h * GRID_SIZE;\n    var x = node.rect.x * GRID_SIZE;\n    var y = node.rect.y * GRID_SIZE;\n\n    if (node.parent) {\n      var offset = getRect(node.parent);\n      x += offset.x + 2 * GRID_SIZE;\n      y += offset.y + 2 * GRID_SIZE;\n    }\n\n    return {\n      x: x,\n      y: y,\n      w: w,\n      h: h\n    };\n  }\n\n  function middle(a, b) {\n    return {\n      x: (a.x + b.x) / 2,\n      y: (a.y + b.y) / 2\n    };\n  }\n\n  function getPortPosition(port) {\n    var rect = getRect(port.host);\n    var offset = {\n      x: 0,\n      y: 0\n    };\n\n    if (port.type === PORT_TYPES.output || port.type === PORT_TYPES.exit) {\n      offset = {\n        x: rect.w,\n        y: rect.h - GRID_SIZE * 1.5\n      };\n    } else if (port.type === PORT_TYPES.input || port.type === PORT_TYPES.entry) {\n      offset = {\n        x: 0,\n        y: GRID_SIZE / 2\n      };\n    } else if (port.type === PORT_TYPES.answer) {\n      offset = {\n        x: GRID_SIZE,\n        y: -GRID_SIZE * 0.5\n      };\n    } else if (port.type === PORT_TYPES.request) {\n      offset = {\n        x: rect.w - GRID_SIZE,\n        y: rect.h - GRID_SIZE / 2\n      };\n    }\n\n    return {\n      x: rect.x + offset.x,\n      y: rect.y + offset.y\n    };\n  }\n}\n\nvar RIVEN = new Riven(); // QUERY\n\nfunction Ø(id) {\n  return RIVEN.network[id] ? RIVEN.network[id] : new RIVEN.Node(id);\n} // NODE\n\n\nRIVEN.Node = function (id) {\n  var rect = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {\n    x: 0,\n    y: 0,\n    w: 2,\n    h: 2\n  };\n  var PORT_TYPES = {\n    default: 0,\n    input: 1,\n    output: 2,\n    request: 3,\n    answer: 4,\n    entry: 5,\n    exit: 6\n  };\n  this.id = id;\n  this.ports = {};\n  this.rect = rect;\n  this.parent = null;\n  this.children = [];\n  this.label = id;\n  this.name = '';\n  this.glyph = 'M155,65 A90,90 0 0,1 245,155 A90,90 0 0,1 155,245 A90,90 0 0,1 65,155 A90,90 0 0,1 155,65 Z';\n  this.enabledPorts = ['in', 'out', 'request', 'answer'];\n\n  this.setup = function (pos) {\n    this.ports.input = new this.Port(this, 'in', PORT_TYPES.input);\n    this.ports.output = new this.Port(this, 'out', PORT_TYPES.output);\n    this.ports.answer = new this.Port(this, 'answer', PORT_TYPES.answer);\n    this.ports.request = new this.Port(this, 'request', PORT_TYPES.request);\n    this.rect.x = pos.x;\n    this.rect.y = pos.y;\n  };\n\n  this.create = function () {\n    var pos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {\n      x: 0,\n      y: 0\n    };\n    var Type = arguments.length > 1 ? arguments[1] : undefined;\n\n    if (!Type) {\n      console.warn(\"Unknown NodeType for #\".concat(this.id));\n      return this;\n    }\n\n    for (var _len = arguments.length, params = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n      params[_key - 2] = arguments[_key];\n    }\n\n    var node = _construct(Type, [this.id, rect].concat(params));\n\n    node.setup(pos);\n    RIVEN.add(node);\n    return node;\n  }; // Connect\n\n\n  this.connect = function (q, syphon) {\n    if (q instanceof Array) {\n      for (var _id in q) {\n        this.connect(q[_id], syphon);\n      }\n    } else if (Ø(q)) {\n      var port = syphon ? this.ports.request : this.ports.output;\n      var target = syphon ? Ø(q).ports.answer : Ø(q).ports.input;\n\n      if (!port) {\n        console.warn(\"Unknown: \".concat(q));\n        return;\n      }\n\n      port.connect(target);\n    } else {\n      console.warn(\"Unknown \".concat(q));\n    }\n\n    RIVEN.render();\n  };\n\n  this.syphon = function (q) {\n    this.connect(q, true);\n  };\n\n  this.bind = function (q) {\n    this.connect(q);\n    this.syphon(q);\n  }; // SEND/RECEIVE\n\n\n  this.send = function (payload) {\n    for (var routeId in this.ports.output.routes) {\n      var route = this.ports.output.routes[routeId];\n\n      if (!route) {\n        continue;\n      }\n\n      route.host.receive(payload, this, route);\n    }\n\n    RIVEN.render();\n  };\n\n  this.receive = function (q, origin, route) {\n    var port = this.ports.output;\n\n    for (var routeId in port.routes) {\n      var _route = port.routes[routeId];\n\n      if (_route) {\n        _route.host.receive(q, this, _route);\n      }\n    }\n  };\n\n  this.bang = function () {\n    this.send(true);\n  }; // REQUEST/ANSWER\n\n\n  this.request = function (q) {\n    var payload = {};\n\n    for (var routeId in this.ports.request.routes) {\n      var route = this.ports.request.routes[routeId];\n\n      if (!route) {\n        continue;\n      }\n\n      var answer = route.host.answer(q, this, route);\n\n      if (!answer) {\n        continue;\n      }\n\n      payload[route.host.id] = answer;\n    }\n\n    return payload;\n  };\n\n  this.answer = function (q, origin, route) {\n    return this.request(q);\n  }; // Target\n\n\n  this.signal = function (target) {\n    for (var portId in this.ports) {\n      var port = this.ports[portId];\n\n      for (var routeId in port.routes) {\n        var route = port.routes[routeId];\n\n        if (!route || !route.host || route.host.id !== target.toLowerCase()) {\n          continue;\n        }\n\n        return route.host;\n      }\n    }\n\n    return null;\n  }; // PORT\n\n\n  this.Port = function (host, id) {\n    var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : PORT_TYPES.default;\n    this.host = host;\n    this.id = id;\n    this.type = type;\n    this.routes = [];\n\n    this.connect = function (port) {\n      if (!port) {\n        console.warn(\"Unknown port from: \".concat(this.host.id));\n        return;\n      }\n\n      this.routes.push(port);\n    };\n\n    this.disconnect = function (node) {\n      this.routes = this.routes.filter(function (item) {\n        return item.host.id !== node;\n      });\n    };\n  };\n};\n\nRIVEN.Cursor = function () {\n  this.pos = {\n    x: 0,\n    y: 0\n  };\n  this.offset = {\n    x: 0,\n    y: 0\n  };\n  this.origin = null;\n  this.canvas = document.querySelector('#canvas');\n\n  this.install = function (host) {\n    var _this3 = this;\n\n    this.host = host;\n    document.addEventListener('mousedown', function (e) {\n      _this3.touch({\n        x: e.clientX,\n        y: e.clientY\n      }, true);\n\n      e.preventDefault();\n    });\n    document.addEventListener('mousemove', function (e) {\n      _this3.touch({\n        x: e.clientX,\n        y: e.clientY\n      }, false);\n\n      e.preventDefault();\n    });\n    document.addEventListener('mouseup', function (e) {\n      _this3.touch({\n        x: e.clientX,\n        y: e.clientY\n      });\n\n      e.preventDefault();\n    });\n  };\n\n  this.update = function () {\n    // this.host.render()\n    this.canvas.style.transform = \"translate(\".concat(parseInt(this.offset.x), \"px,\").concat(parseInt(this.offset.y), \"px)\"); // transform: `translate(${parseInt(this.cur.offset.x)}px,${parseInt(this.cur.offset.y)}px)`\n  };\n\n  this.touch = function (pos) {\n    var click = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;\n\n    if (click === true) {\n      this.origin = pos;\n      return;\n    }\n\n    if (this.origin) {\n      this.offset.x += parseInt(pos.x - this.origin.x);\n      this.offset.y += parseInt(pos.y - this.origin.y);\n      this.update();\n      this.origin = pos;\n    }\n\n    if (click === null) {\n      this.origin = null;\n      return;\n    }\n\n    this.pos = pos;\n  };\n};\n\nmodule.exports = {\n  RIVEN: RIVEN,\n  Ø: Ø\n};\n\n//# sourceURL=webpack:///./src/riven.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var round = function round(value, decimals) {\n  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);\n};\n\nmodule.exports = {\n  round: round\n};\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ });