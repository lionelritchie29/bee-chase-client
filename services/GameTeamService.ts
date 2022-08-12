import axios from 'axios';
import { CreateGameTeamDto } from '../models/dto/game-teams/create-team.dto';
import { BaseService } from './BaseService';

export class GameTeamService extends BaseService {
  public async create(dto: CreateGameTeamDto) {
    const response = await axios.post(
      `${this.API_URL}/games/${dto.game_id}/game_teams`,
      dto,
      this.headerWithToken(),
    );
    return response.data;
  }
}
