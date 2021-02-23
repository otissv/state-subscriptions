/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-return-void */
import { publish } from './publish'
import { EventInterface } from './types'

export function usePublish<
  Store extends Record<string, any>,
  Type extends string
>(storeRef: Store, ...events: readonly EventInterface<Type>[]): void {
  const store = storeRef.current || {}
  publish(store, ...events)
}
