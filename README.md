## Synopsis

Redux middleware for listening to actions.

## Installation

```
npm install --save redux-action-listeners
```

## Version >= 0.1.0

### listener.js
```
export default {

  // types can be an array of action types, or the string 'all'
  types: [ 'ACTION_TYPE' ],

  // setStore is optional
  setStore (store) {
    this.store = store;
  },

  // called when action from types is dispatched
  handleAction ( action, dispatched, store ) {
    // 'dispatched' is the result of calling next(action) in the middleware
  }
}
```

### store.js
```
import { createStore, applyMiddleware } from 'redux'
import listen from 'redux-action-listeners'
import listener from './listener'

const store = createStore(
  reducer,
  applyMiddleware(
    listen(listener)
  )
)
```

If you have multiple listeners, use the middleware multiple times.
```
const store = createStore(
  reducer,
  applyMiddleware(
    listen(listenerA), listen(listenerB)
  )
)
```


## Version < 0.1.0

```
import { createStore, applyMiddleware } from 'redux'
import actionListenerMiddleware from 'redux-action-listeners'

const listenersA = {
  // object key should match the action type
  ACTION_ONE(action, store) {
    console.log(action);  // {type: 'ACTION_ONE'}
    store.dispatch({type: 'ACTION_TWO'});
  },
  // actions can by handled by multiple listeners (see listenersB.ACTION_TWO)
  ACTION_TWO(action, store) {}
}

const listenersB = {
  // action listeners can be an array of action listeners
  ACTION_TWO: [
    (action, store) => {
      console.log(action);  // {type: 'ACTION_TWO'}
    },
    (action, store) => {}
  ]
}

const store = createStore(
  reducer,
  applyMiddleware(
    // pass in listeners as multiple arguments or one array of listeners
    actionListenerMiddleware(listenersA, listenersB)
  )
)
```

## API Reference ( < 0.1.0 )

### actionListenerMiddleware(listeners)
This is the default export of 'redux-action-listeners', so you can name it anything.
It accepts multiple listeners as parameters or one array.
  * actionListenerMiddleware(listenersA, listenersB)
  * actionListenerMiddleware([ listenersA, listenersB ])

### actionListener objects
The listener groups, passed into the middelware, are plain objects.  Action types are
the keys, and action listeners are the values.

```
const ACTION_TYPE_B = 'ACTION_TYPE_B';

function handle_A_and_C (action, store) {}
function handle_B_and_C (action, store) {}

export const actionListeners = {
  ACTION_TYPE_A: handle_A_and_C,
  [ACTION_TYPE_B]: handle_B_and_C,
  ACTION_TYPE_C: [handle_A_and_C, handle_B_and_C]
}
```


## Contributors

If you would like to contribute, please first open a new issue for discussing.
