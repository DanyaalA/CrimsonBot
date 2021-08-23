import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GuildConfigDto, RedditConfigDto } from 'labmaker-api-wrapper';

const loadingRedditConfig: RedditConfigDto & { loading?: boolean } = {
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
  blockedUsers: ['Blocked_User1', 'Blocked_User2'],
  loading: true,
};

const loadingDiscordConfig: GuildConfigDto & { loading?: boolean } = {
  _id: '0',
  paymentConfigId: '0',
  prefix: '?',
  embedImageUrl: 'http://www.image.com/image.png',
  autoSwitcher: false,
  autoReact: false,
  autoTicket: false,
  loading: true,
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
    // value: LabmakerAPI.Reddit.getOne('3630aeb2-38c5-4c36-a0d5-5c2d95fa35b0'),
  },
  reducers: {
    updateReddit: (state, action: PayloadAction<RedditConfigDto>) => {
      state.value = action.payload;
    },
  },
});

export const { updateReddit } = redditConfigSlice.actions;
export const { updateDiscord } = discordConfigSlice.actions;
