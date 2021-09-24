import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import superChatColorTable from "../domain/SuperChat/superchatColorTable";
import {
  AuthInfo,
  fetchSuperChatEvents as fetchSuperChatEventsAPI,
} from "../domain/Youtube/YoutubeAPI";

type SuperChatColorInfo = {
  primary: string;
  secondary: string;
  text: string;
  message: string;
};

export type ChatInfo = {
  message: string;
  author: string;
};

export type SuperChatInfo = {
  id: string;
  videoId: string;
  imgUrl: string;
  purches: string;
  author: string;
  message: string;
  superChatColorInfo: SuperChatColorInfo;
  createdAt: string;
  checked: boolean;
};

export type LiveStreamingInfo = {
  videoId: string;
  superChatInfoList: SuperChatInfo[];
};

export type AppState = {
  showingVideoId: string;
  superChatList: SuperChatInfo[];
  fetchSuperchatError: Error | null;
  isLoadingSuperchatEvents: boolean;
};

const initialState: AppState = {
  fetchSuperchatError: null,
  isLoadingSuperchatEvents: false,
  showingVideoId: "test",
  superChatList: [],
};

export const loadSuperchatFromStorage = createAsyncThunk(
  "app/loadSuperchatFromStorage",
  () => {
    return new Promise<{ result: SuperChatInfo[] }>((res) => {
      chrome.storage.local.get("super_chat", (result) => {
        res({ result: JSON.parse(result["super_chat"]) });
      });
    });
  }
);

export const fetchSuperChatEvents = createAsyncThunk(
  "app/fetchSuperChatEvents",
  async (authInfo: AuthInfo, thunkAPI) => {
    thunkAPI.dispatch(StartFetchSuperchat());
    const result = await fetchSuperChatEventsAPI(
      authInfo,
      process.env.NODE_ENV !== "production"
    );
    thunkAPI.dispatch(FinishedFetchSuperchat());
    return { result };
  }
);

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    StartFetchSuperchat: (state) => {
      state.isLoadingSuperchatEvents = true;
    },
    FinishedFetchSuperchat: (state) => {
      state.isLoadingSuperchatEvents = false;
    },
    ResolvedError: (state) => {
      state.fetchSuperchatError = null;
    },
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
        superChat: SuperChatInfo;
      }>
    ) => {
      const {
        payload: { superChat },
      } = action;
      state.superChatList.push(superChat);
      chrome.storage.local.set({ super_chat: state.superChatList });
    },
    CheckedSuperchat: (
      state,
      action: PayloadAction<{
        index: number;
      }>
    ) => {
      const {
        payload: { index },
      } = action;
      state.superChatList[index].checked = true;

      chrome.storage.local.set({
        super_chat: JSON.stringify(state.superChatList),
      });
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchSuperChatEvents.fulfilled, (state, action) => {
      const { result } = action.payload;
      state.superChatList.push(
        ...result
          .filter((item) => !state.superChatList.some((s) => s.id === item.id)) // 重複は取り除く(このやり方は重そう)
          .map((result) => {
            const [primaryColor, secondaryColor, authorColor] =
              superChatColorTable(result.snippet.messageType);
            return {
              id: result.id,
              author: result.snippet.supporterDetails.displayName,
              checked: false,
              imgUrl: result.snippet.supporterDetails.profileImageUrl,
              message: result.snippet.commentText,
              purches: result.snippet.displayString,
              createdAt: result.snippet.createdAt,
              videoId: "", // 日時から特定できそうだけど面倒ね
              superChatColorInfo: {
                text: authorColor,
                primary: primaryColor,
                secondary: secondaryColor,
                message: authorColor,
              },
            };
          })
      );
      state.isLoadingSuperchatEvents = false;
    });

    builder.addCase(fetchSuperChatEvents.rejected, (state, action) => {
      state.fetchSuperchatError = action.error as Error;
      state.isLoadingSuperchatEvents = false;
    });

    builder.addCase(loadSuperchatFromStorage.fulfilled, (state, action) => {
      state.superChatList = action.payload.result;
    });
  },
});

const { StartFetchSuperchat, FinishedFetchSuperchat } = slice.actions;

export const {
  AddSuperchat,
  CheckedSuperchat,
  SetShowingVideoId,
  ResolvedError,
} = slice.actions;
export default slice.reducer;
