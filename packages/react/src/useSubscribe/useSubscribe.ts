/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { StateType } from '../types'
import { getPartialStateWithAction } from './getPartialStateWithAction'
import { storePublish } from './storePublish'
import { useListener } from '../useListener'

export function useSubscribe<Store extends Record<string, any>>(
  storeRef: Store
) {
  return <Type extends string>(eventName: Type) => {
    const store: Store = storeRef.current || {}
    useListener(store)(eventName)

    const state: StateType<Store['state']> = [
      store.get(eventName),
      storePublish(store)(eventName),
    ]

    return getPartialStateWithAction<Store['state']>(state)
  }
}
