import { useSession } from 'next-auth/react';
import React from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { SWR_KEY } from '../../constants/swr-key';
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

  const { cache } = useSWRConfig();
  const { data } = useSWR<(GameTeam & GameTeamRank)[]>(
    user && SWR_KEY.LEADERBOARD,
    () => gameService.getLeaderboard(game.id),
    { revalidateOnMount: !cache.get(SWR_KEY.LEADERBOARD) },
  );

  if (!data) return <LeaderboardSkeleton />;
  return (
    <>
      <div className='mx-3 text-xs text-blue-400'>
        Leaderboard will be updated every 1 minute (ex: 11:01, 11:02, etc)
      </div>
      <ul className='pb-4'>
        {data.map((teamRank) => (
          <li key={teamRank.id}>
            <LeaderboardCard currentTeam={currentTeam} teamRank={teamRank} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default React.memo(LeaderboardList);
