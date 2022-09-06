import { BaseModel } from './BaseModel';
import { SessionUser } from './SessionUser';

export interface Submission extends BaseModel {
  answer_data: string; //Type: FileAnswerData | TextAnswerData | LocationAnswerData;
  caption: string;
  game_team_id: string;
  id: string;
  is_accepted: boolean | null;
  mission_id: string;
  user?: SessionUser;
}
