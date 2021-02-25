import { reduceActionsToPartialState } from './reduceActionsToPartialState'

describe('reduceActionsToPartialState', () => {
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

    const actions = [addFullName, fullNameToUpperCase]

    expect(reduceActionsToPartialState(state)(actions)).toEqual({
      firstName: 'Hello',
      lastName: 'World',
      fullName: 'HELLO WORLD',
    })
  })

  it('should not transform state if actions is empty', () => {
    const state = {
      firstName: 'Hello',
      lastName: 'World',
    }
    expect(reduceActionsToPartialState(state)()).toEqual(state)
  })

  it('should not transform state if action is not a function', () => {
    const state = {
      firstName: 'Hello',
      lastName: 'World',
    }
    expect(
      reduceActionsToPartialState(state)([
        { firstName: 'HELLO', lastName: 'World' },
      ] as any)
    ).toEqual(state)
  })
})
