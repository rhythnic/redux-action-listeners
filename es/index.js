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

        return action.type && (allTypes || types.indexOf(action.type) > -1) ? listener.handleAction(action, dispatched, store) : dispatched;
      };
    };
  };
}