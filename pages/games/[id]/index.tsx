import { LockClosedIcon, PlayIcon, StopIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import GameDetailHeader from '../../../components/games/GameDetailHeader';
import InputGamePassModal from '../../../components/games/InputGamePassModal';
import useLoading from '../../../hooks/use-loading';
import { isGameExpired } from '../../../lib/game-utils';
import {
  redirectToHome,
  redirectToLogin,
  redirectToPlay,
} from '../../../lib/server-redirect-helper';
import { Game } from '../../../models/Game';
import { SessionUser } from '../../../models/SessionUser';
import { GameService } from '../../../services/GameService';
import { GameTeamService } from '../../../services/GameTeamService';
import Layout from '../../../widgets/Layout';
import { authOptions } from '../../api/auth/[...nextauth]';

type Props = {
  game: Game;
};

const GameIndexPage: NextPage<Props> = ({ game }) => {
  const router = useRouter();
  const { id } = router.query;
  const [openModal, setOpenModal] = useState(false);
  const [{ load, finish, isLoading }] = useLoading(false);

  const session = useSession();
  const user = session?.data?.user as SessionUser;
  const gameService = new GameService(user?.access_token);

  const items = [
    {
      id: 1,
      title: 'START',
      value: game.start_time ? format(new Date(game.start_time!), 'dd MMM yyyy, kk:mm') : 'TBD',
      icon: <PlayIcon className='w-5 h-5'></PlayIcon>,
    },
    {
      id: 2,
      title: 'END',
      value: game.start_time ? format(new Date(game.end_time!), 'dd MMM yyyy, kk:mm') : 'TBD',
      icon: <StopIcon className='w-5 h-5'></StopIcon>,
    },
    {
      id: 3,
      title: 'PASSWORD',
      value: game?.has_password ? 'ON' : 'OFF',
      icon: <LockClosedIcon className='w-5 h-5'></LockClosedIcon>,
    },
  ];

  const onClick = () => {
    if (game.has_password) {
      setOpenModal(true);
    } else {
      router.push(`/games/${game.id}/teams`);
    }
  };

  const verifyPass = async (passcode: string) => {
    load('Verifying...');
    const isCorrect = await gameService.verifyPasscode(game.id, passcode);
    if (isCorrect) {
      finish('Verified');
      router.push(`/games/${game.id}/teams`);
    } else {
      finish('Wrong passcode', { success: false });
    }
  };

  return (
    <Layout controlSpacing={false}>
      <GameDetailHeader game={game} />

      <div className='text-sm mt-4 px-4 -mt-6'>{game.description}</div>

      <ul className='flex flex-col divide-y mt-4'>
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
        <button
          disabled={isLoading}
          onClick={onClick}
          className={`w-full text-white btn ${isLoading ? 'btn-disabled' : 'btn-primary'}`}>
          Select Team & Join Game
        </button>
      </div>

      <InputGamePassModal
        isOpen={openModal}
        setIsOpen={setOpenModal}
        verifyPass={verifyPass}
        key={game.id}
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

  const alreadyInTeam = await teamService.checkUserAlreadyInTeam(game.id);
  if (isGameExpired(game) && !alreadyInTeam) return redirectToHome();
  if (alreadyInTeam) return redirectToPlay(game.id);

  return {
    props: {
      game,
    },
  };
};

export default GameIndexPage;
