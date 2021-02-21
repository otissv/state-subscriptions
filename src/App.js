import "./styles.css";

import React from "react";

import { useSubscribe } from "./hooks";
import {
  incrementSetter,
  decrementSetter,
  addSetter,
  add3Setter,
  updateOrderSetter
} from "./stateSetters";

export default function App() {
  return <Counter />;
}

function Counter() {
  const [countA, setCountA] = useSubscribe("count")
    .transform(
      (s) => s + 15,
      (s) => s - 5
    )
    .value();
  const [countB, setCountB] = useSubscribe("count").value();
  const [order, setOrder] = useSubscribe("order").value();
  const setCup = useSubscribe("order.cup").value()[1];

  function onIncrementClick() {
    setCountA(incrementSetter);
  }

  function onDecrementClick() {
    setCountA(decrementSetter);
  }

  function onAdd2() {
    setCountB(addSetter(2));
  }

  function onAdd3() {
    setCountB(add3Setter);
  }

  function onAdd6() {
    setCountB(add3Setter, incrementSetter, addSetter(2));
  }

  function onUpdateOrder() {
    setOrder(
      updateOrderSetter({
        milk: null
      })
    );
  }

  function onUpdateCup(event) {
    setCup((_state) => ({
      //TODO: should not update cup
      count: 999,
      order: {
        cup: {
          size: 1
        }
      }
    }));
  }

  return (
    <div>
      <div>
        <button onClick={onDecrementClick}>-</button>
        <button onClick={onIncrementClick}>+</button>
        <button onClick={onAdd2}>add2</button>
        <button onClick={onAdd3}>add3</button>
        <button onClick={onAdd6}>add6</button>
        <br />
        Count A: {countA}
        <br />
        Count B: {countB}
        <br />
      </div>
      <button onClick={onUpdateCup}>Update cup</button>
      <button onClick={onUpdateOrder}>Update Order</button>
      Order: <pre>{JSON.stringify(order, null, 2)}</pre>
    </div>
  );
}
