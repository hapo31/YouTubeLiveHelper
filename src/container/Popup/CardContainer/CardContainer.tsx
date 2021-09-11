import { useCallback } from "react";
import SuperChatCardList from "./SuperChatCardList";
import { useSelector, useDispatch } from "react-redux";
import { AddSuperchat, CheckedSuperchat } from "../../../state/AppState";
import { RootState } from "../../../state/root";

const videoIdParseRegExp =
  /https:\/\/studio\.youtube\.com\/video\/(\w+)\/livestreaming/;

const CardContainer = () => {
  const appState = useAppState();
  const dispatch = useDispatch();

  return (
    <SuperChatCardList
      onClickCard={(index: number) => {
        dispatch(CheckedSuperchat({ index }));
      }}
      superChatList={appState.superChatList}
    />
  );
};

export default CardContainer;

function useAppState() {
  return useSelector((rootState: RootState) => rootState.app);
}
