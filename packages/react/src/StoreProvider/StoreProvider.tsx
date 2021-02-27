import React from 'react'
import { StoreContext } from '../StoreContext'

export interface StoreProviderInterface<Store> {
  readonly children: React.ReactNode
  readonly store: Store
}

export function StoreProvider<Store>({
  children,
  store,
}: StoreProviderInterface<Store>): JSX.Element {
  const value = React.useRef(store || {})
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
