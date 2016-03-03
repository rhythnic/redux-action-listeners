module.exports = function actionListenerMiddleware (listeners) {

  listeners = Array.isArray(listeners)
    ? listeners
    : Array.prototype.slice.call(arguments);

  var actionListeners = listeners.reduce((result, listener) => {
    Object.keys(listener).forEach(type => {
      var typeListeners = Array.isArray(listener[type])
        ? listener[type]
        : [listener[type]];
      result[type] = (result[type] || []).concat(typeListeners);
    });
    return result;
  }, {});

  return function(store) { return function(next) { return function(action) {
    next(action);
    if (typeof action === 'object') {
      (actionListeners[action.type] || []).forEach(function(listener) {
        listener(action, store);
      });
    }
  }; }; };
}

// ES6
//
// export function actionListenerMiddleware (...listeners) {
//
//   const actionListeners = listeners.reduce((result, listener) => {
//     Object.keys(listener).forEach(type => {
//       const typeListeners = Array.isArray(listener[type])
//         ? listener[type]
//         : [listener[type]];
//       result[type] = (result[type] || []).concat(typeListeners);
//     });
//     return result;
//   }, {});
//
//   return store => next => action => {
//     next(action);
//     if (typeof action === 'object') {
//       (actionListeners[action.type] || []).forEach(listener => listener(action, store));
//     }
//   };
// }
