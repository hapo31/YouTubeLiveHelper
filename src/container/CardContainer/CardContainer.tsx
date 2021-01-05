import React, { useCallback, useMemo } from "react";
import SuperChatCardList from "./SuperChatCardList";
import { useSelector, useDispatch } from "react-redux";
import {
  AddSuperchat,
  AppState,
  CheckedSuperchat,
} from "../../domain/AppState/AppState";

const videoIdParseRegExp = /https:\/\/studio\.youtube\.com\/video\/(\w+)\/livestreaming/;

export default () => {
  const appState = useAppState();
  const dispatch = useDispatch();
  const videoId = appState.showingVideoId;
  const onClickCardHandler = useCallback(
    (index: number) => {
      if (videoId) {
        dispatch(CheckedSuperchat(videoId, index));
      }
    },
    [videoId]
  );
  return (
    <>
      <SuperChatCardList
        onClickCard={onClickCardHandler}
        superChatList={
          videoId ? appState.streamings[videoId].superChatInfoList : []
        }
      />
    </>
  );
};

function useAppState() {
  return useSelector((appState: AppState) => appState);
}
