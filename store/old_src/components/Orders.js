import React from "react";

import { updateOrderSetter } from "../stateSetters";
import { useStoreSubscribe } from "../StoreContext";

export function Orders() {
  const [order, setOrder] = useStoreSubscribe("order").value();
  const setCup = useStoreSubscribe("order.cup").value()[1];

  function onUpdateOrder() {
    setOrder(
      updateOrderSetter({
        milk: null,
      })
    );
  }

  function onUpdateCup(event) {
    setCup((_state) => ({
      //TODO: should not update cup
      count: 999,
      order: {
        cup: {
          size: 1,
        },
      },
    }));
  }
  return (
    <div>
      <h2>Orders</h2>

      <button onClick={onUpdateCup}>Update cup</button>
      <button onClick={onUpdateOrder}>Update Order</button>
      <pre>{JSON.stringify(order, null, 2)}</pre>
    </div>
  );
}