export class BaseService {
  protected API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
  protected accessToken = '';

  protected headerWithToken = () => {
    return {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    };
  };

  constructor(token?: string) {
    this.accessToken = token ?? '';
  }
}
