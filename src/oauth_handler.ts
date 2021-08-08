import { OAuthInfo } from "./state/Auth";

import add from "date-fns/add";

(async () => {
  const str = document.getElementById("credentials")?.textContent;
  if (!str) {
    console.log("invalid credentials");
    document.body.innerHTML =
      "<h3>認証情報のパースに失敗しました。もう一度ログインし直してみてください。</h3>";
    return;
  }
  const oauth_info: OAuthInfo = JSON.parse(str);
  if (
    !("access_token" in oauth_info) ||
    !("expires_in" in oauth_info) ||
    !("refresh_token" in oauth_info)
  ) {
    console.log("oauth2 failed.");
    document.body.innerHTML =
      "<h3>認証情報の取得に失敗しました。もう一度ログインし直してみてください。</h3>";
    return;
  }

  const expireDate = add(new Date(), {
    seconds: oauth_info.expires_in,
  });

  await chrome.storage.local.set({
    oauth_info: {
      ...oauth_info,
      expires_in: expireDate.getTime(),
    },
  });
  console.log("credentials saved.");
  document.body.innerHTML = "<h3>認証情報を取得しました。</h3>";
})();
