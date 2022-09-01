import React from 'react';
import { GameTeam, GameTeamRank } from '../../models/GameTeam';
import { GameTeamUser } from '../../models/GameTeamUser';
import LeaderboardCard from './LeaderboardCard';
import LeaderboardSkeleton from './LeaderboardSkeleton';

type Props = {
  teamRanks: (GameTeam & GameTeamRank)[];
  currentTeam: GameTeamUser;
};

function LeaderboardList({ teamRanks, currentTeam }: Props) {
  if (teamRanks.length === 0) return <LeaderboardSkeleton />;
  return (
    <ul>
      {teamRanks.map((teamRank) => (
        <li key={teamRank.id}>
          <LeaderboardCard currentTeam={currentTeam} teamRank={teamRank} />
        </li>
      ))}
    </ul>
  );
}

export default React.memo(LeaderboardList);
