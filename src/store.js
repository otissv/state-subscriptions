import EventEmitter from "events";

import { deepMerge } from "./utils/deepMerge";

class Store extends EventEmitter {
  state = {};
  initialState = {};

  constructor(initialState = {}) {
    super();
    this.state = initialState;
    this.initialState = initialState;
  }

  get(event) {
    // extract state
    return event.split(".").reduce((o, i) => o[i], this.state);
  }

  publish([event, nextState]) {
    //TODO: handle publishing multiple events
    //TODO: want the event path and publish up the tree

    this.state = deepMerge(this.state)(nextState);

    //TODO: maybe see if state has changed before emitting
    this.emit(
      event,
      event.split(".").reduce((o, i) => o[i], this.state)
    );
  }

  // TODO: subscribe() {}

  broadcast(nextState) {
    this.state = deepMerge(this.state)(nextState);
    this.eventNames().forEach((event) => {
      this.emit(
        event,
        event.split(".").reduce((o, i) => o[i], this.state)
      );
    });
  }
}

export function createStore(initialState) {
  return new Store(initialState);
}
