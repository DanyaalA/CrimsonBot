import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import { RedditConfigDto } from './utils/data/types';

const loadingTemplate: RedditConfigDto = {
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

const redditConfigSlice = createSlice({
  name: 'redditConfig',
  initialState: {
    value: loadingTemplate,
  },
  reducers: {
    update: (state, action: PayloadAction<RedditConfigDto>) => {
      state.value = action.payload;
    },
  },
});

export const { update } = redditConfigSlice.actions;

export const store = configureStore({
  reducer: {
    redditConfig: redditConfigSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
