import { render } from "react-dom";
import { Provider } from "react-redux";
import PopupIndex from "./container/Popup/PopupIndex";
import store from "./state/root";

const target = document.getElementById("app");

render(
  <Provider store={store}>
    <PopupIndex />
  </Provider>,
  target
);
