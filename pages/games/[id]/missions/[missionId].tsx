import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import MissionCard from '../../../../components/games/MissionCard';
import { redirectToHome, redirectToPlay } from '../../../../lib/server-redirect-helper';
import { Game } from '../../../../models/Game';
import { GameMission } from '../../../../models/GameMission';
import { SessionUser } from '../../../../models/SessionUser';
import { GameMissionService } from '../../../../services/GameMissionService';
import { GameService } from '../../../../services/GameService';
import { GameTeamService } from '../../../../services/GameTeamService';
import Layout from '../../../../widgets/Layout';
import { authOptions } from '../../../api/auth/[...nextauth]';

type Props = {
  game: Game;
  mission: GameMission;
};

const MissionDetailPage: NextPage<Props> = ({ game, mission }) => {
  console.log({ game, mission });
  return (
    <Layout controlSpacing={false} className='bg-gray-100'>
      <MissionCard mission={mission} className='pt-3' />

      <div className='px-3'>
        <button className='btn btn-primary text-white w-full shadow'>Submit Evidence</button>
      </div>
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

  const { id, missionId } = params as any;
  const user = session.user as SessionUser;
  const gameService = new GameService(user.access_token);
  const teamService = new GameTeamService(user.access_token);
  const missionService = new GameMissionService(user.access_token);

  const game = await gameService.get(id);
  if (!game) return redirectToHome();

  const alreadyInTeam = await teamService.checkUserAlreadyInTeam(game.id);
  if (!alreadyInTeam) return redirectToPlay(game.id);

  const mission = await missionService.get(game.id, missionId);
  if (!mission) return redirectToPlay(game.id);

  return {
    props: {
      game,
      mission,
    },
  };
};

export default MissionDetailPage;
