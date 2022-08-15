import { Game } from './Game';

export type GameTeam = {
  game_id: string;
  game: Game;
  has_access_code: boolean;
  id: string;
  name: string;
  color: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};
