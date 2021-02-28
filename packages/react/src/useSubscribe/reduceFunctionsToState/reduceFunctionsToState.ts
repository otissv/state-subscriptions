export function reduceFunctionsToState<Input, Output>(state: Input) {
  return (functions: ((state: any) => any)[] = []): Output =>
    functions.reduce((previousValue: any, fn: (state: Output) => any) => {
      return typeof fn === 'function' ? fn(previousValue) : previousValue
    }, state)
}
