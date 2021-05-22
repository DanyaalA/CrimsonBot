const axios = require("axios");

let domain = "https://reddit-api-bot2.herokuapp.com/bot/";
const devMode = false;

if (devMode) {
  domain = "http://localhost:3000/bot/";
}

export const GetConfig = async (): Promise<Config> => {
  let response = await fetch(domain + "config");
  let data = await response.json();
  return data[0];
};

export const GetLogs = async (): Promise<[LogsDto]> => {
  let response = await fetch(domain + "logs");
  let data = await response.json();
  console.log(data);
  let pmLogs: [LogsDto] = [new LogsDto({})];
  data.forEach((element: LogsDto) => {
    if (element.pm) {
      pmLogs.push(element);
    }
  });

  console.log(pmLogs);
  pmLogs.reverse();
  return pmLogs;
};

export const PostConfig = async (config: Config) => {
  axios.post(domain + "updateConfig", config).catch();
};

export class LogsDto {
  id: number;
  username: string;
  message: string;
  subreddit: string;
  time: string;
  subId: string;
  pm: boolean;
  constructor(data: any) {
    this.id = data.id;
    this.username = data.id;
    this.message = data.id;
    this.subreddit = data.id;
    this.time = data.id;
    this.subId = data.id;
    this.pm = data.id;
  }
}

export class Config {
  id: number;
  clientId: string;
  clientSecret: string;
  username: string;
  password: string;
  userAgent: string;
  title: string;
  pmBody: string;
  subreddits: string;
  forbiddenWords: string;
  constructor(data: any) {
    this.id = data.id;
    this.clientId = data.clientId;
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
