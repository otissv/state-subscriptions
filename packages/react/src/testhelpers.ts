export const eventType = 'test event'

const state = {
  e1: 'e1 test',
  e2: 'e1 test',
  eventType,
  user: {
    name: 'Bob Smith',
    followers: [
      {
        name: 'Jane Doe',
      },
    ],
  },
}

export const storeMock = {
  broadcast: jest.fn(),
  get: jest.fn((eventName: string) => {
    switch (eventName) {
      case 'e1':
        return state.e1
      case 'e2':
        return state.e2
      case eventType:
        return eventType
      case 'user.followers':
        return state.user.followers
    }
    return
  }),
  listeners: jest.fn(() => [eventType]),
  on: jest.fn(),
  publish: jest.fn(),
  removeListener: jest.fn(),
  state,
}
