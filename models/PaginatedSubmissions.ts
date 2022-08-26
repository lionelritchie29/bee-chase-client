import PaginateResponseDto from './dto/paginate-response.dto';
import { GameMission } from './GameMission';
import { GameTeam } from './GameTeam';
import { Submission } from './Submission';

export type PaginatedSubmission = PaginateResponseDto<
  Submission & { game_team: GameTeam } & { mission: GameMission }
>;
