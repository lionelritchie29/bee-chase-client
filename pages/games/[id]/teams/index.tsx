import { ChevronRightIcon, PlusCircleIcon } from '@heroicons/react/outline';
import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import GameDetailHeader from '../../../../components/games/GameDetailHeader';
import InputTeamCodeModal from '../../../../components/teams/InputTeamCodeModal';
import TeamCard from '../../../../components/teams/TeamCard';
import useLoading from '../../../../hooks/use-loading';
import { redirectToHome, redirectToLogin } from '../../../../lib/server-redirect-helper';
import { Game } from '../../../../models/Game';
import { GameTeam } from '../../../../models/GameTeam';
import { SessionUser } from '../../../../models/SessionUser';
import { GameService } from '../../../../services/GameService';
import { GameTeamService } from '../../../../services/GameTeamService';
import Layout from '../../../../widgets/Layout';
import { authOptions } from '../../../api/auth/[...nextauth]';

type Props = {
  game: Game;
  gameTeams: GameTeam[];
};

const GameTeamsPage: NextPage<Props> = ({ game, gameTeams }) => {
  const router = useRouter();
  const { id } = router.query;

  const session = useSession();
  const user = session?.data?.user as SessionUser;
  const teamService = new GameTeamService(user?.access_token);

  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [{ load, finish, isLoading }] = useLoading(false);

  const selectedTeam = gameTeams.find((t) => t.id === selectedTeamId);

  const verifyTeam = (teamId: string) => {
    const team = gameTeams.find((t) => t.id === teamId);
    if (!team) {
      toast('Ups, team does not exist');
      return;
    }

    setSelectedTeamId(team.id);
    if (team.has_access_code) {
      setOpenModal(true);
    } else {
      joinTeam(teamId, null);
    }
  };

  const joinTeam = async (teamId: string, accessCode: string | null) => {
    try {
      const team = gameTeams.find((t) => t.id === teamId);
      if (team && confirm(`Are you sure you want to join ${team?.name} ?`)) {
        load('Assigning you to the team...');
        await teamService.join(team!.game_id, team!.id, accessCode);
        setOpenModal(false);
        finish('Assign success!');
      }
    } catch (e: any) {
      console.log(e);
      finish('Fail to assign team, make sure the access code is correct', { success: false });
    }
  };

  return (
    <Layout controlSpacing={false}>
      <GameDetailHeader game={game} />

      <div className='bg-gray-200 py-2 px-4 font-semibold uppercase text-sm'>Select Team</div>
      <ul>
        {game.allow_user_create_team && (
          <li>
            <Link href={`/games/${id}/teams/create`}>
              <div className='w-full flex justify-between items-center p-4 border-b'>
                <div className='flex items-center text-orange-400'>
                  <PlusCircleIcon className='w-6 h-6 mr-2' />
                  <span className='block font-semibold'>Create Team</span>
                </div>
                <ChevronRightIcon className='w-5 h-5' />
              </div>
            </Link>
          </li>
        )}

        {gameTeams.length === 0 && game.allow_user_create_team && (
          <li className='px-4 mt-2 text-sm'>No teams have been created yet. Create one now!</li>
        )}

        {gameTeams.length === 0 && !game.allow_user_create_team && (
          <li className='px-4 mt-2 text-sm'>
            No teams have been created yet. Please contact your admin.
          </li>
        )}

        {gameTeams.map((team) => (
          <li key={team.id}>
            <TeamCard verifyTeam={verifyTeam} key={team.id} team={team} />
          </li>
        ))}
      </ul>

      <InputTeamCodeModal
        key={selectedTeamId}
        selectedTeam={selectedTeam!}
        isOpen={openModal}
        setIsOpen={setOpenModal}
        joinTeam={joinTeam}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return redirectToLogin();

  const { id } = params as any;
  const user = session.user as SessionUser;
  const gameService = new GameService(user.access_token);
  const teamService = new GameTeamService(user.access_token);

  const game = await gameService.get(id);
  if (!game) return redirectToHome();

  const teams = await teamService.getByGameId(game.id);

  return {
    props: {
      game,
      gameTeams: teams,
    },
  };
};

export default GameTeamsPage;
