import "./styles.css";

import React from "react";

import { Users } from "./components/Users";
import { Counter } from "./components/Counter";
import { Orders } from "./components/Orders";

export default function App() {
  return (
    <div>
      <Counter />
      <Orders />
      <Users />
    </div>
  );
}
