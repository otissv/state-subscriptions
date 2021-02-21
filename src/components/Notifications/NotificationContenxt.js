import React from "react";

export const NotificationContenxt = React.createContext({
  notify: []
});

export function useNotitications() {
  return React.useContext(NotificationContenxt);
}

export function NotificationProiver({ children, notifications }) {
  const value = React.useRef(notifications);

  return (
    <NotificationContenxt.Provider value={value}>
      {children}
    </NotificationContenxt.Provider>
  );
}
