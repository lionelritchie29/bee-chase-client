import axios, { AxiosResponse } from 'axios';
import { CreateSubmissionDto } from '../models/dto/submissions/create-submission.dto';
import { BaseService } from './BaseService';

export class SubmissionService extends BaseService {
  public async create(gameId: string, missionId: string, dto: CreateSubmissionDto) {
    const response: AxiosResponse<any> = await axios.post(
      `${this.API_URL}/games/${gameId}/missions/${missionId}/submissions`,
      { dto },
      this.headerWithToken(),
    );
    return response.data;
  }
}
