import { storePublish } from './storePublish'
import { storeMock as store } from '../../testhelpers'
describe('storePublish', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should publish event', () => {
    const eventType = 'test'
    const events = [(state: any) => state]

    storePublish(store)(eventType)(events)

    expect(store.publish).toHaveBeenCalledTimes(1)
    expect(store.publish).toHaveBeenCalledWith({
      type: eventType,
      actions: events,
    })
  })
})
