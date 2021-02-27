import { act, renderHook } from '@testing-library/react-hooks'

import { useSubscribe } from './useSubscribe'
import { storeMock } from '../testhelpers'

describe('useSubscribe', () => {
  afterEach(() => [jest.clearAllMocks()])

  it('should get property from state', () => {
    const store = {
      current: storeMock,
    }
    const { result } = renderHook(() =>
      useSubscribe(store)('user.followers').value()
    )

    expect(result.current[0]).toEqual([{ name: 'Jane Doe' }])
  })

  it('should publish event type', () => {
    const type = 'user.followers'
    const store = {
      current: storeMock,
    }
    const { result } = renderHook(() => useSubscribe(store)(type).value())

    const publish = result.current[1]

    const actions = [
      (state: any) => ({
        ...state,
        user: {
          followers: [
            ...state.user.followers,
            {
              name: 'Molly Malik',
            },
          ],
        },
      }),
    ]
    act(() => {
      publish(actions)
    })
    expect(store.current.publish).toHaveBeenCalledTimes(1)
    expect(store.current.publish).toHaveBeenCalledWith([type, actions])
  })
})
