import { ChevronRightIcon } from '@heroicons/react/outline';
import { Dispatch, SetStateAction } from 'react';
import { COLORS } from '../../constants/color';
import { GameTeam } from '../../models/GameTeam';

type Props = {
  team: GameTeam;
  verifyTeam: (teamId: string) => void;
};

export default function TeamCard({ team, verifyTeam }: Props) {
  return (
    <button
      onClick={() => verifyTeam(team.id)}
      className='w-full flex justify-between items-center p-4 border-b'>
      <div className='flex items-center text-orange-400'>
        <div
          className='w-6 h-6 rounded-full mr-2'
          style={{ backgroundColor: team.color ?? COLORS.TEAM_DEFAULT }}
        />
        <span className='block font-semibold'>{team.name}</span>
      </div>
      <ChevronRightIcon className='w-5 h-5' />
    </button>
  );
}
