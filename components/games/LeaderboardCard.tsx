import { GameTeam, GameTeamRank } from '../../models/GameTeam';
import { GameTeamUser } from '../../models/GameTeamUser';

type Props = {
  teamRank: GameTeam & GameTeamRank;
  currentTeam: GameTeamUser;
};

export default function LeaderboardCard({ teamRank, currentTeam }: Props) {
  const getRank = () => {
    if (teamRank.rank === 1) return '1st';
    else if (teamRank.rank === 2) return '2nd';
    else if (teamRank.rank === 3) return '3rd';
    return `${teamRank.rank}th`;
  };

  return (
    <div
      className={`flex items-center justify-between p-2 border-b ${
        teamRank.id === currentTeam.game_team_id ? 'bg-yellow-200' : ''
      }`}>
      <div className='flex'>
        <div className='avatar'>
          <div
            className='w-12 rounded-full border border-gray-400'
            style={{ backgroundColor: teamRank.color ?? '' }}></div>
        </div>
        <div className='ml-3'>
          <span className='block font-bold'>{teamRank.name}</span>
          <span className='block font-semibold text-gray-400 text-sm'>
            {teamRank.missions_sum_point_value ?? '0'} pts
          </span>
        </div>
      </div>

      <div className='font-bold'>{getRank()}</div>
    </div>
  );
}
