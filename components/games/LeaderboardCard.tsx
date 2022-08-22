import { GameTeam, GameTeamRank } from '../../models/GameTeam';

type Props = {
  teamRank: GameTeam & GameTeamRank;
};

export default function LeaderboardCard({ teamRank }: Props) {
  const getRank = () => {
    if (teamRank.rank === 1) return '1st';
    else if (teamRank.rank === 2) return '2nd';
    else if (teamRank.rank === 3) return '3rd';
    return `${teamRank.rank}th`;
  };

  return (
    <div className='flex items-center justify-between p-2 border-b'>
      <div className='flex'>
        <div className='avatar'>
          <div
            className='w-12 rounded-full border border-gray-400'
            style={{ backgroundColor: teamRank.color ?? '' }}></div>
        </div>
        <div className='ml-3'>
          <span className='block font-bold'>{teamRank.name}</span>
          <span className='block font-semibold text-gray-400 text-sm'>
            {teamRank.missions_sum_point_value} pts
          </span>
        </div>
      </div>

      <div className='font-bold'>{getRank()}</div>
    </div>
  );
}
