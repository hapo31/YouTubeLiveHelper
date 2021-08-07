export default function GetStorage<StoreType>(
  key: string
): Promise<StoreType | undefined> {
  return new Promise((res) => {
    chrome.storage.local.get((items) => {
      res(items[key] as StoreType);
    });
  });
}
