import { Game } from '../models/Game';

export const isGameExpired = (game: Game) => {
  if (!game.start_time || !game.end_time) return false;

  const currDate = new Date();
  const endDate = new Date(game.end_time);
  return currDate.getTime() >= endDate.getTime();
};
