import axios, { AxiosResponse } from 'axios';
import { Game } from '../models/Game';
import { GameTeam, GameTeamRank } from '../models/GameTeam';
import { PaginatedSubmission } from '../models/PaginatedSubmissions';
import { BaseService } from './BaseService';

export class GameService extends BaseService {
  public async getByCode(code: string) {
    try {
      const response: AxiosResponse<Game> = await axios.get(
        `${this.API_URL}/games/${code.toUpperCase()}/code`,
        this.headerWithToken(),
      );
      return response.data;
    } catch (e) {
      return null;
    }
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
    const response: AxiosResponse<PaginatedSubmission> = await axios.get(
      `${this.API_URL}/games/${gameId}/submissions`,
      this.headerWithToken(),
    );
    return response.data;
  }
}
