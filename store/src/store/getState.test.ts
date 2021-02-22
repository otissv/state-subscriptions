import { getState } from './getState';

describe('getState', () => {
  it('should extract property from state', () => {
    const state = {
      order: {
        cup: {
          size: 'small', // medium large
        },
        milk: {
          type: 'almond',
        },
        fruit: ['apples', 'pears'],
      },
    };

    expect(getState(['order', state])).toEqual(state.order);
    expect(getState(['order.cup', state])).toEqual(state.order.cup);
    expect(getState(['order.cup.size', state])).toEqual(state.order.cup.size);
    expect(getState(['order.milk', state])).toEqual(state.order.milk);
    expect(getState(['order.milk.type', state])).toEqual(state.order.milk.type);
    expect(getState(['order.fruit', state])).toEqual(state.order.fruit);
  });
});
