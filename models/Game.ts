import { BaseModel } from './BaseModel';

export interface Game extends BaseModel {
  access_code: string;
  admins: any[];
  allow_user_create_team: boolean;
  description: string;
  end_time: string | null;
  has_password: boolean;
  id: string;
  image: string | null;
  max_player_per_team: number;
  name: string;
  password: string | null;
  start_time: string | null;
}
