import { useSession } from 'next-auth/react';
import React, { useEffect, useMemo, useState } from 'react';
import useLoading from '../../hooks/use-loading';
import { GameTeam, GameTeamRank } from '../../models/GameTeam';
import { SessionUser } from '../../models/SessionUser';
import { GameService } from '../../services/GameService';
import LeaderboardCard from './LeaderboardCard';
import LeaderboardSkeleton from './LeaderboardSkeleton';

type Props = {
  gameId: string;
};

function LeaderboardList({ gameId }: Props) {
  const session = useSession();
  const user = session?.data?.user as SessionUser;
  const gameService = new GameService(user?.access_token);

  const [teamRanks, setTeamRanks] = useState<(GameTeam & GameTeamRank)[]>([]);

  useEffect(() => {
    const fetchLeaderboards = async () => {
      const result = await gameService.getLeaderboard(gameId);
      setTeamRanks(result);
    };

    fetchLeaderboards();
  }, []);

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
