const axios = require("axios");

let domain = "https://reddit-api-bot.herokuapp.com/";
const devMode = false;

if (devMode) {
  domain = "http://localhost:3000/";
}

export const GetRequest = async (uri: String): Promise<Config> => {
  let response = await fetch(domain + uri);
  let data = await response.json();
  return data;
};

export const PostConfig = async (config: Config) => {
  axios.post(domain + "updateConfig", config).catch();
};

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
