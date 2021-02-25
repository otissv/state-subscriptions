import { renderHook } from '@testing-library/react-hooks'
import { usePublish } from './usePublish'
import { storeMock } from '../testhelpers'

describe('usePublish', () => {
  let store: Record<string, any> = {}
  beforeEach(() => {
    store = {
      current: storeMock,
    }
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should broadcast to store', () => {
    const events = [
      {
        type: 'e1',
        actions: [(state: any) => ({ ...state, e1: 'e1 test next1' })],
      },
      {
        type: 'e2',
        actions: [(state: any) => ({ ...state, e2: 'e1 test next2' })],
      },
    ]
    renderHook(() => usePublish(store)(...events))

    expect(store.current.publish).toBeCalledTimes(1)
    expect(store.current.publish).toBeCalledWith(...events)
  })
})
