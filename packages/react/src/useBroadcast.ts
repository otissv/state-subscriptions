/* eslint-disable functional/no-return-void */
import { pipe } from './utils/pipe'

export function useBroadcast<Store extends Record<string, any>>(
  storeRef: Store,
  ...fns: readonly Function[]
): void {
  const store = storeRef.current

  const nextState = pipe(...fns)(store.state)
  // eslint-disable-next-line functional/no-expression-statement
  store.broadcast(nextState)
}
