import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";

import { createStore } from "./store";
import { StoreProvider } from "./StoreContext";
import { NotificationProiver } from "./components/Notifications/NotificationContenxt";

const initialState = {
  count: 0,
  order: {
    cup: {
      size: "small", // medium large
      madeOf: "styrofoam" // or you could be eating in and it be a proper cup
    },
    milk: {
      type: "almond",
      amount: "splash"
    },
    shots: 1,
    food: [0, 1, 2, 3, 4, 5]
  },
  users: []
};

const store = createStore(initialState);
const notifications = createStore({
  notify: []
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <StoreProvider store={store}>
      <NotificationProiver notifications={notifications}>
        <App />
      </NotificationProiver>
    </StoreProvider>
  </StrictMode>,
  rootElement
);
