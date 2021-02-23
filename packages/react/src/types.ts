export type ActionType = <State extends Record<string, any>>(
  state: State
) => State

export interface EventInterface<Type extends string> {
  readonly type: Type
  readonly actions: readonly ActionType[]
}
