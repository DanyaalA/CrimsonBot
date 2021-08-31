import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadingLogs } from 'utils/LoadingTypes';
import { LogType } from 'utils/types';

export const logsSlice = createSlice({
  name: 'logs',
  initialState: {
    value: [loadingLogs],
  },
  reducers: {
    updateLogs: (state, action: PayloadAction<LogType[]>) => {
      state.value = action.payload;
    },
  },
});

export const { updateLogs } = logsSlice.actions;
