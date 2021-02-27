import React from "react";

import { useSubscribe } from "../../hooks";

export const NotificationContext = React.createContext({
  notify: [],
});

export function useNotifications(event) {
  return React.useContext(NotificationContext);
}

export function useNotificationSubscribe(event) {
  return useSubscribe(useNotifications(), event);
}

export function NotificationProvider({ children, notifications }) {
  const value = React.useRef(notifications);

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}
