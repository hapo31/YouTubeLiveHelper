import { OAuthInfo } from "./state/Auth";

import datefns from "date-fns";

declare let oauth_info: OAuthInfo;

document.addEventListener("DOMContentLoaded", () => {
  const expireDate = datefns.add(new Date(), {
    seconds: oauth_info.expires_in,
  });

  chrome.storage.local.set({
    oauth_info: {
      ...oauth_info,
      expires_in: expireDate.getTime(),
    },
  });
});
