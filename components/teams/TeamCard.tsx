import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { COLORS } from '../../constants/color';
import { teamIsFull } from '../../lib/game-utils';
import { Game } from '../../models/Game';
import { GameTeam } from '../../models/GameTeam';

type Props = {
  team: GameTeam;
  verifyTeam: (teamId: string) => void;
  game: Game;
};

export default function TeamCard({ team, verifyTeam, game }: Props) {
  return (
    <button
      onClick={() => verifyTeam(team.id)}
      className='w-full flex justify-between items-center p-4 border-b'>
      <div className='flex items-center text-orange-400'>
        <div className='avatar'>
          <div
            className='w-6 h-6 rounded-full mr-2'
            style={{ backgroundColor: team.color ?? COLORS.TEAM_DEFAULT }}
          />
        </div>
        <span className='block font-semibold'>{team.name}</span>
        {teamIsFull(game, team) && <span className='badge badge-outline ml-3'>Full</span>}
      </div>
      <ChevronRightIcon className='w-5 h-5' />
    </button>
  );
}
