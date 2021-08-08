import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import PopupIndex from "./container/Popup/PopupIndex";
import { createRootStore } from "./state/root";

const store = createRootStore();
const target = document.getElementById("app");

render(
  <Provider store={store}>
    <PopupIndex />
  </Provider>,
  target
);
