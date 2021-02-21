import React from "react";

import { pipe } from "./utils/pipe";
import { useStore } from "./StoreContext";

export function publish(store, ...events) {
  events.forEach(({ type, actions }) => {
    const fns = Array.isArray(actions) ? actions : [actions];

    const nextState = pipe(...fns)(store.state);

    store.publish([
      type,
      {
        [type.split(".")[0]]: store.get(type.split(".")[0], nextState)
      }
    ]);
  });
}

export function useBroadcast(...fns) {
  const store = useStore().current;

  const nextState = pipe(...fns)(store.state);
  store.broadcast(nextState);
}

export function useFetchEffect({ url, ...options }, cb) {
  React.useEffect(() => {
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => cb(() => Promise.resolve(data)))
      .catch((error) => Promise.reject(error));
  }, []);
}

export function usePublish(...events) {
  const store = useStore().current;
  return publish(store, ...events);
}

export function useSubscribe(storeRef = {}, event) {
  const store = storeRef.current;

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
