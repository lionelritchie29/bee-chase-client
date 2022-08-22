import axios, { AxiosResponse } from 'axios';
import { BaseService } from './BaseService';

export class AuthService extends BaseService {
  public async getCurrentUser() {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/me`,
      this.headerWithToken(),
    );
    return result.data;
  }
}
