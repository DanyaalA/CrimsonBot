import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GuildConfigDto, RedditConfigDto } from '../data/types';

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

export const discordConfigSlice = createSlice({
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

export const redditConfigSlice = createSlice({
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

export const { updateReddit } = redditConfigSlice.actions;
export const { updateDiscord } = discordConfigSlice.actions;
