import dynamic from 'next/dynamic';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useLoading from '../../hooks/use-loading';
import { CreateSubmissionDto } from '../../models/dto/submissions/create-submission.dto';
import { GameMission } from '../../models/GameMission';
import { GameTeamUser } from '../../models/GameTeamUser';
import { LocationMissionData } from '../../models/mission-data/LocationMissionData';

type Props = {
  submit: (dto: CreateSubmissionDto) => void;
  teamUser: GameTeamUser;
  isLoading: boolean;
  position: { lat: number; long: number };
  mission: GameMission;
};

type FormData = {
  caption: string;
  latitude: string;
  longitude: string;
};

export default function InputLocationAnswer({
  submit,
  teamUser,
  isLoading,
  position,
  mission,
}: Props) {
  const {
    location: { latitude, longitude },
  } = JSON.parse(mission.mission_data) as LocationMissionData;
  const MapWithNoSSR = dynamic(() => import('../shared/Map'), {
    ssr: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async ({ latitude, longitude, caption }) => {
    console.log({ latitude, longitude, caption });
  });

  return (
    <form onSubmit={onSubmit}>
      <div className='w-full h-72' id='map'>
        <MapWithNoSSR
          targetLatitude={latitude}
          targetLongitude={longitude}
          sourceLatitude={position.lat}
          sourceLongitude={position.long}
        />
      </div>

      <input
        {...register('caption')}
        type='text'
        placeholder='Caption (optional)'
        className='input input-bordered w-full mt-2'
      />
      <button
        type='submit'
        disabled={isLoading}
        className={`btn ${
          isLoading ? 'btn-disabled' : 'btn-primary'
        } text-white w-full shadow mt-3`}>
        Submit Answer
      </button>
    </form>
  );
}
