import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { COLORS } from '../../../constants/color';
import { GameTeam, GameTeamRank } from '../../../models/GameTeam';
import { GameTeamUser } from '../../../models/GameTeamUser';
import { PaginatedSubmission } from '../../../models/PaginatedSubmissions';
import { SessionUser } from '../../../models/SessionUser';
import { GameTeamService } from '../../../services/GameTeamService';
import FeedList from '../feeds/FeedList';
import TeamMembersSkeleton from './TeamMembersSkeleton';

type Props = {
  teamRank: (GameTeam & GameTeamRank) | null;
  submissions: PaginatedSubmission | null;
  currentTeam: GameTeamUser;
};

export default function MyTeam({ teamRank, submissions, currentTeam }: Props) {
  const session = useSession();
  const user = session?.data?.user as SessionUser;
  const teamService = new GameTeamService(user?.access_token);
  const [members, setMembers] = useState<GameTeamUser[] | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      const team = await teamService.getById(teamRank!.game_id, currentTeam.game_team_id);
      setMembers(team.members);
    };

    if (teamRank && user) fetchTeams();
  }, [teamRank, user]);

  return (
    <section className='mt-6'>
      <div className='border rounded mx-3 py-4'>
        <div className='flex justify-around items-center text-center'>
          <div className='w-1/3'>
            {teamRank ? (
              <span className='block'>{teamRank.missions_sum_point_value}</span>
            ) : (
              <div className='h-4 w-12 bg-gray-300 mx-auto rounded animate-pulse'></div>
            )}

            <span className='block font-semibold'>Points</span>
          </div>

          <div className='w-1/3'>
            <div
              className='rounded-full w-24 h-24 border mx-auto'
              style={{ backgroundColor: teamRank?.color || COLORS.TEAM_DEFAULT }}></div>
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
          {teamRank ? (
            <span className='block mt-2 text-lg font-bold'>{teamRank.name}</span>
          ) : (
            <div className='h-4 w-24 mt-2 bg-gray-300 mx-auto rounded animate-pulse'></div>
          )}
        </div>
      </div>

      <div className='mx-3'>
        <div className='border rounded-t mt-4 p-3 text-sm'>Members</div>
        <ul className=''>
          {members ? (
            members.map((member) => (
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

      <FeedList currentTeam={currentTeam} submissionsPaginated={submissions} />
    </section>
  );
}
