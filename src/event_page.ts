import { Message, START_OAUTH } from "./chrome/eventConsts";
import { getOAuth2URL } from "./domain/YTLHServer/YTLHAPI";

chrome.runtime.onMessage.addListener(async (message: Message, sender, res) => {
  switch (message.type) {
    case START_OAUTH: {
      const oauth2Url = await getOAuth2URL();
      window.open(oauth2Url, "_blank");
      res();
      return;
    }
  }
});
