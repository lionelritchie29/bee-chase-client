import { Game } from '../models/Game';
import { GameTeam } from '../models/GameTeam';

export const isGameExpired = (game: Game): boolean => {
  if (!game.start_time || !game.end_time) return false;

  const currDate = new Date();
  const endDate = new Date(game.end_time);
  return currDate.getTime() >= endDate.getTime();
};

export const teamIsFull = (game: Game, team: GameTeam): boolean => {
  return game?.max_player_per_team === team?.members?.length;
};

export const isIndividualGame = (game: Game): boolean => {
  return game.max_player_per_team === 1;
};
