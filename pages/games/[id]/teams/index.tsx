import { ChevronRightIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import GameDetailHeader from '../../../../components/games/GameDetailHeader';
import TeamCard from '../../../../components/teams/TeamCard';
import useLoading from '../../../../hooks/use-loading';
import { isGameExpired, isIndividualGame } from '../../../../lib/game-utils';
import {
  redirectToHome,
  redirectToLogin,
  redirectToPlay,
} from '../../../../lib/server-redirect-helper';
import { Game } from '../../../../models/Game';
import { GameTeam } from '../../../../models/GameTeam';
import { SessionUser } from '../../../../models/SessionUser';
import { GameService } from '../../../../services/GameService';
import { GameTeamService } from '../../../../services/GameTeamService';
import Layout from '../../../../widgets/Layout';
import { authOptions } from '../../../api/auth/[...nextauth]';

const InputTeamCodeModal = dynamic(() => import('../../../../components/teams/InputTeamCodeModal'));

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
    setSelectedTeamId(teamId);
    setOpenModal(true);
  };

  const joinTeam = async (teamId: string, accessCode: string | null) => {
    try {
      const team = gameTeams.find((t) => t.id === teamId);
      if (team) {
        await teamService.join(team.game_id, team.id, accessCode);
        setOpenModal(false);
        router.push(`/games/${game.id}/play`);
        finish();
      }
    } catch (e: any) {
      console.log(e);
      finish('Fail to assign team, make sure the access code is correct', { success: false });
    }
  };

  return (
    <Layout controlSpacing={false}>
      <GameDetailHeader game={game} />

      {isIndividualGame(game) && (
        <div className='border border-blue-300 bg-blue-100 rounded p-2 mx-3 text-sm text-blue-400 mb-2'>
          This is an individual game, each team will only consist of one member.
        </div>
      )}
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
            <TeamCard game={game} verifyTeam={verifyTeam} key={team.id} team={team} />
          </li>
        ))}
      </ul>

      <InputTeamCodeModal
        key={selectedTeamId}
        selectedTeam={selectedTeam!}
        isOpen={openModal}
        setIsOpen={setOpenModal}
        joinTeam={joinTeam}
        game={game}
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
  if (isGameExpired(game)) return redirectToHome();

  const alreadyInTeam = await teamService.checkUserAlreadyInTeam(game.id);
  if (alreadyInTeam) return redirectToPlay(game.id);

  const teams = await teamService.getByGameId(game.id);

  return {
    props: {
      game,
      gameTeams: teams,
    },
  };
};

export default GameTeamsPage;
