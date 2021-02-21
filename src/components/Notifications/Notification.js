import React from "react";

import { useSubscribe } from "../../hooks";
import { useNotificationSubscribe } from "../Notifications/NotificationContext";

export function Notifications() {
  const [notifications, setNotifications] = useNotifySubscription("notify");
  const [notifyId, setNotifyId] = React.useState(0);

  function handleOnAddClick() {
    setNotifications((state) => ({
      id: notifyId,
      message: `Item ${notifyId}`,
      duration: 1000,
    }));

    setNotifyId(notifyId + 1);
  }
  return (
    <div>
      <button onClick={handleOnAddClick}>Add Notification</button>
      {notifications.map(({ id, message }) => {
        return (
          <div
            key={id}
            style={{
              border: "1px solid #ccc",
              marginBottom: "5px",
              padding: "5px",
            }}
          >
            {message}
          </div>
        );
      })}
    </div>
  );
}

function useNotifySubscription(event) {
  const [notifications, setNotifications] = useNotificationSubscribe(
    event
  ).value();

  function dispatch(setState) {
    const notification = setState();

    setNotifications((state) => ({
      [event]: [...state.notify, setState],
    }));

    setTimeout(() => {
      setNotifications((state) => {
        return {
          [event]: () =>
            state.notify.filter(({ id }) => id !== notification.id),
        };
      });
    }, notification.duration || 5000);
  }

  return [notifications, dispatch];
}
