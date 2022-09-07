import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { Game } from '../../models/Game';
import { GameTeam, GameTeamRank } from '../../models/GameTeam';
import { GameTeamUser } from '../../models/GameTeamUser';
import { SessionUser } from '../../models/SessionUser';
import { GameService } from '../../services/GameService';
import LeaderboardCard from './LeaderboardCard';
import LeaderboardSkeleton from './LeaderboardSkeleton';

type Props = {
  currentTeam: GameTeamUser;
  game: Game;
};

function LeaderboardList({ currentTeam, game }: Props) {
  const session = useSession();
  const user = session?.data?.user as SessionUser;
  const gameService = new GameService(user?.access_token);
  const [teamRanks, setTeamRanks] = useState<(GameTeam & GameTeamRank)[]>([]);

  useEffect(() => {
    const fetchLeaderboards = async () => {
      const result = await gameService.getLeaderboard(game.id);
      setTeamRanks(result);
    };

    if (user) {
      fetchLeaderboards();
    }
  }, [user]);

  if (teamRanks.length === 0) return <LeaderboardSkeleton />;
  return (
    <ul className='pb-4'>
      {teamRanks.map((teamRank) => (
        <li key={teamRank.id}>
          <LeaderboardCard currentTeam={currentTeam} teamRank={teamRank} />
        </li>
      ))}
    </ul>
  );
}

export default React.memo(LeaderboardList);
