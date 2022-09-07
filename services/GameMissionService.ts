import axios, { AxiosResponse } from 'axios';
import { GameMission } from '../models/GameMission';
import { BaseService } from './BaseService';

export class GameMissionService extends BaseService {
  public async get(gameId: string, id: string) {
    const response: AxiosResponse<GameMission> = await axios.get(
      `${this.API_URL}/games/${gameId}/missions/${id}?withSubmissionsUser=true`,
      this.headerWithToken(),
    );
    return response.data;
  }

  public async getByGame(gameId: string, filterCurrentTeamSubmissions: boolean = true) {
    const response: AxiosResponse<GameMission[]> = await axios.get(
      `${this.API_URL}/games/${gameId}/missions?filterCurrentTeamSubmissions=${filterCurrentTeamSubmissions}`,
      this.headerWithToken(),
    );
    return response.data;
  }
}
