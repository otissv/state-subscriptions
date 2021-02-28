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

  /**
   * Retrieves a value from the store.The `eventName` is the path to a state property.
   *
   * @param eventName - path to property in state
   */
  get<EventName extends EventType>(eventName: EventName): Partial<State> {
    // extract property state
    return isEvent(eventName)
      ? getState([eventName, Object.freeze({ ...this.state })])
      : {};
  }

  /**
   * Merges the nextState with the stores state and emits the new state to all subscribers of the event.
   *
   * @param event - An event is an array with 2 items, where the first item is the eventName and the second item is a function to transform the state in to the next state.
   */
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

  /**
   * Creates an event listener for a state property.
   * @param eventName - Path to a state property.
   * @param listener - Callback to receiving property value.
   */
  subscribe(eventName: string, listener: (state: State) => void): this {
    if (!isEvent(eventName)) {
      console.warn('Cannot subscribe without an event type');
      return this;
    } else {
      this.on(eventName, (state) => {
        listener(state);
        this.onSubscribe.forEach((fn) => fn([eventName, state]));
      });

      return this;
    }
  }

  broadcast<EventName extends EventType>(
    functions: State | ActionType<State, State>,
  ): this {
    this.eventNames().forEach((eventName) => {
      this.publish([eventName as EventName, functions]);
    });

    return this;
  }
}

/**
 * Create a new instance of a store.
 *
 * @param preloadState - An object containing state to be preloaded into the store
 * @param options - optional onPublish, onSubscribe
 */
export function createStore<State>(
  preloadState: Partial<State> = {},
  options: { onPublish?: Function[]; onSubscribe?: Function[] } = {
    onPublish: [],
    onSubscribe: [],
  },
): Store<State> {
  return new Store(preloadState, options);
}
