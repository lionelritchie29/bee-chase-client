import { ChevronRightIcon, PlusCircleIcon } from '@heroicons/react/outline';
import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import GameDetailHeader from '../../../../components/games/GameDetailHeader';
import TeamCard from '../../../../components/teams/TeamCard';
import { redirectToHome, redirectToLogin } from '../../../../lib/server-redirect-helper';
import { Game } from '../../../../models/Game';
import { SessionUser } from '../../../../models/SessionUser';
import { GameService } from '../../../../services/GameService';
import Layout from '../../../../widgets/Layout';
import { authOptions } from '../../../api/auth/[...nextauth]';

type Props = {
  game: Game;
};

const GameTeamsPage: NextPage<Props> = ({ game }) => {
  const router = useRouter();
  const { id } = router.query;
  const dummy = [
    {
      id: 1,
      name: 'Team 1',
    },
    {
      id: 2,
      name: 'Team 2',
    },
    {
      id: 3,
      name: 'Team 3',
    },
  ];

  return (
    <Layout controlSpacing={false}>
      <GameDetailHeader game={game} />

      <div className='bg-gray-200 py-2 px-4 font-semibold uppercase text-sm'>Select Team</div>
      <ul>
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

        {dummy.length === 0 && (
          <li className='px-4 mt-2 text-sm'>No teams have been created yet. Create one now!</li>
        )}

        {dummy.map((team) => (
          <li key={team.id}>
            <TeamCard />
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return redirectToLogin();

  const { id } = params as any;
  const user = session.user as SessionUser;
  const gameService = new GameService(user.access_token);
  const game = await gameService.get(id);

  if (!game) return redirectToHome();

  return {
    props: {
      game,
    },
  };
};

export default GameTeamsPage;
