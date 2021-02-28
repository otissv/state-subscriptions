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

export default {
  title: 'Example',
  component: StoreProvider,
}

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

export const Example = (): JSX.Element => {
  return (
    <StoreProvider store={store}>
      <Counter />
    </StoreProvider>
  )
}
