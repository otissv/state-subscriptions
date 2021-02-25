import { ActionType, DispatchType } from '../../types'

export interface GetPartialStateWithActionTo<State> {
  action: (
    ...actions: readonly ActionType<State>[]
  ) => GetPartialStateWithActionTo<State>
  value: () => readonly [Partial<State>, DispatchType<State>]
}
