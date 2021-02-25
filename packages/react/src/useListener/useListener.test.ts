import { act, renderHook } from '@testing-library/react-hooks'
import { useListener } from './useListener'
import { eventType, storeMock as store } from '../testhelpers'

describe('useListener', () => {
  afterEach(() => [jest.clearAllMocks()])
  it('should call store.on', () => {
    const { result } = renderHook(() => useListener(store)(eventType))
    expect(store.on).toHaveBeenCalledTimes(1)
    expect(store.on).toHaveBeenCalledWith('test event', result.current[1])
  })

  it('should call store removeListener on rerender', () => {
    const eventType = 'test event'

    const store = {
      on: jest.fn(),
      listeners: jest.fn(() => [eventType, eventType, eventType]),
      removeListener: jest.fn(),
    }

    const { result } = renderHook(() => useListener(store)(eventType))
    const setForceUpdate = result.current[1] as Function
    act(() => {
      setForceUpdate()
    })
    expect(store.on).toHaveBeenCalledTimes(2)
    expect(store.on).toHaveBeenCalledWith('test event', setForceUpdate)
    expect(store.listeners).toHaveBeenCalledTimes(1)
    expect(store.removeListener).toHaveBeenCalledTimes(store.listeners().length)
  })
})
