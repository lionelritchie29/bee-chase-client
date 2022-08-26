import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import PaginateResponseDto from '../../../models/dto/paginate-response.dto';
import { GameMission } from '../../../models/GameMission';
import { GameTeam } from '../../../models/GameTeam';
import { SessionUser } from '../../../models/SessionUser';
import { Submission } from '../../../models/Submission';
import { GameService } from '../../../services/GameService';
import Pagination from '../../shared/Pagination';
import FeedCard from './FeedCard';
import FeedCardSkeleton from './FeedCardSkeleton';

type Props = {
  submissionsPaginated: PaginateResponseDto<
    Submission & { game_team: GameTeam } & { mission: GameMission }
  > | null;
};

export default function FeedList({ submissionsPaginated }: Props) {
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
        render={(submission) => <FeedCard submission={submission} key={submission.id} />}
      />
    </section>
  );
}
