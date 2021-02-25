import React from 'react'

import { useToggleState } from '../useToggleState'

/**
 * Creates a new event listener.
 * When the listener receives a new event a rerender is initiated.
 * @param store
 */
export function useListener<Store extends Record<string, any>>(store: Store) {
  return <Type>(
    eventType: Type
  ): readonly (boolean | React.Dispatch<React.SetStateAction<boolean>>)[] => {
    const [forceUpdate, setForceUpdate] = useToggleState()

    React.useEffect(() => {
      store.on(eventType, setForceUpdate)

      return () =>
        store.listeners(eventType).forEach(() => {
          store.removeListener(eventType, setForceUpdate)
        })
    }, [store, eventType, forceUpdate, setForceUpdate])

    return [forceUpdate, setForceUpdate]
  }
}
