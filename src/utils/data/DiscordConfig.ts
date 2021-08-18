import { API } from '../BaseAPI';
import { GuildConfigDto, PaymentDto } from './types';

export class DiscordConfigAPI extends API {
  constructor() {
    super('discord/config');
  }

  async getAll(): Promise<GuildConfigDto[]> {
    return await this.get();
  }

  async getOne(id: string): Promise<GuildConfigDto> {
    const url = this.getUrl() + id;

    return await this.get(url);
  }

  async create(_id: string): Promise<GuildConfigDto> {
    const paymentConfigId = 0;

    return await this.post({ _id, paymentConfigId });
  }

  async update(updatedConfig: GuildConfigDto): Promise<GuildConfigDto> {
    return await this.put(updatedConfig);
  }

  //Pointless creating PaymentsAPI Class for one call so for now im placing it here
  //More Payment calls have been added Possibly move to different section?
  async getPayments(nodeId: string): Promise<PaymentDto[]> {
    const url =
      this.getUrl().substring(0, this.getUrl().length - 7) +
      `payment/${nodeId}`;

    return await this.get(url);
  }

  async createPayments(payments: PaymentDto[]): Promise<PaymentDto[] | any> {
    const url =
      this.getUrl().substring(0, this.getUrl().length - 7) + `payment/`;

    console.log(url);
    console.log(payments);

    return await this.post(payments, url);
  }

  async updatePayments(payments: PaymentDto[]): Promise<PaymentDto[] | any> {
    const url =
      this.getUrl().substring(0, this.getUrl().length - 7) + `payment/`;

    return await this.put(payments, url);
  }

  async deletePayments(paymentId: string[]): Promise<PaymentDto[] | any> {
    const url =
      this.getUrl().substring(0, this.getUrl().length - 7) + `payment/`;

    return await this.delete(paymentId, url);
  }
}
