/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react'

import { StoreProvider } from '../../react/src/StoreProvider'
import { createStore } from '../../store/build/store/store'
import { Counter as CounterComponent } from './Counter'
import { Order as OrderComponent } from './Order'
import { Notifications as NotificationsComponent } from './Notifications'

export default {
  title: 'Core/Base',
  component: StoreProvider,
}

const store = createStore({
  count: 0,
  order: {
    cup: {
      size: 'small', // medium large
      madeOf: 'styrofoam', // or you could be eating in and it be a proper cup
    },
    milk: {
      type: 'almond',
      amount: 'splash',
    },
    shots: 1,
    food: [0, 1, 2, 3, 4, 5],
  },
  users: [],
})

const notificationStore = createStore({
  notifications: [],
})

export const Counter = () => (
  <StoreProvider store={store}>
    <CounterComponent />
  </StoreProvider>
)

export const Order = () => (
  <StoreProvider store={store}>
    <OrderComponent />
  </StoreProvider>
)

export const Notification = () => (
  <StoreProvider store={notificationStore}>
    <NotificationsComponent />
  </StoreProvider>
)
