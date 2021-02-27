import React from 'react'
import { useStore } from '../../../react/src/StoreContext'
import { useSubscribe } from '../../../react/src/useSubscribe/useSubscribe'
import { Store as StoreInterface } from '../../../store/src/store/store'

import {
  incrementSetter,
  decrementSetter,
  addSetter,
  add3Setter,
} from './counter.setters'

interface State {
  readonly count: number
}

type Store = StoreInterface<State>

export function Counter(): JSX.Element {
  const useStoreSubscribe = useSubscribe<Store>(useStore())

  const [countA, setCountA] = useStoreSubscribe('count')
    .action((count) => (typeof count === 'number' ? count + 10 : 10))
    .value()
  const [countB, setCountB] = useStoreSubscribe('count').value()

  function onIncrementClick() {
    setCountA([incrementSetter])
  }

  function onDecrementClick() {
    setCountA([decrementSetter])
  }

  function onAdd2() {
    setCountB([addSetter(2)])
  }

  function onAdd3() {
    setCountB([add3Setter])
  }

  function onAdd6() {
    setCountB([add3Setter, incrementSetter, addSetter(2)])
  }

  return (
    <div>
      <h2>Counter</h2>
      <div>
        <button onClick={onDecrementClick}>-</button>
        <button onClick={onIncrementClick}>+</button>
        <button onClick={onAdd2}>add2</button>
        <button onClick={onAdd3}>add3</button>
        <button onClick={onAdd6}>add6</button>
        <br />
        Count A: {countA}
        <br />
        Count B: {countB}
        <br />
      </div>
    </div>
  )
}
