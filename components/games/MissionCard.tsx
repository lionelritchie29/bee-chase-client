import {
  CameraIcon,
  ListBulletIcon,
  DocumentTextIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AnswerType } from '../../constants/answer-type';
import { GameMission } from '../../models/GameMission';

type Props = {
  className?: string;
  mission: GameMission;
};

export default function MissionCard({ className, mission }: Props) {
  const router = useRouter();

  const getIcon = () => {
    switch (mission.answer_type) {
      case AnswerType.IMAGE:
        return <CameraIcon className='w-12 h-12 text-orange-300' />;
      case AnswerType.TEXT:
        return <DocumentTextIcon className='w-12 h-12 text-orange-300' />;
      case AnswerType.GPS:
        return <MapPinIcon className='w-12 h-12 text-orange-300' />;
      case AnswerType.MULTIPLE_CHOICE:
        return <ListBulletIcon className='w-12 h-12 text-orange-300' />;
      case AnswerType.VERIFICATION:
        return <ShieldCheckIcon className='w-12 h-12 text-orange-300' />;
      default:
        return <QuestionMarkCircleIcon className='w-12 h-12 text-orange-300' />;
    }
  };

  return (
    <div
      className='w-full'
      onClick={() => router.push(`/games/${mission.game_id}/missions/${mission.id}`)}>
      <div className={`mb-3 pb-3 ${className} border-b bg-white`}>
        <div className='mx-3 flex'>
          <div className='border-2 border-orange-300 rounded w-24 h-24 flex items-center justify-center relative'>
            <div className='border border-secondary text-secondary rounded-full w-5 h-5 text-center absolute top-1 left-1 text-xs'>
              {mission.mission_index}
            </div>
            {getIcon()}
          </div>

          <div className='ml-3 flex-1'>
            <div className='flex justify-between items-start'>
              <div className='font-bold'>{mission.name}</div>
              <div className='text-gray-400 font-semibold flex items-center'>
                <span className='badge badge-outline mt-1'>{mission.point_value}pts</span>
              </div>
            </div>
            <div
              className='text-gray-400 text-sm mt-1'
              style={{ wordBreak: 'break-word' }}
              dangerouslySetInnerHTML={{ __html: mission.description }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
