import axios, { AxiosResponse } from 'axios';
import { CreateGameTeamDto } from '../models/dto/game-teams/create-team.dto';
import PaginateResponseDto from '../models/dto/paginate-response.dto';
import { GameTeam, GameTeamRank } from '../models/GameTeam';
import { GameTeamUser } from '../models/GameTeamUser';
import { PaginatedSubmission } from '../models/PaginatedSubmissions';
import { BaseService } from './BaseService';

export class GameTeamService extends BaseService {
  public async create(gameId: string, dto: CreateGameTeamDto) {
    const response: AxiosResponse<GameTeam> = await axios.post(
      `${this.API_URL}/games/${gameId}/game_teams`,
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

  public async getByGameId(gameId: string, query: string = '', page: number = 1) {
    const response: AxiosResponse<PaginateResponseDto<GameTeam>> = await axios.get(
      `${this.API_URL}/games/${gameId}/game_teams?page=${page}&limit=5&q=${query}`,
      this.headerWithToken(),
    );
    return response.data;
  }

  public async getById(gameId: string, teamId: string) {
    const response: AxiosResponse<GameTeam> = await axios.get(
      `${this.API_URL}/games/${gameId}/game_teams/${teamId}`,
      this.headerWithToken(),
    );
    return response.data;
  }

  public async verifyCode(gameId: string, teamId: string, accessCode: string) {
    const response: AxiosResponse<boolean> = await axios.post(
      `${this.API_URL}/games/${gameId}/game_teams/${teamId}/verify`,
      { access_code: accessCode },
      this.headerWithToken(),
    );
    return response.data;
  }

  public async checkUserAlreadyInTeam(gameId: string) {
    const response: AxiosResponse<GameTeamUser> = await axios.get(
      `${this.API_URL}/games/${gameId}/myTeam`,
      this.headerWithToken(),
    );
    return response.data;
  }

  public async getAllSubmissions(
    gameId: string,
    teamId: string,
    page: number = 1,
    limit: number = 5,
  ) {
    const response: AxiosResponse<PaginatedSubmission> = await axios.get(
      `${this.API_URL}/games/${gameId}/game_teams/${teamId}/submissions?page=${page}&limit=${limit}`,
      this.headerWithToken(),
    );
    return response.data;
  }

  public async getCurrentTeamLeaderboard(gameId: string, teamId: string) {
    const response: AxiosResponse<GameTeam & GameTeamRank> = await axios.get(
      `${this.API_URL}/games/${gameId}/game_teams/${teamId}/leaderboard`,
      this.headerWithToken(),
    );
    return response.data;
  }
}
