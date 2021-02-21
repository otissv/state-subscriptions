import React from "react";

import { useSubscribe } from "../../hooks";
import { useNotitications } from "../Notifications/NotificationContenxt";

export function Notifications() {
  const [notifcations, setNotifcations] = useSubscribe(
    useNotitications(),
    "notify"
  ).value();
  console.log(notifcations);

  function handleOnAddClick() {
    setNotifcations((state) => ({
      notify: [
        ...state.notify,
        {
          id: notifcations.length,
          message: `Item ${notifcations.length}`,
          duration: 2000
        }
      ]
    }));
  }

  return (
    <div>
      <button onClick={handleOnAddClick}>Add Notification</button>
    </div>
  );
}
