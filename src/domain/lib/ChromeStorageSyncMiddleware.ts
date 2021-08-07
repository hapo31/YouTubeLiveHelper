import {
  Action,
  applyMiddleware,
  compose,
  createStore,
  Middleware,
  PreloadedState,
  Reducer,
} from "redux";
import GetStorage from "../ChromeExtension/Storage";

function ChromeStorageMiddleware(): Middleware {
  return (store) => (next) => (action: Action) => {
    chrome.runtime.sendMessage(action);
    console.log(action);
    next(action);
    const state = store.getState();
    chrome.storage.local.set({ state });
  };
}

export default async function createChromeStorageSyncStore<State>(
  reducer: Reducer<State, any>
) {
  const composed = compose(applyMiddleware(ChromeStorageMiddleware()))(
    createStore
  );

  const initialState = await GetStorage<State>("state");

  const store = composed(reducer, initialState as PreloadedState<State>);
  chrome.runtime.onMessage.addListener((action: Action) => {
    store.dispatch(action);
  });

  return store;
}
