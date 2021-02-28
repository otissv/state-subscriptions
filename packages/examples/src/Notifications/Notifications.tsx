import React from 'react'

import { useStore } from '@state-subscriptions/react'
import { useSubscribe } from '@state-subscriptions/react/useSubscribe/useSubscribe'
import { Store as StoreInterface } from '@state-subscriptions/store/store'

interface Notification {
  readonly id: number
  readonly message: string
  readonly duration?: number
}

interface State {
  readonly notifications: readonly Notification[]
}

type Store = StoreInterface<State>

export function Notifications(): JSX.Element {
  const useStoreSubscribe = useSubscribe<Store>(useStore())
  const [notifications, setNotifications] = useStoreSubscribe<
    string,
    State['notifications']
  >('notifications').value()

  const [notifyId, setNotifyId] = React.useState(0)

  function handleOnAddClick() {
    const notification = {
      id: notifyId,
      message: `Item ${notifyId}`,
      duration: 1000,
    }

    setNotifications([
      (state: State) => {
        return {
          notifications: () => [...state.notifications, notification],
        }
      },
    ])

    setTimeout(() => {
      setNotifications([
        (state: any) => {
          return {
            notifications: () =>
              state.notifications.filter(
                ({ id }: { id: number }) => id !== notifyId
              ),
          }
        },
      ])
    }, notification.duration || 5000)

    setNotifyId(notifyId + 1)
  }
  return (
    <div>
      <button onClick={handleOnAddClick}>Add Notification</button>
      {notifications.map(({ id, message }) => {
        return (
          <div
            key={id}
            style={{
              border: '1px solid #ccc',
              marginBottom: '5px',
              padding: '5px',
            }}
          >
            {message}
          </div>
        )
      })}
    </div>
  )
}
