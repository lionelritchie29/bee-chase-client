import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import MissionCard from '../../../../components/games/MissionCard';
import InputFileAnswer from '../../../../components/missions/InputFileAnswer';
import InputLocationAnswer from '../../../../components/missions/InputLocationAnswer';
import InputMultipleChoiceAnswer from '../../../../components/missions/InputMultipleChoiceAnswer';
import InputTextAnswer from '../../../../components/missions/InputTextAnswer';
import InputVerificationAnswer from '../../../../components/missions/InputVerificationAnswer';
import { AnswerType } from '../../../../constants/answer-type';
import useLoading from '../../../../hooks/use-loading';
import { isGameExpired } from '../../../../lib/game-utils';
import { redirectToHome, redirectToPlay } from '../../../../lib/server-redirect-helper';
import { CreateSubmissionDto } from '../../../../models/dto/submissions/create-submission.dto';
import { Game } from '../../../../models/Game';
import { GameMission } from '../../../../models/GameMission';
import { GameTeamUser } from '../../../../models/GameTeamUser';
import { SessionUser } from '../../../../models/SessionUser';
import { Submission } from '../../../../models/Submission';
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
  const [submission, setSubmission] = useState<Submission | null>(
    mission.submissions.length > 0 ? mission.submissions[0] : null,
  );

  const submitAnswer = async (dto: CreateSubmissionDto) => {
    try {
      load('Submitting your answer...');
      const sub = await submissionService.create(game.id, mission.id, dto);
      setSubmission(sub);
      finish('Answer submitted!');
    } catch (e: any) {
      finish(e.response.data, { success: false });
    }
  };

  const renderInput = () => {
    if (isGameExpired(game) && !submission) {
      return <div className='justify-center flex mt-8'>The game has been ended.</div>;
    }

    if (mission.answer_type === AnswerType.TEXT) {
      return (
        <InputTextAnswer
          submission={submission}
          isLoading={isLoading}
          teamUser={teamUser}
          submit={submitAnswer}
        />
      );
    } else if (mission.answer_type === AnswerType.IMAGE) {
      return (
        <InputFileAnswer
          mission={mission}
          isLoading={isLoading}
          teamUser={teamUser}
          game={game}
          submit={submitAnswer}
          submission={submission}
        />
      );
    } else if (mission.answer_type === AnswerType.GPS) {
      return (
        <InputLocationAnswer
          submission={submission}
          isLoading={isLoading}
          mission={mission}
          teamUser={teamUser}
          submit={submitAnswer}
        />
      );
    } else if (mission.answer_type === AnswerType.MULTIPLE_CHOICE) {
      return (
        <InputMultipleChoiceAnswer
          mission={mission}
          submission={submission}
          isLoading={isLoading}
          teamUser={teamUser}
          submit={submitAnswer}
        />
      );
    } else if (mission.answer_type === AnswerType.VERIFICATION) {
      return (
        <InputVerificationAnswer
          submission={submission}
          isLoading={isLoading}
          teamUser={teamUser}
          submit={submitAnswer}
        />
      );
    } else {
      return <div className='px-3'>No suitable input</div>;
    }
  };

  return (
    <Layout controlSpacing={false} title={game.name} className='bg-gray-100'>
      <MissionCard mission={mission} className='pt-3' />

      <div className='px-3'>{renderInput()}</div>
      {submission && (
        <div className='text-center'>
          <div
            className={`text-sm mt-6 ${
              submission.is_accepted == null || submission.is_accepted
                ? 'text-green-600'
                : 'text-red-400'
            }`}>
            Your answer is{' '}
            {!submission.is_accepted == null || submission.is_accepted ? 'correct' : 'incorrect'}
          </div>

          <div>
            Submitted by: <span className='font-bold'>{submission.user?.name}</span>
          </div>
        </div>
      )}
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
  const currDate = new Date();
  if (!game) return redirectToHome();
  if (!game.start_time || !game.end_time) return redirectToPlay(game.id);
  if (currDate.getTime() < new Date(game.start_time).getTime()) return redirectToPlay(game.id);

  const teamUser = await teamService.checkUserAlreadyInTeam(game.id);
  if (!teamUser) return redirectToPlay(game.id);

  const mission = await missionService.get(game.id, missionId);
  if (!mission) return redirectToPlay(game.id);

  mission.submissions = mission.submissions.filter(
    (sub) => sub.game_team_id === teamUser.game_team_id,
  );

  return {
    props: {
      game,
      mission,
      teamUser,
    },
  };
};

export default MissionDetailPage;
