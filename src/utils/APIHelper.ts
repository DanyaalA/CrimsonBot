import axios from "axios";

export default class APIHelper {
  private static readonly devMode = true;
  private static domain = APIHelper.devMode
    ? "http://localhost:3000/bot/"
    : "https://reddit-api-bot2.herokuapp.com/bot/";

  private static GetData = async (url: string) => {
    let response = await fetch(APIHelper.domain + url);
    return await response.json();
  };

  public static GetConfig = async (): Promise<Config> => {
    return (await APIHelper.GetData("config"))[0] as Promise<Config>;
  };

  public static GetPayments = async (): Promise<[Payments]> => {
    return await APIHelper.GetData("payments");
  };

  public static GetLogs = async (): Promise<[LogsDto]> => {
    let response = await fetch(APIHelper.domain + "logs");

    let data = await response.json();

    let pmLogs: [LogsDto] = [new LogsDto({})];
    data.forEach((element: LogsDto) => {
      if (element.pm) {
        pmLogs.push(element);
      }
    });

    return pmLogs;
  };

  public static PostConfig = async (config: Config) => {
    axios.post(APIHelper.domain + "updateConfig", config).catch();
  };

  public static PostPayments = async (payments: Payments[]) => {
    axios.post(APIHelper.domain + "updatePayments", payments).catch();
  };
}

export class Payments {
  id: number;
  name: string;
  value: string;
  type: string;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.id;
    this.value = data.id;
    this.type = data.id;
  }
}

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
  activity: string;
  type: string;
  status: string;
  imageUrl: string;
  autoSwitch: boolean;
  autoTicket: boolean;
  autoReact: boolean;

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
    this.activity = data.activity;
    this.type = data.type;
    this.status = data.status;
    this.imageUrl = data.imageUrl;
    this.autoSwitch = data.autoSwitch;
    this.autoTicket = data.autoTicket;
    this.autoReact = data.autoReact;
  }
}
