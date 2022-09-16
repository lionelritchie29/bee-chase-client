import Layout from '../widgets/Layout';
import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { SessionUser } from '../models/SessionUser';
import { GameService } from '../services/GameService';
import { Game } from '../models/Game';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import useSWR from 'swr';
import { SWR_KEY } from '../constants/swr-key';
import GameListSkeleton from '../components/skeletons/GameListSkeleton';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

const GameList = dynamic(() => import('../components/home/GameList'));

const Home: NextPage = () => {
  const session = useSession();
  const router = useRouter();
  const user = session?.data?.user as SessionUser;
  const gameService = new GameService(user?.access_token);

  const tabs = [
    {
      id: 1,
      title: 'Passed',
    },
    {
      id: 2,
      title: 'Active',
    },
    {
      id: 3,
      title: 'Future',
    },
  ];

  const [activeTabId, setActiveTabId] = useState(2);

  const { data: games } = useSWR<Game[]>(user && SWR_KEY.MY_GAMES, () =>
    gameService.getCurrentJoinedGames(),
  );

  if (!games) {
    return <GameListSkeleton user={user} />;
  }

  const activeGames = games.filter((game) => {
    if (!game.start_time || !game.end_time) return false;
    const currDate = new Date();
    const startDate = new Date(game.start_time);
    const endDate = new Date(game.end_time);
    return currDate.getTime() >= startDate.getTime() && currDate.getTime() <= endDate.getTime();
  });

  const futureGames = games.filter((game) => {
    if (!game.start_time || !game.end_time) return true;
    const currDate = new Date();
    const startDate = new Date(game.start_time);
    return startDate.getTime() > currDate.getTime();
  });

  const passedGames = games.filter((game) => {
    if (!game.start_time || !game.end_time) return false;
    const currDate = new Date();
    const endDate = new Date(game.end_time);
    return currDate.getTime() >= endDate.getTime();
  });

  const renderGames = () => {
    switch (activeTabId) {
      case 1:
        return <GameList title={'passed'} games={passedGames} />;
      case 2:
        return (
          <GameList
            title={'active'}
            games={[
              ...activeGames,
              ...activeGames,
              ...activeGames,
              ...activeGames,
              ...activeGames,
              ...activeGames,
              ...activeGames,
            ]}
          />
        );
      case 3:
        return <GameList title={'future'} games={futureGames} />;
    }
  };

  return (
    <Layout className='bg-gray-50 min-h-screen pt-3 mb-12'>
      <div className='font-semibold text-orange-400 border rounded py-2 px-3 shadow-xs bg-white'>
        Welcome, {user?.name}
      </div>

      <div style={{ padding: '0.1rem' }} className='bg-white tabs mt-3 rounded-md border'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            className={`tab w-1/3 ${
              activeTabId === tab.id ? 'bg-orange-400 text-white rounded shadow' : ''
            }`}>
            {tab.title}
          </button>
        ))}
      </div>

      {renderGames()}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Home;
