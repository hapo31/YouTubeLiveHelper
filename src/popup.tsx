import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import CardContainerComponent from "./container/Popup/CardContainer/CardContainer";
import GetStorage from "./domain/ChromeExtension/Storage";
import { OAuthInfo, setAuthInfo } from "./state/Auth";
import { createRootStore } from "./state/root";

(async () => {
  const store = await createRootStore();
  const oauthInfo = await GetStorage<OAuthInfo>("oauth_info");

  const target = document.getElementById("app");

  if (oauthInfo != null) {
    store.dispatch(
      setAuthInfo({
        accessToken: oauthInfo.access_token,
        expiresIn: new Date(oauthInfo.expires_in),
        refreshToken: oauthInfo.refresh_token,
        isAuthorized: true,
      })
    );
  }

  render(
    <Provider store={store}>
      <CardContainerComponent />
    </Provider>,
    target
  );
})();
