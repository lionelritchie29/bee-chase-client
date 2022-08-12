export type CreateGameTeamDto = {
  game_id: string;
  name: string;
  access_code?: string | null;
};
