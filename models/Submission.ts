import { BaseModel } from './BaseModel';

export interface Submission extends BaseModel {
  answer_data: string; //Type: FileAnswerData | TextAnswerData | LocationAnswerData;
  caption: string;
  game_team_id: string;
  id: string;
  is_accepted: boolean | null;
  mission_id: string;
}
