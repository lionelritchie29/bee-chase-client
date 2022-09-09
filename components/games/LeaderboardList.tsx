import { useSession } from 'next-auth/react';
import React from 'react';
import useSWR from 'swr';
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

  const { data } = useSWR<(GameTeam & GameTeamRank)[]>(user && 'leaderboard', () =>
    gameService.getLeaderboard(game.id),
  );

  if (!data) return <LeaderboardSkeleton />;
  return (
    <ul className='pb-4'>
      {data.map((teamRank) => (
        <li key={teamRank.id}>
          <LeaderboardCard currentTeam={currentTeam} teamRank={teamRank} />
        </li>
      ))}
    </ul>
  );
}

export default React.memo(LeaderboardList);
