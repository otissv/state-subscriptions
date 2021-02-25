import { pipe } from '../utils/pipe'
import { ActionType } from '../types'

export function useBroadcast<Store extends Record<string, any>>(
  storeRef: Store
) {
  return (actions: readonly ActionType<Store['state']>[]): void => {
    const store = storeRef.current
    const nextState = pipe(...actions)(store.state)
    store.broadcast(nextState)
  }
}
