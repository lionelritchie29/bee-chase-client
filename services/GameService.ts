import axios, { AxiosResponse } from 'axios';
import { Game } from '../models/Game';
import { BaseService } from './BaseService';

export class GameService extends BaseService {
  public async getByCode(code: string) {
    const response: AxiosResponse<Game> = await axios.get(
      `${this.API_URL}/games/${code.toUpperCase()}/code`,
      this.headerWithToken(),
    );
    return response.data;
  }

  public async get(id: string) {
    const response: AxiosResponse<Game> = await axios.get(
      `${this.API_URL}/games/${id}`,
      this.headerWithToken(),
    );
    return response.data;
  }
}
