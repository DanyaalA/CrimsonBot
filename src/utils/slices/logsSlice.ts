import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LogDto } from 'labmaker-api-wrapper';

const loadingLogs: LogDto = {
  _id: '0',
  nodeId: '0',
  message: 'Loading Logs...',
  subId: 'Loading...',
  username: 'Loading...',
  subreddit: 'Homework',
  createdAt: new Date().toString(),
  pm: true,
};

export const logsSlice = createSlice({
  name: 'logs',
  initialState: {
    value: [loadingLogs],
  },
  reducers: {
    updateLogs: (state, action: PayloadAction<LogDto[]>) => {
      state.value = action.payload;
    },
  },
});

export const { updateLogs } = logsSlice.actions;
