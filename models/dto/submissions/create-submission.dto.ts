import { FileAnswerData } from '../../answer-data/FileAnswerData';
import { LocationAnswerData } from '../../answer-data/LocationAnswerData';
import { MultipleChoiceAnswerData } from '../../answer-data/MultipleChoiceAnswerData';
import { TextAnswerData } from '../../answer-data/TextAnswerData';

export interface CreateSubmissionDto {
  game_team_id: string;
  caption: string | null;
  answer_data: MultipleChoiceAnswerData | FileAnswerData | LocationAnswerData | TextAnswerData;
}
