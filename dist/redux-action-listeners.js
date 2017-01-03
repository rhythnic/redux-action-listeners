(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ReduxActionListeners"] = factory();
	else
		root["ReduxActionListeners"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.default = actionListenerMiddleware;
	function isFunction(x) {
	  return typeof x === 'function';
	}

	function isString(x) {
	  return typeof x === 'string';
	}

	function actionListenerMiddleware(listener) {

	  if (!listener || (typeof listener === 'undefined' ? 'undefined' : _typeof(listener)) !== 'object') {
	    throw new Error('Action Listeners: listener must be an object.');
	  }

	  if (!isFunction(listener.handleAction)) {
	    throw new Error('Action Listeners: handleAction must be a function.');
	  }

	  var types = listener.types;

	  var allTypes = isString(types) && types.toLowerCase() === 'all';

	  if (!allTypes && (!Array.isArray(types) || !types.every(isString))) {
	    throw new Error('Action Listeners: types must be "all" or an array of action types.');
	  }

	  return function (store) {

	    if (isFunction(listener.setStore)) {
	      listener.setStore(store);
	    }

	    return function (next) {
	      return function (action) {

	        var dispatched = next(action);

	        return allTypes || types.indexOf(action.type) > -1 ? listener.handleAction(action, dispatched, store) : dispatched;
	      };
	    };
	  };
	}

/***/ }
/******/ ])
});
;