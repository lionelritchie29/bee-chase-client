import axios, { AxiosResponse } from 'axios';
import PaginateResponseDto from '../models/dto/paginate-response.dto';
import { Game } from '../models/Game';
import { GameMission } from '../models/GameMission';
import { GameTeam, GameTeamRank } from '../models/GameTeam';
import { Submission } from '../models/Submission';
import { BaseService } from './BaseService';

export class GameService extends BaseService {
  public async getByCode(code: string) {
    const response: AxiosResponse<Game> = await axios.get(
      `${this.API_URL}/games/${code.toUpperCase()}/code`,
      this.headerWithToken(),
    );
    return response.data;
  }

  public async verifyPasscode(gameId: string, passcode: string) {
    const response: AxiosResponse<boolean> = await axios.post(
      `${this.API_URL}/games/${gameId}/verify`,
      { passcode },
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

  public async getLeaderboard(id: string) {
    const response: AxiosResponse<(GameTeam & GameTeamRank)[]> = await axios.get(
      `${this.API_URL}/games/${id}/leaderboard`,
      this.headerWithToken(),
    );
    return response.data;
  }

  public async getCurrentJoinedGames() {
    const response: AxiosResponse<Game[]> = await axios.get(
      `${this.API_URL}/games?player=true`,
      this.headerWithToken(),
    );
    return response.data;
  }

  public async getAllSubmissions(gameId: string) {
    const response: AxiosResponse<
      PaginateResponseDto<Submission & { game_team: GameTeam } & { mission: GameMission }>
    > = await axios.get(`${this.API_URL}/games/${gameId}/submissions`, this.headerWithToken());
    return response.data;
  }
}
