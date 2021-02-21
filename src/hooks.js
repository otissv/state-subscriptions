import React from "react";

import { pipe } from "./utils/pipe";
import { useStore } from "./StoreContext";

export function publish(store, ...events) {
  events.forEach(({ type, actions }) => {
    const fns = Array.isArray(actions) ? actions : [actions];
    //TODO: restrict state to type
    const nextState = pipe(...fns)(store.state);
    store.publish([type, nextState]);
  });
}

export function useSubscribe(event) {
  const store = useStore().current;

  const [forceUpdate, setForceUpdate] = React.useState(false);

  React.useEffect(() => {
    // Add event listener
    const updateState = () => setForceUpdate(!forceUpdate);
    store.on(event, updateState);

    return () => {
      // remove event listeners.
      // stop multiple listers from being created.
      store.listeners(event).forEach(() => {
        store.removeListener(event, updateState);
      });
    };
  }, [store, event, forceUpdate, setForceUpdate]);

  function dispatch(...fns) {
    publish(store, {
      type: event,
      actions: fns
    });
  }

  const state = [store.get(event), dispatch];

  return {
    transform: (...fns) => ({
      value: () => [
        fns.reduce((previousValue, fn) => fn(previousValue), state[0]),
        dispatch
      ]
    }),
    value: () => state
  };
}

export function usePublish(...events) {
  const store = useStore().current;
  return publish(store, ...events);
}

export function useBroadcast(...fns) {
  const store = useStore().current;

  const nextState = pipe(...fns)(store.state);
  store.broadcast(nextState);
}
