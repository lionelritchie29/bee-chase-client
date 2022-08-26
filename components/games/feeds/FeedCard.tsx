import { AnswerType } from '../../../constants/answer-type';
import { GameMission } from '../../../models/GameMission';
import { GameTeam } from '../../../models/GameTeam';
import { Submission } from '../../../models/Submission';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { TextAnswerData } from '../../../models/answer-data/TextAnswerData';
import { FileAnswerData } from '../../../models/answer-data/FileAnswerData';
import OnedriveImage from '../../shared/OnedriveImage';
import dynamic from 'next/dynamic';
import { LocationAnswerData } from '../../../models/answer-data/LocationAnswerData';

type Props = {
  submission: Submission & { mission: GameMission } & { game_team: GameTeam };
};

export default function FeedCard({ submission }: Props) {
  const renderContent = () => {
    let answer = null;
    switch (submission.mission.answer_type) {
      case AnswerType.TEXT:
        answer = JSON.parse(submission.answer_data) as TextAnswerData;
        return (
          <div key={submission.id}>
            Answered: <b>{answer.text}</b>
          </div>
        );
      case AnswerType.IMAGE:
        answer = JSON.parse(submission.answer_data) as FileAnswerData;
        return <OnedriveImage submission={submission} key={submission.id} />;
      case AnswerType.GPS:
        const MapWithNoSSR = dynamic(() => import('../../shared/Map'), {
          ssr: false,
        });
        answer = JSON.parse(submission.answer_data) as LocationAnswerData;
        return (
          <div className='h-64'>
            <MapWithNoSSR
              radius={0}
              targetLatitude={0}
              targetLongitude={0}
              sourceLatitude={answer.latitude}
              sourceLongitude={answer.longitude}
              dragging={false}
            />
          </div>
        );
      default:
        return <div className='text-sm text-gray-400'>Answer cant be displayed.</div>;
    }
  };

  return (
    <div className='border bg-white rounded shadow p-4'>
      <div className='flex items-center'>
        <div
          className='h-12 w-14 rounded-full border'
          style={{ backgroundColor: submission.game_team.color || '#fff' }}></div>

        <div className='ml-2 w-full'>
          <div className='flex justify-between'>
            <div className='font-bold truncate'>{submission.game_team.name}</div>
            <div className='text-xs'>
              {formatDistanceToNow(new Date(submission.created_at))} ago
            </div>
          </div>
          <div className='text-sm font-normal'>
            <span className='font-semibold truncate'>{submission.mission.name}</span> &#x2022;{' '}
            <span>{submission.mission.point_value} points</span>
          </div>
        </div>
      </div>

      <div className='mt-4'>{renderContent()}</div>

      {submission.caption && <div className='mt-2 text-gray-600'>{submission.caption}</div>}
    </div>
  );
}
