import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthInfo: (state, action: PayloadAction<AuthState>) => {
      state = action.payload;
    },
  },
});

export const { setAuthInfo } = slice.actions;

export default slice.reducer;
