import { NextPage } from 'next';
import { ChartBarIcon, ClipboardListIcon, BellIcon } from '@heroicons/react/outline';
import Layout from '../../widgets/Layout';
import GameBottomNavbar from '../../widgets/BottomNavbar';
import { BottomNavbarItem } from '../../models/view/BottomNavbarItem';
import { useState } from 'react';
import LeaderboardList from '../../components/games/LeaderboardList';

const GamePage: NextPage = () => {
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

  const getContent = () => {
    switch (activeNavItemId) {
      case 1:
        return '1';
      case 2:
        return <LeaderboardList />;
      default:
        return 'hehe';
    }
  };

  return (
    <Layout controlSpacing={false}>
      {getContent()}

      <GameBottomNavbar
        activeItemId={activeNavItemId}
        setActiveItemId={setActiveNavItemId}
        items={bottomNavItems}
      />
    </Layout>
  );
};

export default GamePage;
