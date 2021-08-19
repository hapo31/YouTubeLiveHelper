import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SuperChatColorInfo = {
  primary: string;
  secondary: string;
  header: string;
  authorName: string;
  timestamp: string;
  message: string;
};

export type ChatInfo = {
  message: string;
  author: string;
};

export type SuperChatInfo = {
  imgUrl: string;
  purches: string;
  author: string;
  message: string;
  superChatColorInfo: SuperChatColorInfo;
  authorRaw: string;
  messageRaw: string;
  checked: boolean;
};

export type LiveStreamingInfo = {
  videoId: string;
  superChatInfoList: SuperChatInfo[];
};

export type AppState = {
  showingVideoId: string;
  streamings: Record<string, LiveStreamingInfo>;
};

const initialState: AppState = {
  showingVideoId: "test",
  streamings: {},
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    SetShowingVideoId: (
      state,
      action: PayloadAction<{
        videoId: string;
      }>
    ) => {
      state.showingVideoId = action.payload.videoId;
    },
    AddSuperchat: (
      state,
      action: PayloadAction<{
        videoId: string;
        superChat: SuperChatInfo;
      }>
    ) => {
      const {
        payload: { superChat, videoId },
      } = action;
      if (state.streamings[videoId] == null) {
        state.streamings[videoId] = {
          videoId,
          superChatInfoList: [superChat],
        };
      } else {
        state.streamings[videoId].superChatInfoList.push(superChat);
      }
    },
    CheckedSuperchat: (
      state,
      action: PayloadAction<{
        videoId: string;
        index: number;
      }>
    ) => {
      const {
        payload: { videoId, index },
      } = action;
      state.streamings[videoId].superChatInfoList[index].checked = true;
      state.streamings[videoId].superChatInfoList = [
        ...state.streamings[videoId].superChatInfoList,
      ];
    },
  },
});

export const { AddSuperchat, CheckedSuperchat, SetShowingVideoId } =
  slice.actions;
export default slice.reducer;
