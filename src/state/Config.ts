import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Config = {
  superChatAutoReloadMinutes: number;
};

const initialState: Config = {
  superChatAutoReloadMinutes: 10,
};

const slice = createSlice({
  name: "conifg",
  initialState,
  reducers: {
    SetConfig: <T extends Config[keyof Config]>(
      state: Record<keyof Config, T>,
      action: PayloadAction<{ key: keyof Config; value: T }>
    ) => {
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const { SetConfig } = slice.actions;

export default slice.reducer;
