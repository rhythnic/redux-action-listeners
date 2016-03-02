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
    console.log(action);  // {type: '_ACTION_ONE'}
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
    actionListenerMiddleware(listenersA, listenersB)
  )
)
```

## Motivation

I wrote this middleware after some experience with both [redux-thunk](https://github.com/gaearon/redux-thunk) and [redux-saga](https://github.com/yelouafi/redux-saga).  I prefer saga to thunk because it's easier to decouple the logic, like
in a true events system.  Subscribing to actions in redux-saga is a bit cumbersome, using one function to subscribe
to all actions and another function as the handler, so I wrote some custom middleware similar to saga-redux, but more direct
and with a simpler API.

## Installation

npm install --save redux-action-listeners

## Contributors

If you would like to contribute, please first open a new issue for discussing.
