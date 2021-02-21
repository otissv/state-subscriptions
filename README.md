# State Subscriptions

Subscribe to properties in the store

State subscriptions enables publishing and subscribing to properties in a store.

## Store

The store works by publishing and subscribing to events. An event is a path to a property in the store e.g 'user.name.filename'.

- `createStore(initialState)` returns a new instance of the store.

- `get(event)` retrieves a value from the store

- `publish(action1, action2, ... ,actionN)` merges the nextState with the stores state and emits the new state to all subscribers of the event. An action are an array with 2 items, where the 1st item is the event and the second items is a function to transform the state in the a nextState.

- `broadcast(nextState)` merges the nextState with the stores state and emits the new state to every listener.

## React

To use the state subscriptions wrap the root element in side a Store Provider.

```js
import { StoreProvider } from "./StoreContext";

const initialState = {
  count: 0
}

const store = createStore(initialState);



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

`useSubscribe(event)` to subscribe to a property in the store.
Whenever the property changes the subscription is updated with the new value.

To retrieve the value from useSubscribe you must call value `useSubscribe("count").value()`, which return an array where the first item is the state and the second item is a function to update the property in the store.

An option transform function can be added which takes a list of transform arguments to transform the state. `transform` does not change the state in the store.

```js
const [count, setCount] = useSubscribe("count")
  .transform((state) => state + 10)
  .value();
```

## Example

```js
import { StoreProvider } from "./StoreContext";
import { StoreProvider } from "./hooks";
const initialState = {
  count: 0
}
const store = createStore(initialState);


function App () {
  return <div>My App </div>
}

function Counter () {
  const [count, setCount] = useSubscribed('count)
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
