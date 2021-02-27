import { storePublish } from './storePublish'
import { storeMock as store } from '../../testhelpers'
describe('storePublish', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should publish event', () => {
    const eventType = 'test'
    const actions = [(state: any) => state]

    storePublish(store)(eventType)(actions)

    expect(store.publish).toHaveBeenCalledTimes(1)
    expect(store.publish).toHaveBeenCalledWith([eventType, actions])
  })
})
