import React from 'react'

export const StoreContext = React.createContext<Record<string, any>>({})

export function useStore<Store extends Record<string, any>>(): Store {
  return React.useContext(StoreContext as any)
}
