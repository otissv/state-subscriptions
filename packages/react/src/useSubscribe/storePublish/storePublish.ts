import { ActionType } from '../../types'

export function storePublish<Store extends Record<string, any>>(store: Store) {
  return <Type extends string>(eventType: Type) => (
    actions: readonly ActionType[]
  ): void => store.publish([eventType, actions])
}
