import { useRouter } from 'next/router';

import { GameTeamUser } from '../../../models/GameTeamUser';
import { PaginatedSubmission } from '../../../models/PaginatedSubmissions';

import Pagination from '../../shared/Pagination';
import FeedCard from './FeedCard';
import FeedCardSkeleton from './FeedCardSkeleton';

type Props = {
  submissionsPaginated: PaginatedSubmission | null;
  currentTeam: GameTeamUser;
};

export default function FeedList({ submissionsPaginated, currentTeam }: Props) {
  const router = useRouter();
  const page = router.query.page ?? 1;

  if (!submissionsPaginated) {
    return (
      <ul className='grid grid-cols-1 gap-3 mx-3 mt-3 pb-12'>
        {[1, 2, 3].map((sub) => (
          <FeedCardSkeleton key={sub} />
        ))}
      </ul>
    );
  }

  return (
    <section className='mx-3 pb-12'>
      <Pagination
        pagination={submissionsPaginated}
        currentPage={Number(page)}
        render={(submission) => (
          <FeedCard currentTeam={currentTeam} submission={submission} key={submission.id} />
        )}
      />
    </section>
  );
}
