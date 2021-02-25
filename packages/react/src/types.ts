export type ActionType<State> = (state: State) => State

export interface EventInterface<Type, State> {
  readonly type: Type
  readonly actions: readonly ActionType<State>[]
}

export type StateType<State> = readonly [State, DispatchType<State>]

export type DispatchType<State> = (
  actions: readonly ActionType<State>[]
) => void
