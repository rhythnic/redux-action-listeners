function isFunction(x) {
  return typeof x === 'function';
}

function isString(x) {
  return typeof x === 'string';
}


export default function actionListenerMiddleware(listener) {

  if (!listener || typeof listener !== 'object') {
    throw new Error('Action Listeners: listener must be an object.');
  }

  if (!isFunction(listener.handleAction)) {
    throw new Error('Action Listeners: handleAction must be a function.');
  }

  let { types } = listener;
  const allTypes = isString(types) && types.toLowerCase() === 'all';

  if (!allTypes && (!Array.isArray(types) || !types.every(isString))) {
    throw new Error('Action Listeners: types must be "all" or an array of action types.');
  }


  return function(store) {

    if (isFunction(listener.setStore)) {
      listener.setStore(store);
    }

    return next => action => {

      const dispatched = next(action);

      return ( allTypes || (types.indexOf(action.type) > -1) )
        ? listener.handleAction(action, dispatched, store)
        : dispatched;
    };

  };

}
