import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import CardContainerComponent from "./container/CardContainer/CardContainer";
import createAppReducer, { AppState } from "./domain/AppState/AppState";
import { createStore } from "redux";
import GetStorage from "./domain/ChromeExtension/Storage";

(async () => {
  const initialState = await GetStorage<AppState>("AppState");
  console.log({ initialState });
  const reducer = createAppReducer(
    initialState ?? {
      showingVideoId: "",
      streamings: {},
    }
  );
  const store = createStore(reducer);

  const target = document.getElementById("app");
  render(
    <Provider store={store}>
      <CardContainerComponent />
    </Provider>,
    target
  );
})();
