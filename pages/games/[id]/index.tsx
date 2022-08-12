import { LockClosedIcon, PlayIcon, StopIcon } from '@heroicons/react/outline';
import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import GameDetailHeader from '../../../components/games/GameDetailHeader';
import { redirectToHome, redirectToLogin } from '../../../lib/server-redirect-helper';
import { Game } from '../../../models/Game';
import { SessionUser } from '../../../models/SessionUser';
import { GameService } from '../../../services/GameService';
import Layout from '../../../widgets/Layout';
import { authOptions } from '../../api/auth/[...nextauth]';

type Props = {
  game: Game;
};

const GameIndexPage: NextPage<Props> = ({ game }) => {
  const router = useRouter();
  const { id } = router.query;

  const items = [
    {
      id: 1,
      title: 'START',
      value: game.start_time ?? 'TBD',
      icon: <PlayIcon className='w-5 h-5'></PlayIcon>,
    },
    {
      id: 2,
      title: 'END',
      value: game.end_time || 'TBD',
      icon: <StopIcon className='w-5 h-5'></StopIcon>,
    },
    {
      id: 3,
      title: 'PASSWORD',
      value: game?.password ? 'ON' : 'OFF',
      icon: <LockClosedIcon className='w-5 h-5'></LockClosedIcon>,
    },
  ];

  return (
    <Layout controlSpacing={false}>
      <GameDetailHeader game={game} />

      <ul className='flex flex-col divide-y'>
        {items.map((item) => (
          <li key={item.id} className='flex justify-between w-full px-4 py-3'>
            <div className='font-semibold text-gray-400 flex items-center'>
              {item.icon}
              <span className='block ml-2'>{item.title}</span>
            </div>
            <div className='font-semibold'>{item.value}</div>
          </li>
        ))}
      </ul>

      <div className='px-4 mt-4'>
        <Link href={`/games/${id}/teams`}>
          <button className='w-full text-white btn btn-primary'>Select Team & Join Game</button>
        </Link>
      </div>
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

export default GameIndexPage;
