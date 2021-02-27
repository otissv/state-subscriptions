export interface GetPartialStateWithActionTo<StateValue> {
  action: <Input, Output>(
    action: (state: Input | StateValue) => Output
  ) => GetPartialStateWithActionTo<StateValue>
  value: () => readonly [StateValue, <Input>(state: Input) => void]
}
