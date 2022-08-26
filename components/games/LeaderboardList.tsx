import { useSession } from 'next-auth/react';
import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import useLoading from '../../hooks/use-loading';
import { GameTeam, GameTeamRank } from '../../models/GameTeam';
import { SessionUser } from '../../models/SessionUser';
import { GameService } from '../../services/GameService';
import LeaderboardCard from './LeaderboardCard';
import LeaderboardSkeleton from './LeaderboardSkeleton';

type Props = {
  teamRanks: (GameTeam & GameTeamRank)[];
  setTeamRanks: Dispatch<SetStateAction<(GameTeam & GameTeamRank)[]>>;
};

function LeaderboardList({ teamRanks, setTeamRanks }: Props) {
  if (teamRanks.length === 0) return <LeaderboardSkeleton />;
  return (
    <ul>
      {teamRanks.map((teamRank) => (
        <li key={teamRank.id}>
          <LeaderboardCard teamRank={teamRank} />
        </li>
      ))}
    </ul>
  );
}

export default React.memo(LeaderboardList);
