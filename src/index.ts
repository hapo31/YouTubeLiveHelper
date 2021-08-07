import attachChatBox from "./domain/SuperChat/attachChatBox";
import {
  AppState,
  ChatInfo,
  SetShowingVideoId,
  SuperChatInfo,
} from "./domain/AppState/AppState";
import { AddSuperchat } from "./domain/AppState/AppState";
import createAppReducer from "./domain/AppState/AppState";
import GetStorage from "./domain/ChromeExtension/Storage";
import createChromeStorageSyncStore from "./domain/lib/ChromeStorageSyncMiddleware";

const videoIdParseRegExp =
  /https:\/\/studio\.youtube\.com\/video\/(\w+)\/livestreaming/;

(async () => {
  console.log("Enable YTLHC");

  const initialState = await GetStorage<AppState>("AppState");
  console.log({ initialState });
  const reducer = createAppReducer(
    initialState ?? {
      showingVideoId: "",
      streamings: {},
    }
  );
  const store = createChromeStorageSyncStore<AppState>(reducer);

  const btn = document.createElement("button");
  btn.onclick = () => {
    const appState = store.getState();
    store.dispatch(
      AddSuperchat(appState.showingVideoId, {
        author: "テスト太郎",
        authorRaw: `<div id="author-name" class="style-scope yt-live-chat-paid-message-renderer">テスト太郎</div>`,
        message: "テスト太郎のメッセージです",
        messageRaw: `<div id="message" dir="auto" class="style-scope yt-live-chat-paid-message-renderer">テスト太郎のテストメッセージです<img class="emoji style-scope yt-live-chat-text-message-renderer" src="https://yt3.ggpht.com/atsy74xfRqDFS5NWvN_nJgvaAxAPmPnRQptCnMyRv_zopiocAmnXRH-ZLiw0P7QvsAHFc0c71A=w48-h48-c-k-nd" alt=":_aquaNEKO:" data-emoji-id="UC1opHUrw8rvnsadT-iGp7Cg/_GugXrySBJCQ_APTkKqIBg" shared-tooltip-text=":_aquaNEKO:" id="emoji-413"> </div>`,
        imgUrl:
          "https://yt3.ggpht.com/-rqF0Mu8H3k4/AAAAAAAAAAI/AAAAAAAAAAA/hpayIf9ySG4/s32-c-k-no-mo-rj-c0xffffff/photo.jpg",
        checked: false,
        purches: `＄1,000,000,000,000`,
        superChatColorInfo: {
          authorName: "rgb(0, 0, 0)",
          header: "rgb(255,255,0)",
          message: "rgb(0,0,0)",
          primary: "rgb(255, 0, 0)",
          secondary: "rgb(255, 255,0)",
          timestamp: "rgb(0, 0, 255)",
        },
      })
    );
  };
  btn.innerText = "hoge";
  btn.style.position = "fixed";
  btn.style.height = "100%";
  btn.style.top = "0";
  document.body.appendChild(btn);

  function chatHookInit() {
    try {
      const result = videoIdParseRegExp.exec(location.href);
      if (result) {
        store.dispatch(SetShowingVideoId(result[1]));
      }
      attachChatBox((element: HTMLElement) => {
        const state = store.getState();
        if (element.localName !== "yt-live-chat-paid-message-renderer") {
          return;
        }
        const superChatInfo = parseSuperChatElement(element);
        const result = videoIdParseRegExp.exec(location.href);
        if (result) {
          const videoId = result[1];
          store.dispatch(AddSuperchat(videoId, superChatInfo));
        }
      });
    } catch (e) {
      setTimeout(chatHookInit, 1000);
    }
  }

  chatHookInit();
})();

function parseChatElement(element: HTMLElement): ChatInfo {
  const authorElement = element.querySelector("#author-name");
  const messageElement = element.querySelector("#message");

  const author = authorElement?.textContent || "";
  const message = messageElement?.textContent || "";

  return { author, message };
}

function parseSuperChatElement(element: HTMLElement): SuperChatInfo {
  const img = element.querySelector("#img") as HTMLImageElement;
  const author = element.querySelector("#author-name");
  const purchase = element.querySelector("#purchase-amount-column");
  const message = element.querySelector("#message");

  const matchResults = element
    .getAttribute("style")
    ?.match(/(rgba\(\d+,\d+,\d+,\d\.?\d*\))/g);

  if (!matchResults) {
    throw purchase;
  }

  return {
    imgUrl: img.src,
    author: author?.textContent || "",
    message: message?.textContent || "",
    authorRaw: author?.innerHTML || "",
    messageRaw: message?.innerHTML || "",
    purches: purchase?.textContent || "",
    superChatColorInfo: {
      primary: matchResults[0],
      secondary: matchResults[1],
      header: matchResults[2],
      authorName: matchResults[3],
      timestamp: matchResults[4],
      message: matchResults[5],
    },
    checked: false,
  };
}
