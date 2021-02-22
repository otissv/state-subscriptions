import { createStore, Store } from './store';

describe('createStore', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create an instance of Store', () => {
    const store = createStore();
    expect(store instanceof Store).toBe(true);
    expect(store.state).toEqual({});
  });

  it('should create store with preloaded state', () => {
    const preloadState = {
      test: 'my store',
    };

    const store = createStore(preloadState);
    expect(store.state).toEqual(preloadState);
  });

  it('should retrieve state', () => {
    const preloadState = {
      test: 'my store',
    };

    const store = createStore(preloadState);
    expect(store.state).toBe(preloadState);
    expect(store.preloadState).toBe(preloadState);
  });

  it('should have options', () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    const store = createStore(
      {},
      {
        onPublish: [fn1],
        onSubscribe: [fn2],
      },
    );
    expect(store.onPublish).toEqual([fn1]);
    expect(store.onSubscribe).toEqual([fn2]);
  });

  it('should get property from state', () => {
    const preloadState = {
      test: 'my store',
    };
    const store = createStore(preloadState);
    expect(store.get('test')).toEqual(preloadState.test);
  });

  it('should return empty state if invalid event', () => {
    const preloadState = {
      test: 'my store',
    };
    const store = createStore(preloadState);
    expect(store.get(' ')).toEqual({});
    expect((store as any).get(1)).toEqual({});
    expect((store as any).get(0)).toEqual({});
    expect((store as any).get(true)).toEqual({});
    expect((store as any).get(false)).toEqual({});
    expect((store as any).get(Symbol)).toEqual({});
    expect((store as any).get(null)).toEqual({});
    expect((store as any).get()).toEqual({});
    expect((store as any).get(undefined)).toEqual({});
  });

  it('should publish event', () => {
    const preloadState = {
      test: 'my store',
    };
    const store = createStore(preloadState);
    const type = 'test';
    const event: [string, { test: string }] = [type, { test: 'next state' }];

    jest.spyOn(store, 'publish');
    jest.spyOn(store, 'emit');
    jest.spyOn(store, 'get');

    store.publish(event);

    expect(store.state.test).toBe(event[1][type]);

    expect(store.publish).toBeCalledTimes(1);
    expect(store.publish).toBeCalledWith(event);
    expect(store.publish).toReturnWith(store);

    expect(store.emit).toBeCalledTimes(1);
    expect(store.emit).toBeCalledWith(type, event[1][type]);

    expect(store.get).toBeCalledTimes(1);
    expect(store.get).toBeCalledWith(type);
  });

  it('should call onPublish when publishing event', () => {
    const preloadState = {
      test: 'my store',
    };

    const callback = jest.fn((_even: any, state: any) => state);
    const type = 'test';
    const event: [string, { test: string }] = [type, { test: 'next state' }];
    const store = createStore(preloadState, { onPublish: [callback] });

    store.publish(event);

    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith(event);
  });

  it('should not publish is missing event', () => {
    const store = createStore();
    jest.spyOn(store, 'publish');

    jest.spyOn(store, 'emit');
    jest.spyOn(store, 'get');

    store.publish(['', {}]);
    expect(store.emit).toBeCalledTimes(0);
    expect(store.get).toBeCalledTimes(0);

    (store as any).publish([undefined, {}]);
    expect(store.emit).toBeCalledTimes(0);
    expect(store.get).toBeCalledTimes(0);

    (store as any).publish([null, {}]);
    expect(store.emit).toBeCalledTimes(0);
    expect(store.get).toBeCalledTimes(0);

    (store as any).publish([0, {}]);
    expect(store.emit).toBeCalledTimes(0);
    expect(store.get).toBeCalledTimes(0);

    (store as any).publish([true, {}]);
    expect(store.emit).toBeCalledTimes(0);
    expect(store.get).toBeCalledTimes(0);

    (store as any).publish([false, {}]);
    expect(store.emit).toBeCalledTimes(0);
    expect(store.get).toBeCalledTimes(0);
  });

  it('should subscribe to event', () => {
    const preloadState = {
      test: 'my store',
    };
    const store = createStore(preloadState);

    jest.spyOn(store, 'subscribe');
    const type = 'test';
    const listener = jest.fn((state) => state);
    const event: [string, { test: string }] = [type, { test: 'next state' }];

    store.subscribe(type, listener);
    store.publish(event);

    expect(store.subscribe).toBeCalledTimes(1);
    expect(store.subscribe).toBeCalledWith(type, listener);
    expect(store.subscribe).toReturnWith(store);
  });

  it('should receive subscribed event', () => {
    const preloadState = {
      test: 'my store',
    };
    const store = createStore(preloadState);
    jest.spyOn(store, 'subscribe');
    const type = 'test';
    const event: [string, { test: string }] = [type, { test: 'next state' }];
    const listener = jest.fn((state) => state);

    store.subscribe(type, listener);
    store.publish(event);

    expect(listener).toBeCalledTimes(1);
    expect(listener).toBeCalledWith(event[1][type]);
  });

  it('should call onSubscribe when publishing event', () => {
    const preloadState = {
      test: 'my store',
    };

    const callback = jest.fn((_even: any, state: any) => state);
    const type = 'test';
    const store = createStore(preloadState, { onSubscribe: [callback] });
    const event: [string, { test: string }] = [type, { test: 'next state' }];

    store.subscribe(type, jest.fn());
    store.publish(event);

    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith([type, event[1][type]]);
  });

  it('should not subscribe is missing event', () => {
    const consoleSpy = jest.spyOn(console, 'warn');

    const store = createStore();

    (store as any).subscribe('');
    expect(consoleSpy).toBeCalledTimes(1);

    (store as any).subscribe(undefined);
    expect(consoleSpy).toBeCalledTimes(2);

    (store as any).subscribe(null);
    expect(consoleSpy).toBeCalledTimes(3);

    (store as any).subscribe(0);
    expect(consoleSpy).toBeCalledTimes(4);

    (store as any).subscribe(true);
    expect(consoleSpy).toBeCalledTimes(5);

    (store as any).subscribe(false);
    expect(consoleSpy).toBeCalledTimes(6);
  });

  it('should broadcast state', () => {
    const preloadState = {
      test: 'my store',
    };
    const store = createStore(preloadState);
    jest.spyOn(store, 'broadcast');
    jest.spyOn(store, 'publish');

    store.subscribe('event1', jest.fn());
    store.subscribe('event2', jest.fn());
    store.subscribe('event3', jest.fn());

    const nextState = {
      test: 'next state',
    };
    store.broadcast(nextState);

    expect(store.publish).toBeCalledTimes(3);
    expect(store.eventNames()).toEqual(['event1', 'event2', 'event3']);
    expect(store.publish).toBeCalledWith(['event1', { test: 'next state' }]);
    expect(store.publish).toBeCalledWith(['event2', { test: 'next state' }]);
  });
});
