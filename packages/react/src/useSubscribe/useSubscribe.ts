/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { StateType } from '../types'
import { getPartialStateWithAction } from './getPartialStateWithAction'
import { storePublish } from './storePublish'
import { useListener } from '../useListener'

export function useSubscribe<Store extends Record<string, any>>(
  storeRef: Store
) {
  return <Type extends string>(eventType: Type) => {
    const store: Store = storeRef.current || {}
    useListener(store)

    const state: StateType<Partial<Store['state']>> = [
      store.get(eventType),
      storePublish(store)(eventType),
    ]

    return getPartialStateWithAction(state)
  }
}
