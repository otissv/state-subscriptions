import React from 'react'

import { updateOrderSetter } from './orderSetters'
import { useStore } from '../../../react/src/StoreContext'
import { useSubscribe } from '../../../react/src/useSubscribe/useSubscribe'
import { Store as StoreInterface } from '../../../store/src/store/store'

interface State {
  readonly order: any
}

type Store = StoreInterface<State>

export function Order(): JSX.Element {
  const useStoreSubscribe = useSubscribe<Store>(useStore())
  const [order, setOrder] = useStoreSubscribe<State['order'], string>(
    'order'
  ).value()
  const setCup = useStoreSubscribe('order.cup').value()[1]

  function handelOnUpdateOrder() {
    setOrder([
      updateOrderSetter({
        milk: null,
      }),
    ])
  }

  function handelOnUpdateCup() {
    setCup([
      (_state) => ({
        order: {
          cup: {
            size: 1,
          },
        },
      }),
    ])
  }
  return (
    <div>
      <h2>Orders</h2>

      <button onClick={handelOnUpdateCup}>Update cup</button>
      <button onClick={handelOnUpdateOrder}>Update Order</button>
      <pre>{JSON.stringify(order, null, 2)}</pre>
    </div>
  )
}
