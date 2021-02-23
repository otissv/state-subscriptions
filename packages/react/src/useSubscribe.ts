/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-return-void */
import React from 'react'
import { publish } from './publish'
import { ActionType } from './types'

export function useSubscribe<
  Store extends Record<string, any>,
  Type extends string
>(
  storeRef: Store,
  event: Type
): {
  readonly transform: (
    ...actions: readonly ActionType[]
  ) => {
    readonly value: () => readonly (
      | ((...actions: readonly ActionType[]) => void)
      | Store['state']
    )[]
  }
  readonly value: () => readonly any[]
} {
  const store = storeRef.current || {}

  const [forceUpdate, setForceUpdate] = React.useState(false)

  React.useEffect(() => {
    // Add event listener
    const updateState = () => setForceUpdate(!forceUpdate)
    store.on(event, updateState)

    return () => {
      // remove event listeners.
      // stop multiple listers from being created.
      store.listeners(event).forEach(() => {
        store.removeListener(event, updateState)
      })
    }
  }, [store, event, forceUpdate, setForceUpdate])

  function dispatch(...actions: readonly ActionType[]) {
    publish(store, {
      type: event,
      actions: actions,
    })
  }

  const state = [store.get(event), dispatch]

  return {
    transform: (...actions: readonly ActionType[]) => ({
      value: () => [
        actions.reduce(
          (previousValue: Store['state'], action: ActionType) =>
            action(previousValue),
          state[0]
        ),
        dispatch,
      ],
    }),
    value: () => state,
  }
}
