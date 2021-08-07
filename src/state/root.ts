import { Reducer } from "react";
import { useSelector } from "react-redux";
import { AnyAction, combineReducers } from "redux";
import createChromeStorageSyncStore from "../domain/lib/ChromeStorageSyncMiddleware";

import appReducer, { AppState } from "./AppState";
import authReducer from "./Auth";

const rootReducer = combineReducers({
  app: appReducer as unknown as Reducer<AppState, AnyAction>,
  auth: authReducer,
});

export const createRootStore = () => createChromeStorageSyncStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export const useState = <T>(selector: (state: RootState) => T) => {
  const state = useSelector(selector);

  return state;
};
