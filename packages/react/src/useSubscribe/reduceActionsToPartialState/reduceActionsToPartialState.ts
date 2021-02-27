export function reduceActionsToPartialState<State>(state: State) {
  return (actions: ((state: any) => unknown)[] = []): unknown =>
    actions.reduce(
      (previousValue: unknown, action: (state: unknown) => unknown) => {
        return typeof action === 'function'
          ? action(previousValue)
          : previousValue
      },
      state
    )
}
