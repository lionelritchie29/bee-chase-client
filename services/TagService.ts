import axios, { AxiosResponse } from 'axios';
import { GlobalRank } from '../models/GlobalRank';
import { Tag } from '../models/Tag';
import { BaseService } from './BaseService';

export class TagService extends BaseService {
  public async gets() {
    const response: AxiosResponse<Tag[]> = await axios.get(
      `${this.API_URL}/tags`,
      this.headerWithToken(),
    );
    return response.data;
  }

  public async getGlobalLeaderboard(
    tagId: string,
    startDate: string | null,
    endDate: string | null,
    limit: number = 10,
  ) {
    const response: AxiosResponse<GlobalRank[]> = await axios.get(
      `${this.API_URL}/tags/${tagId}/leaderboard?start_date=${startDate}&end_date=${endDate}&limit=${limit}`,
      this.headerWithToken(),
    );
    return response.data;
  }

  public async getCurrentGlobalLeaderboard(
    tagId: string,
    startDate: string | null,
    endDate: string | null,
  ) {
    const response: AxiosResponse<GlobalRank> = await axios.get(
      `${this.API_URL}/tags/${tagId}/leaderboard/current?start_date=${startDate}&end_date=${endDate}`,
      this.headerWithToken(),
    );
    return response.data;
  }
}
