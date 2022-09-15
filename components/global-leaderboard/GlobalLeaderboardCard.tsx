import { GlobalRank } from '../../models/GlobalRank';
import { SessionUser } from '../../models/SessionUser';

type Props = {
  globalRank: GlobalRank;
  currentUser: SessionUser;
};

export default function GlobalLeaderboardCard({ globalRank, currentUser }: Props) {
  const getRank = () => {
    if (globalRank.rank === 1) return '1st';
    else if (globalRank.rank === 2) return '2nd';
    else if (globalRank.rank === 3) return '3rd';
    return `${globalRank.rank}th`;
  };

  return (
    <div
      className={`flex items-center justify-between p-2 border-b ${
        currentUser?.id === globalRank.id ? 'bg-yellow-200' : ''
      }`}>
      <div className='flex'>
        <div className='w-12 h-12 flex items-center justify-center font-bold text-white bg-secondary rounded-full '>
          <div>{globalRank.rank}</div>
        </div>
        <div className='ml-3'>
          <span className='block font-bold'>{globalRank.name}</span>
          <span className='block font-semibold text-gray-400 text-sm'>
            {globalRank.total_point} pts
          </span>
        </div>
      </div>

      <div className='font-bold'>{getRank()}</div>
    </div>
  );
}
