import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import MissionCard from '../../../../components/games/MissionCard';
import InputTextAnswer from '../../../../components/missions/InputTextAnswer';
import { AnswerType } from '../../../../constants/answer-type';
import useLoading from '../../../../hooks/use-loading';
import { redirectToHome, redirectToPlay } from '../../../../lib/server-redirect-helper';
import { CreateSubmissionDto } from '../../../../models/dto/submissions/create-submission.dto';
import { Game } from '../../../../models/Game';
import { GameMission } from '../../../../models/GameMission';
import { GameTeamUser } from '../../../../models/GameTeamUser';
import { SessionUser } from '../../../../models/SessionUser';
import { GameMissionService } from '../../../../services/GameMissionService';
import { GameService } from '../../../../services/GameService';
import { GameTeamService } from '../../../../services/GameTeamService';
import { SubmissionService } from '../../../../services/SubmissionService';
import Layout from '../../../../widgets/Layout';
import { authOptions } from '../../../api/auth/[...nextauth]';

type Props = {
  game: Game;
  mission: GameMission;
  teamUser: GameTeamUser;
};

const MissionDetailPage: NextPage<Props> = ({ game, mission, teamUser }) => {
  const session = useSession();
  const user = session?.data?.user as SessionUser;
  const submissionService = new SubmissionService(user?.access_token);
  const [{ isLoading, finish, load }] = useLoading(false);

  const submitAnswer = async (dto: CreateSubmissionDto) => {
    load('Submitting your answer...');
    const answer = await submissionService.create(game.id, mission.id, dto);
    finish('Answer submitted!');
  };

  const renderInput = () => {
    if (mission.answer_type === AnswerType.TEXT) {
      return <InputTextAnswer isLoading={isLoading} teamUser={teamUser} submit={submitAnswer} />;
    } else if (mission.answer_type === AnswerType.IMAGE) {
      return (
        <div>
          <input type='text' placeholder='Caption' className='input input-bordered w-full' />
          <button className='btn btn-primary text-white w-full shadow mt-2'>Submit Evidence</button>
        </div>
      );
    } else if (mission.answer_type === AnswerType.GPS) {
      return (
        <div>
          <input type='text' placeholder='Caption' className='input input-bordered w-full' />
          <button className='btn btn-primary text-white w-full shadow mt-2'>Submit Location</button>
        </div>
      );
    } else {
      return <div className='px-3'>No suitable input</div>;
    }
  };

  return (
    <Layout controlSpacing={false} className='bg-gray-100'>
      <MissionCard mission={mission} className='pt-3' />

      <div className='px-3'>{renderInput()}</div>
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

  const teamUser = await teamService.checkUserAlreadyInTeam(game.id);
  if (!teamUser) return redirectToPlay(game.id);

  const mission = await missionService.get(game.id, missionId);
  if (!mission) return redirectToPlay(game.id);

  return {
    props: {
      game,
      mission,
      teamUser,
    },
  };
};

export default MissionDetailPage;
