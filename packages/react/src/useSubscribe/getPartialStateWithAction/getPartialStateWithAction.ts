import { ActionType } from '../../types'
import { GetPartialStateWithActionTo } from './types.getPartialStateWithAction'
import { reduceActionsToPartialState } from '../reduceActionsToPartialState'

export function getPartialStateWithAction<StateValue>(
  state: readonly [StateValue, (state: StateValue) => void],
  actions: readonly ActionType[] = []
): GetPartialStateWithActionTo<StateValue> {
  return {
    action: (action) => {
      return getPartialStateWithAction<StateValue>(state, [
        ...actions,
        action as ActionType,
      ])
    },

    value: () => {
      return Array.isArray(actions) && actions.length > 0
        ? ([
            reduceActionsToPartialState<StateValue>(state[0])(actions),
            state[1],
          ] as any)
        : state
    },
  }
}
