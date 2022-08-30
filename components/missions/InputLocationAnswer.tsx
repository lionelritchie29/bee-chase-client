import dynamic from 'next/dynamic';
import { useEffect } from 'react';
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
  position: { lat: number; long: number };
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
  position,
  mission,
  submission,
}: Props) {
  const { latitude, longitude, radius, description } = JSON.parse(
    mission.mission_data,
  ) as LocationMissionData;

  const MapWithNoSSR = dynamic(() => import('../shared/Map'), {
    ssr: false,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (submission) {
      const ans = JSON.parse(submission.answer_data) as LocationAnswerData;
      setValue('caption', submission.caption);
      setValue('latitude', ans.latitude);
      setValue('longitude', ans.longitude);
    } else {
      setValue('latitude', position.lat);
      setValue('longitude', position.long);
    }
  }, [submission, setValue, position]);

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
          sourceLatitude={position.lat}
          sourceLongitude={position.long}
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
