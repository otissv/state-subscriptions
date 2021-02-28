import React from 'react'

import { updateOrderSetter } from './orderSetters'
import { useStore } from '@state-subscriptions/react'
import { useSubscribe } from '@state-subscriptions/reactuseSubscribe'
import { Store as StoreInterface } from '@state-subscriptions/store/store'

interface State {
  readonly order: any
}

type Store = StoreInterface<State>

export function Order(): JSX.Element {
  const useStoreSubscribe = useSubscribe<Store>(useStore())
  const [order, setOrder] = useStoreSubscribe<string, State['order']>(
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
      (_state: State) => ({
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
