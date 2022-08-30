import {
  CameraIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  DocumentTextIcon,
  LocationMarkerIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/outline';
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
        return <LocationMarkerIcon className='w-12 h-12 text-orange-300' />;
      case AnswerType.MULTIPLE_CHOICE:
        return <CheckCircleIcon className='w-12 h-12 text-orange-300' />;
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
          <div className='border-2 border-orange-300 rounded w-24 h-24 flex items-center justify-center'>
            {getIcon()}
          </div>

          <div className='ml-3 flex-1'>
            <div className='flex justify-between'>
              <div className='font-bold'>{mission.name}</div>
              <div className='text-gray-400 font-semibold flex items-center'>
                <span className='badge badge-outline'>{mission.point_value}pts</span>
                {/* <ChevronRightIcon className='w-4 h-4 ml-2 text-orange-400' /> */}
              </div>
            </div>
            <div className='text-gray-400 text-sm'>{mission.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
