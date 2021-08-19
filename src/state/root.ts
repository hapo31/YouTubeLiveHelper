import { Reducer } from "react";
import { useSelector } from "react-redux";
import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  createStore,
} from "redux";
import thunk from "redux-thunk";

import appReducer from "./AppState";
import authReducer from "./Auth";
import logReducer from "./Log";

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  log: logReducer,
});

export const createRootStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
};

export type RootState = ReturnType<typeof rootReducer>;

export const useRootState = <T>(selector: (state: RootState) => T) => {
  const state = useSelector(selector);

  return state;
};
