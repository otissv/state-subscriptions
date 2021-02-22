import EventEmitter from 'events';

import { deepMerge } from '../utils/deepMerge';

import { EventType, StateInterface } from './types.store';
import { getState } from './getState';
import { isEvent } from '../utils/isEvent';

export class Store<State extends StateInterface> extends EventEmitter {
  state: Partial<State> = {};
  preloadState = {};
  onPublish: Function[] = [];
  onSubscribe: Function[] = [];

  constructor(
    preloadState: Partial<State> = {},
    {
      onPublish = [],
      onSubscribe = [],
    }: { onPublish?: Function[]; onSubscribe?: Function[] } = {
      onPublish: [],
      onSubscribe: [],
    },
  ) {
    super();
    this.state = preloadState;
    this.preloadState = preloadState;
    this.onPublish = onPublish;
    this.onSubscribe = onSubscribe;
  }

  get(event: EventType): Partial<State> {
    // extract property state
    return isEvent(event) ? getState([event, this.state]) : {};
  }

  publish([event, nextState = {}]: [EventType, Partial<State>]): this {
    //TODO: handle publishing multiple events
    //TODO: walk the event path and publish up the tree

    if (!isEvent(event)) {
      console.warn('Cannot publish without an event type');
      return this;
    } else {
      this.state = deepMerge(this.state)(nextState);

      //TODO: maybe see if state has changed before emitting

      this.emit(event, this.get(event));

      this.onPublish.forEach((fn) => fn([event, this.state]));
      return this;
    }
  }

  subscribe(event: string, listener: (state: State) => void): this {
    if (!isEvent(event)) {
      console.warn('Cannot subscribe without an event type');
      return this;
    } else {
      this.on(event, (state) => {
        listener(state);
        this.onSubscribe.forEach((fn) => fn([event, state]));
      });

      return this;
    }
  }

  broadcast(nextState: Partial<State> = {}): this {
    this.eventNames().forEach((event) => {
      this.publish([event as EventType, nextState]);
    });

    return this;
  }
}

export function createStore<State>(
  preloadState: Partial<State> = {},
  options: { onPublish?: Function[]; onSubscribe?: Function[] } = {
    onPublish: [],
    onSubscribe: [],
  },
): Store<State> {
  return new Store(preloadState, options);
}
