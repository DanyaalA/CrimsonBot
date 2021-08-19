import { API } from '../BaseAPI';
import { LogDto, RedditConfigDto } from './types';

export class LogAPI extends API {
  constructor() {
    super('reddit/log');
  }

  async getLogs(nodeId: string): Promise<LogDto[]> {
    const url = this.getUrl() + nodeId;

    return await this.get(url);
  }

  async getSubmissionIds(nodeId: string): Promise<string[]> {
    const url = this.getUrl() + `submissions/${nodeId}`;

    console.log(url);

    return await this.get(url);
  }

  async create(createLogDto: LogDto): Promise<RedditConfigDto> {
    return await this.post(createLogDto);
  }
}
