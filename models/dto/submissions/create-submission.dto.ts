import { FileAnswerData } from '../../answer-data/FileAnswerData';
import { LocationAnswerData } from '../../answer-data/LocationAnswerData';
import { TextAnswerData } from '../../answer-data/TextAnswerData';

export interface CreateSubmissionDto {
  game_team_id: string;
  caption: string | null;
  answer_data: FileAnswerData | LocationAnswerData | TextAnswerData;
}
