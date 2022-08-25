import Layout from '../widgets/Layout';
import InputGameCode from '../components/home/InputGameCode';
import { GetServerSideProps, NextPage } from 'next';
import GameList from '../components/home/GameList';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { SessionUser } from '../models/SessionUser';
import { GameService } from '../services/GameService';
import { Game } from '../models/Game';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

type Props = {
  activeGames: Game[];
  futureGames: Game[];
  passedGames: Game[];
};

const Home: NextPage<Props> = ({ activeGames, futureGames, passedGames }) => {
  const session = useSession();
  const user = session?.data?.user as SessionUser;

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

  const renderGames = () => {
    switch (activeTabId) {
      case 1:
        return <GameList title={'passed'} games={passedGames} />;
      case 2:
        return <GameList title={'active'} games={activeGames} />;
      case 3:
        return <GameList title={'future'} games={futureGames} />;
    }
  };

  return (
    <Layout className='bg-gray-50 min-h-screen pt-3'>
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

  const user = session.user as SessionUser;
  const gameService = new GameService(user?.access_token);
  const games = await gameService.getCurrentJoinedGames();

  const activeGames = games.filter((game) => {
    if (!game.start_time || !game.end_time) return false;
    const currDate = new Date();
    const startDate = new Date(game.start_time);
    const endDate = new Date(game.end_time);
    return currDate.getTime() >= startDate.getTime() && currDate.getTime() <= endDate.getTime();
  });

  const futureGames = games.filter((game) => !game.start_time || !game.end_time);

  const passedGames = games.filter((game) => {
    if (!game.start_time || !game.end_time) return false;
    const currDate = new Date();
    const endDate = new Date(game.end_time);
    return currDate.getTime() >= endDate.getTime();
  });

  return {
    props: {
      activeGames,
      passedGames,
      futureGames,
    },
  };
};

export default Home;
