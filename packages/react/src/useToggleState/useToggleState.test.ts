import { act, renderHook } from '@testing-library/react-hooks'
import { useToggleState } from './useToggleState'
describe('useToggleState', () => {
  it('should return default state', () => {
    const { result } = renderHook(() => useToggleState())

    expect(result.current[0]).toBe(false)
  })

  it('should update default state', () => {
    const { result } = renderHook(() => useToggleState())
    const setState = result.current[1]

    expect(result.current[0]).toEqual(false)
    act(() => {
      setState()
    })
    expect(result.current[0]).toEqual(true)
  })
})
