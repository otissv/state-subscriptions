export interface EventInterface<Type> {
  readonly type: Type
  readonly actions: readonly ActionType[]
}

export type ActionType = <Input>(state: Input) => unknown
export type StateDispatch = (actions: readonly ActionType[]) => void
export type StateType<StateValue> = readonly [StateValue, StateDispatch]
