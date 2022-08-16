import { AnswerType } from '../constants/answer-type';
import { AvailabilityType } from '../constants/availability-type';

export type GameMission = {
  answer_type: AnswerType;
  attached_image_link: string | null;
  attached_link: string | null;
  availability: AvailabilityType;
  created_at: string;
  deleted_at: string | null;
  description: string;
  game_id: string;
  id: string;
  mission_data: any;
  name: string;
  point_value: number;
  shown_in_feed: boolean;
  updated_at: string;
};
