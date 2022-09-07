import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Game } from '../../../models/Game';

import { GameTeamUser } from '../../../models/GameTeamUser';
import { PaginatedSubmission } from '../../../models/PaginatedSubmissions';
import { SessionUser } from '../../../models/SessionUser';
import { GameService } from '../../../services/GameService';
import { GameTeamService } from '../../../services/GameTeamService';

import Pagination from '../../shared/Pagination';
import FeedCard from './FeedCard';
import FeedCardSkeleton from './FeedCardSkeleton';

type Props = {
  currentTeam: GameTeamUser;
  game: Game;
  forMyTeam?: boolean;
};

export default function FeedList({ currentTeam, game, forMyTeam = false }: Props) {
  const router = useRouter();
  const page = router.query.page ?? 1;

  const session = useSession();
  const user = session?.data?.user as SessionUser;
  const gameService = new GameService(user?.access_token);
  const teamService = new GameTeamService(user?.access_token);
  const [submissionsPaginated, setSubmissionsPaginated] = useState<PaginatedSubmission | null>(
    null,
  );

  useEffect(() => {
    const fetchSubmissions = async () => {
      const subs = forMyTeam
        ? await teamService.getAllSubmissions(game.id, currentTeam.game_team_id)
        : await gameService.getAllSubmissions(game.id);
      setSubmissionsPaginated(subs);
    };

    if (user) {
      fetchSubmissions();
    }
  }, [user]);

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
