import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { GameTeam, GameTeamRank } from '../../models/GameTeam';
import LeaderboardCard from './LeaderboardCard';
import LeaderboardSkeleton from './LeaderboardSkeleton';

type Props = {
  teamRanks: (GameTeam & GameTeamRank)[];
};

function LeaderboardList({ teamRanks }: Props) {
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
