import { Game } from './Game';
import { GameTeamUser } from './GameTeamUser';
import { SessionUser } from './SessionUser';

export type GameTeam = {
  game_id: string;
  game: Game;
  has_access_code: boolean;
  id: string;
  name: string;
  color: string | null;
  members: GameTeamUser[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};
