import { BaseModel } from './BaseModel';

export interface GameTeamUser extends BaseModel {
  game_team_id: string;
  id: string;
  user_id: string;
  user_name: string;
  user_username: string;
}
