import {
  DiscordConfigAPI,
  LogAPI,
  RedditConfigAPI,
  TicketAPI,
} from 'labmaker-api-wrapper';

export default class LabmakerAPI {
  private static API = 'https://reddit-api-bot2.herokuapp.com';

  public static Discord = new DiscordConfigAPI(LabmakerAPI.API);
  public static Log = new LogAPI(LabmakerAPI.API);
  public static Reddit = new RedditConfigAPI(LabmakerAPI.API);
  public static Ticket = new TicketAPI(LabmakerAPI.API);
}
