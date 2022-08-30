import { AnswerType } from '../constants/answer-type';
import { AvailabilityType } from '../constants/availability-type';
import { BaseModel } from './BaseModel';
import { Submission } from './Submission';

export interface GameMission extends BaseModel {
  answer_type: AnswerType;
  attached_image_link: string | null;
  attached_link: string | null;
  availability: AvailabilityType;
  description: string;
  game_id: string;
  id: string;
  mission_data: string; // Type: FileMissionData | LocationMissionData | TextMissionData | MultipleChoiceAnswerData ;
  name: string;
  point_value: number;
  shown_in_feed: boolean;
  submissions: Submission[];
}
