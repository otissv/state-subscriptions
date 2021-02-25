import { ActionType, DispatchType } from '../../types'
import { GetPartialStateWithActionTo } from './types.getPartialStateWithAction'
import { reduceActionsToPartialState } from '../reduceActionsToPartialState'

export function getPartialStateWithAction<State>(
  state: readonly [State, DispatchType<State>],
  actions: readonly ActionType<State>[] = []
): GetPartialStateWithActionTo<State> {
  return {
    action: (action: ActionType<State>) =>
      getPartialStateWithAction<State>(state, [...actions, action]),

    value: () =>
      Array.isArray(actions) && actions.length > 0
        ? [reduceActionsToPartialState<State>(state[0])(actions), state[1]]
        : state,
  }
}
