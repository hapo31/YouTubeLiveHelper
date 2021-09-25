import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import appReducer from "./AppState";
import authReducer from "./Auth";
import logReducer from "./Log";
import configReducer from "./Config";

const reducer = {
  app: appReducer,
  auth: authReducer,
  log: logReducer,
  config: configReducer,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

const { getState } = store;

export type RootState = ReturnType<typeof getState>;

export const useRootState = <T>(selector: (state: RootState) => T) => {
  const state = useSelector(selector);

  return state;
};

export default store;
