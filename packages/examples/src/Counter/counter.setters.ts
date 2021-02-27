import { State } from '../types'

export const incrementSetter = (state: State): State => ({
  ...state,
  count: state.count + 1,
})
export const decrementSetter = (state: State): State => {
  const count = state.count <= 1 ? 0 : state.count - 1
  return { ...state, count }
}
export const addSetter = (n) => (state: State): State => ({
  ...state,
  count: state.count + n,
})
export const add3Setter = (state: State): State =>
  addSetter(2)(incrementSetter(state))
