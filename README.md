## Synopsis

This is Redux middleware for listening to actions.  The middleware is configured with actionListeners, and those action listeners are
called after the reducer runs.  The action listeners receive the action and the store.

## Code Example

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

## Motivation

I wrote this middleware after some experience with both [redux-thunk](https://github.com/gaearon/redux-thunk) and [redux-saga](https://github.com/yelouafi/redux-saga).  I prefer saga to thunk because it's easier to decouple the logic, like
in a true events system.  Subscribing to actions in redux-saga is a bit cumbersome, using one function to subscribe and another function as the handler, so I wrote some custom middleware similar to redux-saga, but more direct and with a simpler API.

## Installation

npm install --save redux-action-listeners

## API Reference

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
