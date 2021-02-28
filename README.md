# State Subscriptions

An experiment to publish and subscribe to properties in a store.

# Motivation

The idea was to create a simple, small surface API for state management with the ability to subscribe to property changes in the state tree. State is treated as an external side-effect like a database would

## Store

At it's core the Store is an event emitter and follows the fire and forget principle.

The store works by publishing and subscribing to properties in the state tree called an event. An event is a path to a property in the state e.g 'user.name.filename'.

### Methods

- `createStore(preloadState, options?)`  
   Creates a new instance of the store.

  - preloadState - An object containing state to be
  - options

    - `onPublish`  
      Callback function called every time an event is published

    - `onSubscribe`
    - Callback function called every time a event is received by a subscriber.

- `get(eventName)`  
  Retrieves a value from the store.The `eventName` is the path to a state property.

  - eventName - path to property in state

- `publish(event, event2, ... ,eventN)`
  Merges the nextState with the stores state and emits the new state to all subscribers of the event.

  - `event` - An event is an array with 2 items, where the first item is the eventName and the second item is a function to transform the state in to the next state.

- `subscribe(eventName, listener)`  
  Creates an event listener for a state property.

  - `eventName` - An eventName is the path to a state property.
  - `listener` - A listener is a callback to receive the property value.

## React

To use the state subscriptions wrap the root element in side a Store Provider.

```js
import React from 'react'
import {
  StoreProvider,
  useStore,
} from '@state-subscriptions/react/StoreContext'
import { useSubscribe } from '@state-subscriptions/react/useSubscribe'
import { createStore } from '@state-subscriptions/store/store'

const initialState = {
  count: 0,
}
const store = createStore(initialState)

function Counter() {
  const [count, setCount] = useSubscribe(useStore()).value()

  function onDecrementClick() {
    setCount([(count: number) => count - 1])
  }

  function onIncrementClick() {
    setCount([(count: number) => count + 1])
  }

  return (
    <div>
      <div>
        <button onClick={onDecrementClick}>-</button>
        <button onClick={onIncrementClick}>+</button>
      </div>
      {count}
    </div>
  )
}
function App () {
  return <div>My App </div>
}

const rootElement = ;
ReactDOM.render(
    <StoreProvider store={store}>
      <App />
    </StoreProvider>,
  document.getElementById("root")
);
```

The StoreProvider caches the store in a `useRef` hook. Unlike `useState`, `useRef` is persisted between renders and does not trigger an rerender when it's values change. Therefore the only way to trigger a rerender is via a subscription.

### Subscriptions

- `useSubscribe(storeRef)(event)` subscribes to a property in state.

To retrieve the value from useSubscribe you must call value `useSubscribe(storeRef)(event).value()`, which returns an array where the first item is the state and the second item is a function to update the property in the store.

An option `map` function can be added which takes a list of transform arguments to transform the state. `map` does not change the state in the store only the returned value.

```js
const [count, setCount] = useSubscribe(storeRef)("count")
  .map((count) => count + 10)
  .value();
```

## Example

```js
import { StoreProvider, useStore } from "@state-subscriptions/react/StoreContext";
import { useSubscribe } from "@state-subscriptions/react/useSubscribe";
import { createStore } from '@state-subscriptions/store/store'

const initialState = {
  count: 0
}
const store = createStore(initialState);


function App () {
  return <div>My App </div>
}

function Counter () {
  const [count, setCount] = useSubscribe(store('count)
    // will return the value retrieved from the store with 10 added to it
      .transform(c => c + 10)
      .value()

}

const rootElement = document.getElementById("root");
ReactDOM.render(
    <StoreProvider store={store}>
      <App>
        <Counter />
      </App>
    </StoreProvider>
  rootElement
);
```
