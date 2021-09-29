import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

const slice = createSlice({
  name: "conifg",
  initialState,
  reducers: {
    SetConfig: <K extends keyof Config, T extends Config[K]>(
      state: Record<K, T>,
      action: PayloadAction<{ key: K; value: T }>
    ) => {
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const { SetConfig } = slice.actions;

export default slice.reducer;
