import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import GetStorage from "../domain/ChromeExtension/Storage";

export type OAuthInfo = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

export type AuthState = {
  isAuthorized: boolean;
  accessToken: string;
  refreshToken: string;
  expiresIn: Date;
};

const initialState: AuthState = {
  isAuthorized: false,
  accessToken: "",
  refreshToken: "",
  expiresIn: new Date("1970-01-01"),
};

export const getAuthInfoAsync = createAsyncThunk<OAuthInfo | undefined>(
  "auth/getAuthInfo",
  async () => {
    const oauthInfo = GetStorage<OAuthInfo>("oauth_info");
    return oauthInfo;
  }
);

export const setAuthInfoAsync = createAsyncThunk<OAuthInfo, OAuthInfo>(
  "auth/setAuthInfo",
  async (args) => {
    await chrome.storage.local.set({
      oauth_info: args,
    });
    return args;
  }
);

export const resetAuthAsync = createAsyncThunk("auth/resetAuth", async () => {
  await chrome.storage.local.set({
    oauth_info: null,
  });
});

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthInfo: (state, action: PayloadAction<AuthState>) => {
      state = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAuthInfoAsync.fulfilled, (state, action) => {
      const { payload } = action;
      if (!payload) {
        state.isAuthorized = false;
        return;
      }
      state.accessToken = payload.access_token;
      state.expiresIn = new Date(payload.expires_in);
      state.refreshToken = payload.refresh_token;
      state.isAuthorized =
        state.accessToken != null && state.refreshToken != null;
    });
    builder.addCase(setAuthInfoAsync.fulfilled, (state, action) => {
      const { payload } = action;
      if (!payload) {
        state.isAuthorized = false;
        return;
      }
      state.accessToken = payload.access_token;
      state.expiresIn = new Date(payload.expires_in);
      state.refreshToken = payload.refresh_token;
      state.isAuthorized =
        state.accessToken != null && state.refreshToken != null;
    });
    builder.addCase(resetAuthAsync.fulfilled, (state, action) => {
      state.isAuthorized = false;
    });
  },
});

export const { setAuthInfo } = slice.actions;

export default slice.reducer;
