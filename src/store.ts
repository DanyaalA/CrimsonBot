import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import { keyframes } from 'styled-components';
import {
  GuildConfigDto,
  PaymentDto,
  RedditConfigDto,
} from './utils/data/types';

const loadingRedditConfig: RedditConfigDto = {
  _id: '0',
  clientId: '0',
  clientSecret: 'Client Secret',
  username: 'Username',
  password: 'Password',
  userAgent: 'Firefox',
  title: 'Hey',
  pmBody: 'I Saw Your Post...',
  delay: 0,
  subreddits: ['Subreddit1', 'Subreddit2'],
  forbiddenWords: ['ForbiddenWord1', 'Forbidden String 1'],
};

const loadingDiscordConfig: GuildConfigDto = {
  _id: '0',
  paymentConfigId: '0',
  prefix: '?',
  embedImageUrl: 'http://www.image.com/image.png',
  autoSwitcher: false,
  autoReact: false,
  autoTicket: false,
};

const loadingPayment: PaymentDto = {
  _id: '0',
  nodeId: '0',
  name: 'Loading Payments...',
  value: 'Loading...',
  type: 'Loading...',
};

const redditConfigSlice = createSlice({
  name: 'redditConfig',
  initialState: {
    value: loadingRedditConfig,
  },
  reducers: {
    updateReddit: (state, action: PayloadAction<RedditConfigDto>) => {
      state.value = action.payload;
    },
  },
});

const discordConfigSlice = createSlice({
  name: 'discordConfig',
  initialState: {
    value: loadingDiscordConfig,
  },
  reducers: {
    updateDiscord: (state, action: PayloadAction<GuildConfigDto>) => {
      state.value = action.payload;
    },
  },
});

const paymentsSlice = createSlice({
  name: 'payments',
  initialState: {
    value: [loadingPayment],
  },
  reducers: {
    updatePayemnts: (state, action: PayloadAction<PaymentDto[]>) => {
      state.value = action.payload;
    },
    addPayment: (state, action: PayloadAction<PaymentDto>) => {
      state.value.push(action.payload);
    },
    removePayment: (state, action: PayloadAction<PaymentDto>) => {
      const index = state.value.findIndex((x) => x._id === action.payload._id);

      if (index > -1) {
        state.value.splice(index, 1);
      }
    },
    editPayment: (state, action: PayloadAction<PaymentDto>) => {
      const index = state.value.findIndex((x) => x._id === action.payload._id);

      if (index > -1) {
        state.value[index] = action.payload;
      }
    },
  },
});

export const { updateReddit } = redditConfigSlice.actions;
export const { updateDiscord } = discordConfigSlice.actions;
export const { updatePayemnts, addPayment, removePayment, editPayment } =
  paymentsSlice.actions;

export const store = configureStore({
  reducer: {
    redditConfig: redditConfigSlice.reducer,
    discordConfig: discordConfigSlice.reducer,
    payments: paymentsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
