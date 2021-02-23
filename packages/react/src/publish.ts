/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-return-void */

import { pipe } from './utils/pipe'

import { EventInterface } from './types'

export function publish<Store extends Record<string, any>, Type extends string>(
  store: Store,
  ...events: readonly EventInterface<Type>[]
): void {
  events.forEach(({ type, actions }) => {
    const fns = Array.isArray(actions) ? actions : [actions]

    const nextState = pipe(...fns)(store.state)
    store.publish([
      type,
      {
        [type.split('.')[0]]: store.get(type.split('.')[0], nextState),
      },
    ])
  })
}
