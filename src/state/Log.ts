import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum LogLevel {
  ERROR,
  WARN,
  INFO,
  DEBUG
}

type Log = {
  message: string;
  createdAt: number;
  logLevel: LogLevel;
}

export type LogState = {
  logs: Log[];
};

const initialState: LogState = {
  logs: []
}

const slice = createSlice({
  name: "log",
  initialState,
  reducers: {
    addLog: (state, action: PayloadAction<{ message: string, level: LogLevel }>) => {
      state.logs.push({
        createdAt: Date.now(),
        logLevel: action.payload.level,
        message: action.payload.message
      });
    }
  }
});

export const { addLog } = slice.actions;

export default slice.reducer;
