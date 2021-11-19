import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import GetStorage from "../domain/ChromeExtension/Storage";

export type Config = {
  superChatAutoReloadMinutes: number;
  superChatSortType: "date" | "amount";
  superChatSortDir: "asc" | "desc";
};

const initialState: Config = {
  superChatAutoReloadMinutes: 10,
  superChatSortType: "date",
  superChatSortDir: "asc",
};

export const loadConfig = createAsyncThunk("config/loadConfig", async () => {
  const config = await GetStorage<Config>("config");
  if (!config) {
    return initialState;
  } else {
    return config;
  }
});

const slice = createSlice({
  name: "config",
  initialState,
  reducers: {
    SetConfig: <K extends keyof Config, T extends Config[K]>(
      state: Record<K, T>,
      action: PayloadAction<{ key: K; value: T }>
    ) => {
      state[action.payload.key] = action.payload.value;
      chrome.storage.local.set({
        config: state,
      });
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loadConfig.fulfilled, (state, action) => {
      const { payload } = action;
      state.superChatAutoReloadMinutes = payload.superChatAutoReloadMinutes;
      state.superChatSortType = payload.superChatSortType;
      state.superChatSortDir = payload.superChatSortDir;
    });
  },
});

export const { SetConfig } = slice.actions;

export default slice.reducer;
