import { GetServerSideProps, NextPage } from 'next';
import { ChartBarIcon, ClipboardListIcon, BellIcon } from '@heroicons/react/outline';
import Layout from '../../../widgets/Layout';
import GameBottomNavbar from '../../../widgets/BottomNavbar';
import { BottomNavbarItem } from '../../../models/view/BottomNavbarItem';
import { useState } from 'react';
import LeaderboardList from '../../../components/games/LeaderboardList';
import MissionList from '../../../components/games/MissionList';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]';
import { GameService } from '../../../services/GameService';
import { SessionUser } from '../../../models/SessionUser';
import { GameTeamService } from '../../../services/GameTeamService';
import {
  redirectToHome,
  redirectToPlay,
  redirectToTeamPage,
} from '../../../lib/server-redirect-helper';

const PlayGamePage: NextPage = () => {
  const bottomNavItems: BottomNavbarItem[] = [
    {
      id: 1,
      title: 'Mission',
      icon: <ClipboardListIcon className='w-5 h-5' />,
    },
    {
      id: 2,
      title: 'Leaderboards',
      icon: <ChartBarIcon className='w-5 h-5' />,
    },
    {
      id: 3,
      title: 'Notifications',
      icon: <BellIcon className='w-5 h-5' />,
    },
  ];
  const [activeNavItemId, setActiveNavItemId] = useState(1);

  const renderContent = () => {
    switch (activeNavItemId) {
      case 1:
        return <MissionList />;
      case 2:
        return <LeaderboardList />;
      default:
        return 'hehe';
    }
  };

  return (
    <Layout controlSpacing={false}>
      {renderContent()}

      <GameBottomNavbar
        activeItemId={activeNavItemId}
        setActiveItemId={setActiveNavItemId}
        items={bottomNavItems}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  const { id } = params as any;

  const user = session?.user as SessionUser;
  const gameService = new GameService(user.access_token);
  const teamService = new GameTeamService(user.access_token);

  const game = await gameService.get(id);
  if (!game) redirectToHome();

  const alreadyInTeam = await teamService.checkUserAlreadyInTeam(game.id);
  console.log({ alreadyInTeam });
  if (!alreadyInTeam) return redirectToTeamPage(game.id);

  return {
    props: {
      game,
    },
  };
};

export default PlayGamePage;
