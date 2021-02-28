/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { reduceFunctionsToState } from '../reduceFunctionsToState'

export function getPartialStateWithAction<StateValue, Output>(
  state: readonly [StateValue, (state: StateValue) => void],
  functions: ((state: any) => any)[] = []
) {
  return {
    map: (fn: (state: any) => any) => {
      return getPartialStateWithAction<StateValue, Output>(state, [
        ...functions,
        fn,
      ])
    },

    value: (): readonly [Output, <Input>(state: Input) => void] => {
      return Array.isArray(functions) && functions.length > 0
        ? [
            reduceFunctionsToState<StateValue, Output>(state[0])(
              functions as any
            ),
            state[1],
          ]
        : (state as any)
    },
  }
}

// [StateValue, (state: StateValue) => void]
