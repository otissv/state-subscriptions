import { renderHook } from '@testing-library/react-hooks'
import { useBroadcast } from './useBroadcast'

describe('useBroadcast', () => {
  let store: Record<string, any> = {}
  beforeEach(() => {
    store = {
      current: {
        state: { e1: 'e1 test', e2: 'e1 test' },
        broadcast: jest.fn(),
      },
    }
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should broadcast to store', () => {
    renderHook(() =>
      useBroadcast(store)([
        (state) => ({ ...state, e1: 'e1 test next1' }),
        (state) => ({ ...state, e1: 'e1 test next2' }),
      ])
    )

    expect(store.current.broadcast).toBeCalledTimes(1)
    expect(store.current.broadcast).toBeCalledWith({
      e1: 'e1 test next2',
      e2: 'e1 test',
    })
  })
})
