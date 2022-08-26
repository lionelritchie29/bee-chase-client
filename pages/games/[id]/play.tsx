import { GetServerSideProps, NextPage } from 'next';
import {
  ChartBarIcon,
  ClipboardListIcon,
  DocumentTextIcon,
  UserGroupIcon,
} from '@heroicons/react/outline';
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
import { redirectToHome, redirectToTeamPage } from '../../../lib/server-redirect-helper';
import { GameMissionService } from '../../../services/GameMissionService';
import { Game } from '../../../models/Game';
import { GameMission } from '../../../models/GameMission';
import { useRouter } from 'next/router';
import FeedList from '../../../components/games/feeds/FeedList';

type Props = {
  game: Game;
  missions: GameMission[];
};

const PlayGamePage: NextPage<Props> = ({ game, missions }) => {
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
      title: 'Feeds',
      icon: <DocumentTextIcon className='w-5 h-5' />,
    },
    {
      id: 4,
      title: 'My Team',
      icon: <UserGroupIcon className='w-5 h-5' />,
    },
  ];
  const router = useRouter();
  const [activeNavItemId, setActiveNavItemId] = useState(1);

  const remainingMissions = missions.filter((mission) => mission.submissions.length === 0);
  const completedMissions = missions.filter((mission) => mission.submissions.length > 0);

  const renderContent = () => {
    switch (activeNavItemId) {
      case 1:
        return (
          <MissionList
            game={game}
            remainingMissions={remainingMissions}
            completedMissions={completedMissions}
          />
        );
      case 2:
        return <LeaderboardList key={game.id} gameId={game.id} />;
      case 3:
        return <FeedList key={game.id} gameId={game.id} />;
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
  const missionService = new GameMissionService(user.access_token);

  const game = await gameService.get(id);
  if (!game) redirectToHome();

  const currentTeam = await teamService.checkUserAlreadyInTeam(game.id);
  if (!currentTeam) return redirectToTeamPage(game.id);

  const missions = await missionService.getByGame(game.id);

  const missionsWithFilteredSubmissions = missions.map((mission) => {
    const filteredSub = mission.submissions.filter(
      (s) => s.game_team_id == currentTeam.game_team_id,
    );
    mission.submissions = filteredSub;
    return mission;
  });

  return {
    props: {
      game,
      missions: missionsWithFilteredSubmissions,
    },
  };
};

export default PlayGamePage;
