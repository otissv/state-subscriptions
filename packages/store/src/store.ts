import EventEmitter from 'events';

import { EventType } from './types.store';
import { deepMerge } from './utils/deepMerge';

import { ActionType, StateInterface } from './types.store';
import { getState } from './getState';
import { isEvent } from './utils/isEvent';
import { getActionUpdate } from './getActionUpdate';

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

  get<EventName extends EventType>(eventName: EventName): Partial<State> {
    // extract property state
    return isEvent(eventName)
      ? getState([eventName, Object.freeze({ ...this.state })])
      : {};
  }

  publish<EventName extends EventType>(
    ...events: [
      EventName,
      ActionType<State, State> | ActionType<State, State>[] | State,
    ][]
  ): this {
    //TODO: walk the event path and publish up the tree

    events.forEach(([eventName, actions]) => {
      if (!isEvent(eventName)) {
        console.error('Cannot publish without an event type');
        return this;
      } else {
        const update = getActionUpdate<State>(actions)(this.state);

        this.state = deepMerge(this.state)(update);

        //TODO: maybe see if state has changed before emitting
        this.emit(eventName, this.get(eventName));

        this.onPublish.forEach((fn) =>
          fn([eventName, Object.freeze({ ...this.state })]),
        );
        return this;
      }
    });
    return this;
  }

  subscribe(eventName: string, listener: (state: State) => void): this {
    console.log(eventName);
    if (!isEvent(eventName)) {
      console.warn('Cannot subscribe without an event type');
      return this;
    } else {
      this.on(eventName, (state) => {
        console.log('subscribe: ', state);

        listener(state);

        this.onSubscribe.forEach((fn) => fn([eventName, state]));
      });

      return this;
    }
  }

  broadcast<EventName extends EventType>(
    actions: State | ActionType<State, State>,
  ): this {
    this.eventNames().forEach((eventName) => {
      this.publish([eventName as EventName, actions]);
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
