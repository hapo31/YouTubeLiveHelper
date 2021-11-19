import { SuperChatInfo } from "../../state/AppState";

export default function GetStorage<StoreType>(
  key: string
): Promise<StoreType | undefined> {
  return new Promise((res) => {
    chrome.storage.local.get((items) => {
      res(items[key] as StoreType);
    });
  });
}

export function addSuperChat(superChatInfo: SuperChatInfo) {
  chrome.storage.local.get("super_chat", (result) => {
    let list = JSON.parse(result["super_chat"]) as SuperChatInfo[] | null;
    if (!list) {
      list = [];
    }

    list.push(superChatInfo);

    chrome.storage.local.set({ super_chat: list });
  });
}
