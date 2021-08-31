import { configureStore } from '@reduxjs/toolkit';
import {
  discordConfigSlice,
  redditConfigSlice,
} from 'utils/slices/configSlices';
import { logsSlice } from 'utils/slices/logsSlice';
import { paymentsSlice } from 'utils/slices/paymentSlice';
import { userSlice } from 'utils/slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    redditConfig: redditConfigSlice.reducer,
    discordConfig: discordConfigSlice.reducer,
    payments: paymentsSlice.reducer,
    logs: logsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
