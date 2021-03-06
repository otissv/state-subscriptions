import { getPartialStateWithAction } from './getPartialStateWithAction'

describe('getPartialStateWithAction', () => {
  type State = {
    firstName: string
    lastName: string
    fullName?: string
  }

  const state: State = {
    firstName: 'Hello',
    lastName: 'World',
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  const addFullName = (state: State) => ({
    ...state,
    fullName: `${state.firstName} ${state.lastName}`,
  })

  const fullNameToUpperCase = (state: State) => ({
    ...state,
    fullName: state.fullName && state.fullName.toUpperCase(),
  })

  it('should return state unchanged no actions ', () => {
    const dispatch = jest.fn()

    expect(
      getPartialStateWithAction<State, State>([state, dispatch]).value()
    ).toEqual([{ firstName: 'Hello', lastName: 'World' }, dispatch])
  })

  it('should transform state with actions ', () => {
    const dispatch = jest.fn()
    const result = getPartialStateWithAction<State, State>([state, dispatch])
      .map(addFullName)
      .map(fullNameToUpperCase)
      .value()

    expect(result).toEqual([
      { firstName: 'Hello', lastName: 'World', fullName: 'HELLO WORLD' },
      dispatch,
    ])
  })

  it('should return state unchanged if not valid actions ', () => {
    const dispatch = jest.fn()

    expect(
      getPartialStateWithAction<State, State>([state, dispatch])
        .map(undefined as any)
        .value()
    ).toEqual([{ firstName: 'Hello', lastName: 'World' }, dispatch])
    expect(
      getPartialStateWithAction<State, State>([state, dispatch])
        .map(null as any)
        .value()
    ).toEqual([{ firstName: 'Hello', lastName: 'World' }, dispatch])
    expect(
      getPartialStateWithAction<State, State>([state, dispatch])
        .map(1 as any)
        .value()
    ).toEqual([{ firstName: 'Hello', lastName: 'World' }, dispatch])
    expect(
      getPartialStateWithAction<State, State>([state, dispatch])
        .map(2 as any)
        .value()
    ).toEqual([{ firstName: 'Hello', lastName: 'World' }, dispatch])
    expect(
      getPartialStateWithAction<State, State>([state, dispatch])
        .map(true as any)
        .value()
    ).toEqual([{ firstName: 'Hello', lastName: 'World' }, dispatch])
    expect(
      getPartialStateWithAction<State, State>([state, dispatch])
        .map(false as any)
        .value()
    ).toEqual([{ firstName: 'Hello', lastName: 'World' }, dispatch])
    expect(
      getPartialStateWithAction<State, State>([state, dispatch])
        .map('' as any)
        .value()
    ).toEqual([{ firstName: 'Hello', lastName: 'World' }, dispatch])
    expect(
      getPartialStateWithAction<State, State>([state, dispatch])
        .map('1' as any)
        .value()
    ).toEqual([{ firstName: 'Hello', lastName: 'World' }, dispatch])
    expect(
      getPartialStateWithAction<State, State>([state, dispatch])
        .map({} as any)
        .value()
    ).toEqual([{ firstName: 'Hello', lastName: 'World' }, dispatch])
    expect(
      getPartialStateWithAction<State, State>([state, dispatch])
        .map([] as any)
        .value()
    ).toEqual([{ firstName: 'Hello', lastName: 'World' }, dispatch])
  })
})
