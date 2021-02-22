import React from "react";

import { useSubscribe } from "./hooks";

export const StoreContext = React.createContext({});

export function useStore() {
  return React.useContext(StoreContext);
}

export function useStoreSubscribe(event) {
  return useSubscribe(useStore(), event);
}

export function StoreProvider({ children, store = {} }) {
  const value = React.useRef(store);
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}
