import "./styles.css";

import React from "react";

import { Users } from "./components/Users";
import { Counter } from "./components/Counter";

export default function App() {
  return (
    <div>
      <Counter />
      <Users />
    </div>
  );
}
