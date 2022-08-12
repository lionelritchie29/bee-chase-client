import axios, { AxiosResponse } from 'axios';
import { CreateGameTeamDto } from '../models/dto/game-teams/create-team.dto';
import { GameTeam } from '../models/GameTeam';
import { BaseService } from './BaseService';

export class GameTeamService extends BaseService {
  public async create(dto: CreateGameTeamDto) {
    const response: AxiosResponse<GameTeam> = await axios.post(
      `${this.API_URL}/games/${dto.game_id}/game_teams`,
      dto,
      this.headerWithToken(),
    );
    return response.data;
  }

  public async join(gameId: string, teamId: string, accessCode: string | null) {
    const response: AxiosResponse<any> = await axios.post(
      `${this.API_URL}/games/${gameId}/game_teams/${teamId}/join`,
      { access_code: accessCode },
      this.headerWithToken(),
    );
    return response.data;
  }

  public async getByGameId(gameId: string) {
    const response: AxiosResponse<GameTeam[]> = await axios.get(
      `${this.API_URL}/games/${gameId}/game_teams`,
      this.headerWithToken(),
    );
    return response.data;
  }
}
