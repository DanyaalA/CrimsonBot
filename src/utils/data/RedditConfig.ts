import { API } from '../BaseAPI';
import { RedditConfigDto } from './types';

export class RedditConfigAPI extends API {
  constructor() {
    super('reddit/config');
  }

  async getOne(id: string): Promise<RedditConfigDto> {
    const url = this.getUrl() + id;

    return await this.get(url);
  }

  async create(createConfigDto: RedditConfigDto): Promise<RedditConfigDto> {
    return await this.post(createConfigDto);
  }

  async update(updatedConfig: RedditConfigDto): Promise<RedditConfigDto> {
    return await this.put(updatedConfig);
  }
}
