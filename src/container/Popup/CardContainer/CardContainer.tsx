import React, { useCallback, useMemo } from "react";
import SuperChatCardList from "./SuperChatCardList";
import { useSelector, useDispatch } from "react-redux";
import { AddSuperchat, AppState, CheckedSuperchat } from "../../../state/AppState";
import { RootState } from "../../../state/root";

const videoIdParseRegExp =
  /https:\/\/studio\.youtube\.com\/video\/(\w+)\/livestreaming/;

const CardContainer = () => {
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
      <button onClick={() => {
        dispatch(AddSuperchat("test", {
          author: "test",
          authorRaw: "testtest",
          checked: false,
          imgUrl: "",
          message: "hogeee",
          messageRaw: "heoea",
          purches: "200",
          superChatColorInfo: {
            authorName: "hoge",
            header: "hhhh",
            message: "123131",
            primary: "#aaa",
            secondary: "#690",
            timestamp: "11415"
          }
        }));
      }}>test</button>
      <SuperChatCardList
        onClickCard={onClickCardHandler}
        superChatList={
          videoId ? appState.streamings[videoId]?.superChatInfoList ?? [] : []
        }
      />
    </>
  );
};

export default CardContainer;

function useAppState() {
  return useSelector((rootState: RootState) => rootState.app);
}
