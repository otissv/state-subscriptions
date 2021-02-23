import React from 'react'

// import { useSubscribe } from "./hooks";

export const StoreContext = React.createContext<Record<string, any>>({})

export function useStore(): Record<string, any> {
  return React.useContext(StoreContext)
}

// export function useStoreSubscribe(event) {
//   return useSubscribe(useStore(), event);
// }

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
