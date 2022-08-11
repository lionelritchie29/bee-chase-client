export class BaseService {
  protected API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
  protected accessToken = '';

  constructor(token?: string) {
    this.accessToken = token ?? '';
  }
}
