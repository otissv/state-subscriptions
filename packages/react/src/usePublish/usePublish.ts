import { EventInterface } from '../types'

export function usePublish<Store extends Record<string, any>>(storeRef: Store) {
  return <Type extends string>(
    ...events: readonly EventInterface<Type>[]
  ): void => {
    storeRef.current && storeRef.current.publish(...events)
  }
}
