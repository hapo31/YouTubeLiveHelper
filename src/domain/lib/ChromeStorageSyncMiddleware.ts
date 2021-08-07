import {
  Action,
  applyMiddleware,
  compose,
  createStore,
  Middleware,
  Reducer,
} from "redux";

function ChromeStorageMiddleware(): Middleware {
  return (store) => (next) => (action: Action) => {
    chrome.runtime.sendMessage(action);
    console.log(action);
    next(action);
    const state = store.getState();
    chrome.storage.local.set({ AppState: state });
  };
}

export default function createChromeStorageSyncStore<State>(
  reducer: Reducer<State, any>
) {
  const composed = compose(applyMiddleware(ChromeStorageMiddleware()))(
    createStore
  );
  const store = composed(reducer);
  chrome.runtime.onMessage.addListener((action: Action) => {
    store.dispatch(action);
  });

  return store;
}
