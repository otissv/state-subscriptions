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

  get(event, state) {
    // extract state
    return event.split(".").reduce((o, i) => o[i], state || this.state);
  }

  publish([event, nextState]) {
    //TODO: handle publishing multiple events
    //TODO: walk the event path and publish up the tree

    this.state = deepMerge(this.state)(nextState);

    //TODO: maybe see if state has changed before emitting
    this.emit(event, this.get(event));
  }

  // TODO: subscribe() {}

  broadcast(nextState) {
    this.state = deepMerge(this.state)(nextState);
    this.eventNames().forEach((event) => {
      this.emit(event, this.get(event));
    });
  }
}

export function createStore(initialState) {
  return new Store(initialState);
}
