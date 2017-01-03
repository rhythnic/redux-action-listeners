## Synopsis

Redux middleware for listening to actions.

## Installation

```
npm install --save redux-action-listeners
```

## Description
Redux Action Listeners allows you to listen to Redux actions.  You also have the option
of altering the return value of dispatch for that action.

## How it works
Create an object that defines the listener interface.

#### Listener Interface (my-listener.js)
```
export default {

  // types can be an array of action types, or the string 'all'
  types: [ 'ACTION_TYPE' ],

  // setStore (optional)
  // in case you want a reference to store in your listener object
  setStore (store) {
    this.store = store;
  },

  // handleAction is called when an action from types is dispatched
  handleAction ( action, dispatched, store ) {

  }
}
```

#### handleAction arguments
  1) action
    * the original action dispatched
    * must be a plain object with a type (thunk actions not supported)
  2) dispatched
    * the action is intercepted by handleAction after it has been passed to the next middleware
    * dispatched is the result of having called next(action)
    * for more information on how middleware is composed, see [the redux middleware docs](http://redux.js.org/docs/advanced/Middleware.html)
  3) store
    * a reference to the store

#### handleAction return value
If handleAction is called, whatever you return from it will be the return value of dispatching the action.


### store.js (where you configure your redux store)
```
import { createStore, applyMiddleware } from 'redux'
import listen from 'redux-action-listeners'
import MyListener from './my-listener'

const store = createStore(
  reducer,
  applyMiddleware(
    listen(MyListener)
  )
)
```

If you have multiple listeners, use the middleware multiple times.
```
const store = createStore(
  reducer,
  applyMiddleware(
    listen(ListenerA), listen(ListenerB)
  )
)
```


## Listener Examples

### Async listener
You can return a promise from the handleAction method.
```
// fetch-listener.js

export default {
  types: [ 'FETCH' ],

  handleAction (action) {
    return fetch(action.url, action.init).then(response => response.json())
  }
}
```

Usage
```
// actions.js
export function fetchCurrentUser(userId) {
  const action = {
    type: 'FETCH',
    url: `https://mydomain.com/api/users/${userId}`
  }
  return dispatch => dispatch(action).then(user => {
    console.log(user.displayName)
  })
}
```


### Event Emitter
```
// action-emitter.js

// node's EventEmitter class
import EventEmitter from 'events';

export default class ActionEmitter extends EventEmitter {
  constructor(...args) {
    super(...args);
    this.types = 'all';
  }
  handleAction(action, dispatched, store) {
    this.emit(action.type, action, store);
    return dispatched;
  }
}
```

Usage
```
import ActionEmitter from '../action-emitter';

ActionEmitter.on('MY_REDUX_ACTION', (action, store) => {
  // do something
  // store.dispatch({ type: 'ANOTHER_ACTION' });
})
```


## Disclaimer
I made this redux middleware a long time ago, and I'm not currently using it.
I've never used or tested the event emitter example.



## Contributors

If you would like to contribute, please first open a new issue for discussing.
