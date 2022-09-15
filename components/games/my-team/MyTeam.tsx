import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { COLORS } from '../../../constants/color';
import { SWR_KEY } from '../../../constants/swr-key';
import { Game } from '../../../models/Game';
import { GameTeam, GameTeamRank } from '../../../models/GameTeam';
import { GameTeamUser } from '../../../models/GameTeamUser';
import { SessionUser } from '../../../models/SessionUser';
import { GameTeamService } from '../../../services/GameTeamService';
import FeedList from '../feeds/FeedList';
import TeamMembersSkeleton from './TeamMembersSkeleton';

type Props = {
  currentTeam: GameTeamUser;
  game: Game;
};

export default function MyTeam({ currentTeam, game }: Props) {
  const session = useSession();
  const user = session?.data?.user as SessionUser;
  const teamService = new GameTeamService(user?.access_token);

  const { cache } = useSWRConfig();
  const { data: team } = useSWR<GameTeam>(
    user && SWR_KEY.MY_TEAM,
    () => teamService.getById(game.id, currentTeam.game_team_id),
    { revalidateOnMount: !cache.get(SWR_KEY.MY_TEAM) },
  );
  const { data: teamRank } = useSWR<GameTeam & GameTeamRank>(
    user && SWR_KEY.MY_TEAM_LEADERBOARD,
    () => teamService.getCurrentTeamLeaderboard(game.id, currentTeam.game_team_id),
    { revalidateOnMount: !cache.get(SWR_KEY.MY_TEAM_LEADERBOARD) },
  );

  return (
    <section className='mt-6 pb-8'>
      {!teamRank && (
        <div className='mx-3 text-xs text-blue-400'>
          If this section is still loading, please wait for one minute.
        </div>
      )}
      <div className='border rounded mx-3'>
        <div className='border-b p-3 text-sm uppercase font-bold flex justify-between'>
          <div>My team</div>
          <div>Rank #{teamRank?.rank}</div>
        </div>

        <div className='flex justify-around items-center text-center pt-6'>
          <div className='w-1/3'>
            {teamRank ? (
              <span className='block'>{teamRank.missions_sum_point_value ?? 0}</span>
            ) : (
              <div className='h-4 w-12 bg-gray-300 mx-auto rounded animate-pulse'></div>
            )}

            <span className='block font-semibold'>Points</span>
          </div>

          <div className='w-1/3'>
            <div
              className='rounded-full w-24 h-24 border mx-auto'
              style={{ backgroundColor: team?.color || COLORS.TEAM_DEFAULT }}></div>
          </div>

          <div className='w-1/3'>
            {teamRank ? (
              <span className='block'>{teamRank.submissions_count}</span>
            ) : (
              <div className='h-4 w-12 bg-gray-300 mx-auto rounded animate-pulse'></div>
            )}
            <span className='block font-semibold'>Submissions</span>
          </div>
        </div>
        <div className='text-center'>
          {team ? (
            <span className='block mt-2 text-lg font-bold'>{team.name}</span>
          ) : (
            <div className='h-4 w-24 mt-2 bg-gray-300 mx-auto rounded animate-pulse'></div>
          )}

          <div className='flex justify-center items-center pb-6'>
            {team && team.access_code && (
              <div className='flex'>
                <span className='block mr-1'>Access Code:</span>
                <span className='block font-bold'> {team.access_code}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='mx-3'>
        <div className='border rounded-t mt-4 p-3 text-sm font-bold uppercase'>Current Game</div>
        <ul className=''>
          <li className='text-sm border-r border-l border-b p-2'>{game.name}</li>
        </ul>
      </div>

      <div className='mx-3'>
        <div className='border rounded-t mt-4 p-3 text-sm font-bold uppercase'>Members</div>
        <ul className=''>
          {team && team.members ? (
            team.members.map((member) => (
              <li className='text-sm border-r border-l border-b p-2' key={member.id}>
                {member.user_username} - {member.user_name}
              </li>
            ))
          ) : (
            <TeamMembersSkeleton />
          )}
        </ul>
      </div>

      <div className='divider mx-3'></div>

      <FeedList currentTeam={currentTeam} forMyTeam={true} game={game} />
    </section>
  );
}
