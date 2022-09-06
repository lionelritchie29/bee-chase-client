import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LocationAnswerData } from '../../models/answer-data/LocationAnswerData';
import { CreateSubmissionDto } from '../../models/dto/submissions/create-submission.dto';
import { GameMission } from '../../models/GameMission';
import { GameTeamUser } from '../../models/GameTeamUser';
import { LocationMissionData } from '../../models/mission-data/LocationMissionData';
import { Submission } from '../../models/Submission';

type Props = {
  submit: (dto: CreateSubmissionDto) => void;
  teamUser: GameTeamUser;
  isLoading: boolean;
  mission: GameMission;
  submission: Submission | null;
};

type FormData = {
  caption: string;
  latitude: number;
  longitude: number;
};

export default function InputLocationAnswer({
  submit,
  teamUser,
  isLoading,
  mission,
  submission,
}: Props) {
  const { latitude, longitude, radius, description } = JSON.parse(
    mission.mission_data,
  ) as LocationMissionData;

  const MapWithNoSSR = dynamic(() => import('../shared/Map'), {
    ssr: false,
    loading: () => <div className='text-center'>Loading...</div>,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const [sourceLatitude, setSourceLatitude] = useState(0);
  const [sourceLongitude, setSourceLongitude] = useState(0);

  if (typeof navigator !== 'undefined' && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setSourceLatitude(position.coords.latitude);
        setSourceLongitude(position.coords.longitude);
      },
      (e) => alert('Geolocation is not supported by this browser.'),
    );
  }

  if (submission) {
    const ans = JSON.parse(submission.answer_data) as LocationAnswerData;
    setValue('caption', submission.caption);
    setValue('latitude', ans.latitude);
    setValue('longitude', ans.longitude);
  } else {
    setValue('latitude', sourceLatitude);
    setValue('longitude', sourceLongitude);
  }

  const onSubmit = handleSubmit(async ({ latitude, longitude, caption }) => {
    const dto: CreateSubmissionDto = {
      caption: caption ?? null,
      game_team_id: teamUser.game_team_id,
      answer_data: { latitude, longitude },
    };
    await submit(dto);
  });

  return (
    <form onSubmit={onSubmit}>
      <div className='w-full h-72' id='map'>
        <MapWithNoSSR
          radius={radius}
          targetLatitude={latitude}
          targetLongitude={longitude}
          sourceLatitude={sourceLatitude}
          sourceLongitude={sourceLongitude}
          dragging={!submission}
        />
      </div>

      <input
        {...register('caption')}
        type='text'
        disabled={submission != null}
        placeholder='Caption (optional)'
        className='input input-bordered w-full mt-2'
      />
      <button
        type='submit'
        disabled={isLoading || submission != null}
        className={`btn ${
          isLoading || submission ? 'btn-disabled' : 'btn-primary'
        } text-white w-full shadow mt-3`}>
        {submission ? 'Answered' : 'Submit Answer'}
      </button>
    </form>
  );
}
