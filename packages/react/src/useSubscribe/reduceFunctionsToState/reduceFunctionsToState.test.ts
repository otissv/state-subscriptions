import { reduceFunctionsToState } from './reduceFunctionsToState'

describe('reduceFunctionsToState', () => {
  it('should transform state with actions', () => {
    interface State {
      firstName: string
      lastName: string
      fullName?: string
    }
    const state: State = {
      firstName: 'Hello',
      lastName: 'World',
    }

    const addFullName = (state: State) => ({
      ...state,
      fullName: `${state.firstName} ${state.lastName}`,
    })

    const fullNameToUpperCase = (state: State) => ({
      ...state,
      fullName: state.fullName && state.fullName.toUpperCase(),
    })

    const functions = [addFullName, fullNameToUpperCase]

    expect(reduceFunctionsToState(state)(functions)).toEqual({
      firstName: 'Hello',
      lastName: 'World',
      fullName: 'HELLO WORLD',
    })
  })

  it('should not transform state if functions is empty', () => {
    const state = {
      firstName: 'Hello',
      lastName: 'World',
    }
    expect(reduceFunctionsToState(state)()).toEqual(state)
  })

  it('should not transform state if not a function', () => {
    const state = {
      firstName: 'Hello',
      lastName: 'World',
    }
    expect(
      reduceFunctionsToState(state)([
        { firstName: 'HELLO', lastName: 'World' },
      ] as any)
    ).toEqual(state)
  })
})
