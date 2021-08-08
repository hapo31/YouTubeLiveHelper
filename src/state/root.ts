import { Reducer } from "react";
import { useSelector } from "react-redux";
import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from "redux";
import thunk from "redux-thunk";

import appReducer, { AppState } from "./AppState";
import authReducer from "./Auth";

const rootReducer = combineReducers({
  app: appReducer as unknown as Reducer<AppState, AnyAction>,
  auth: authReducer,
});

export const createRootStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
};

export type RootState = ReturnType<typeof rootReducer>;

export const useRootState = <T>(selector: (state: RootState) => T) => {
  const state = useSelector(selector);

  return state;
};
