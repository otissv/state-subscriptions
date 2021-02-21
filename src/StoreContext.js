import React from "react";

export const StoreContext = React.createContext({});

export function useStore() {
  return React.useContext(StoreContext);
}

export function StoreProvider({ children, store = {} }) {
  const value = React.useRef(store);
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}
