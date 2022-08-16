import axios, { AxiosResponse } from 'axios';
import { GameMission } from '../models/GameMission';
import { BaseService } from './BaseService';

export class GameMissionService extends BaseService {
  public async getByGame(gameId: string) {
    const response: AxiosResponse<GameMission[]> = await axios.get(
      `${this.API_URL}/games/${gameId}/missions`,
      this.headerWithToken(),
    );
    return response.data;
  }
}
