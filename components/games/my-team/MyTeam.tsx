import { COLORS } from '../../../constants/color';
import { GameTeam, GameTeamRank } from '../../../models/GameTeam';
import { GameTeamUser } from '../../../models/GameTeamUser';
import { PaginatedSubmission } from '../../../models/PaginatedSubmissions';
import FeedList from '../feeds/FeedList';

type Props = {
  teamRank: (GameTeam & GameTeamRank) | null;
  submissions: PaginatedSubmission | null;
  currentTeam: GameTeamUser;
};

export default function MyTeam({ teamRank, submissions, currentTeam }: Props) {
  return (
    <section className='mt-6'>
      <div className='flex justify-around items-center text-center border rounded mx-3 py-4'>
        <div className='w-1/3'>
          {teamRank ? (
            <span className='block'>{teamRank.missions_sum_point_value}</span>
          ) : (
            <div className='h-4 w-12 bg-gray-300 mx-auto rounded animate-pulse'></div>
          )}

          <span className='block font-semibold'>Points</span>
        </div>

        <div className='w-1/3'>
          <div
            className='rounded-full w-24 h-24 border mx-auto'
            style={{ backgroundColor: teamRank?.color || COLORS.TEAM_DEFAULT }}></div>

          {teamRank ? (
            <span className='block mt-2 text-lg font-bold'>{teamRank.name}</span>
          ) : (
            <div className='h-4 w-24 mt-2 bg-gray-300 mx-auto rounded animate-pulse'></div>
          )}
        </div>

        <div className='w-1/3'>
          {teamRank ? (
            <span className='block'>{teamRank.submissions_count}</span>
          ) : (
            <div className='h-4 w-12 bg-gray-300 mx-auto rounded animate-pulse'></div>
          )}
          <span className='block font-semibold'>Submissions</span>
        </div>
      </div>

      <div className='divider mx-3'></div>

      <FeedList currentTeam={currentTeam} submissionsPaginated={submissions} />
    </section>
  );
}
