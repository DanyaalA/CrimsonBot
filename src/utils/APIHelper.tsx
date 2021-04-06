const axios = require("axios");

let domain = "https://reddit-api-bot.herokuapp.com/";
const devMode = false;

if (devMode) {
  domain = "http://localhost:3000/";
}

export const GetConfig = async (): Promise<Config> => {
  let response = await fetch(domain + "config");
  let data = await response.json();
  return data;
};

export const GetLogs = async (): Promise<LogsDto> => {
  let response = await fetch(domain + "logs");
  let data = await response.json();
  return data;
};

export const PostConfig = async (config: Config) => {
  axios.post(domain + "updateConfig", config).catch();
};

type LogDto = {
  user: string;
  message: string;
  subreddit: string;
  id: string;
  time: string;
};

export class LogsDto {
  logs: string;
  constructor(data: any) {
    this.logs = data;
  }
}

export class Config {
  clientID: string;
  clientSecret: string;
  username: string;
  password: string;
  userAgent: string;
  title: string;
  pmBody: string;
  subreddits: [string];
  forbiddenWords: [string];
  constructor(data: any) {
    this.clientID = data.clientID;
    this.clientSecret = data.clientSecret;
    this.username = data.username;
    this.password = data.password;
    this.userAgent = data.userAgent;
    this.title = data.title;
    this.pmBody = data.pmBody;
    this.subreddits = data.subreddits;
    this.forbiddenWords = data.forbiddenwords;
  }
}
