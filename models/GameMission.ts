import { AnswerType } from '../constants/answer-type';
import { AvailabilityType } from '../constants/availability-type';
import { BaseModel } from './BaseModel';
import { FileMissionData } from './mission-data/FileMissionData';
import { LocationMissionData } from './mission-data/LocationMissionData';

export interface GameMission extends BaseModel {
  answer_type: AnswerType;
  attached_image_link: string | null;
  attached_link: string | null;
  availability: AvailabilityType;
  description: string;
  game_id: string;
  id: string;
  mission_data: string; // Type: FileMissionData | LocationMissionData // TextMissionData;
  name: string;
  point_value: number;
  shown_in_feed: boolean;
  submissions: any[]; // TODO: Change to submission modele
}
