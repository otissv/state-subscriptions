import { ActionType } from '../../types'

export function reduceActionsToPartialState<State>(state: State) {
  return (actions: readonly ActionType<State>[] = []): Partial<State> =>
    actions.reduce(
      (previousValue: State, action: ActionType<State>) =>
        typeof action === 'function' ? action(previousValue) : previousValue,
      state
    )
}
