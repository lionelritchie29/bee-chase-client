import { CameraIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import imageCompression from 'browser-image-compression';
import { useSession } from 'next-auth/react';
import { ChangeEvent, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { MediaType } from '../../constants/media-type';
import { SubmissionSource } from '../../constants/submission-source';
import { CreateSubmissionDto } from '../../models/dto/submissions/create-submission.dto';
import { Game } from '../../models/Game';
import { GameMission } from '../../models/GameMission';
import { GameTeamUser } from '../../models/GameTeamUser';
import { FileMissionData } from '../../models/mission-data/FileMissionData';
import { SessionUser } from '../../models/SessionUser';
import { Submission } from '../../models/Submission';
import {
  OnedriveService,
  OnedriveUploadBytesParams,
  OnedriveUploadSessionParams,
} from '../../services/OnedriveService';
import OnedriveImage from '../shared/OnedriveImage';

type Props = {
  submit: (dto: CreateSubmissionDto) => void;
  teamUser: GameTeamUser;
  isLoading: boolean;
  mission: GameMission;
  game: Game;
  submission: Submission | null;
};

type FormData = {
  caption: string;
};

export default function InputFileAnswer({
  submit,
  teamUser,
  isLoading,
  mission,
  game,
  submission,
}: Props) {
  const { media_type, submission_source } = JSON.parse(mission.mission_data) as FileMissionData;

  const session = useSession();
  const user = session?.data?.user as SessionUser;
  const isUploadingRef = useRef(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [file, setFile] = useState<File | null>(null);
  const fileSource = file ? window.URL.createObjectURL(file) : '';

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files && e.target.files.length > 0 ? e.target.files[0] : null;
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const shouldRenderCameraBtn = () => {
    return (
      (media_type as number) === MediaType.PHOTO_ONLY ||
      (media_type as number) === MediaType.PHOTO_AND_VIDEO
    );
  };

  const shouldRenderVideoBtn = () => {
    return media_type === MediaType.VIDEO_ONLY || media_type === MediaType.PHOTO_AND_VIDEO;
  };

  const getCameraBtnColSpan = () => {
    return shouldRenderCameraBtn() && !shouldRenderVideoBtn() ? 'col-span-2' : '';
  };

  const getVideoBtnColSpan = () => {
    return !shouldRenderCameraBtn() && shouldRenderVideoBtn() ? 'col-span-2' : '';
  };

  const onSubmit = handleSubmit(async ({ caption }) => {
    if (!file || !user) return;
    if (isUploadingRef.current) {
      toast.error(
        'Still uploading, please wait, you will be notified again if the file has been uploaded succesfully',
      );
      return;
    }
    isUploadingRef.current = true;

    const onedriveService = new OnedriveService(user.access_token);
    const tokenToast = toast('Getting token...', { icon: '🔄' });
    const { token } = await onedriveService.getOnedriveToken();
    toast.dismiss(tokenToast);

    let finalFile = null;
    if (file.type.includes('image')) {
      const compressToast = toast('Compressing image...', { icon: '🔄' });
      finalFile = await imageCompression(file, { maxSizeMB: 0.25, useWebWorker: true });
      toast.dismiss(compressToast);
    } else {
      finalFile = file;
    }

    const params: OnedriveUploadSessionParams = {
      file: finalFile,
      gameId: game.id,
      gameTeamId: teamUser.game_team_id,
      token,
      uploader: user.username,
    };

    const uploadSessToast = toast('Creating upload session...', { icon: '🔄' });
    const { uploadUrl } = await onedriveService.createUploadSession(params);
    toast.dismiss(uploadSessToast);

    const uploadParams: OnedriveUploadBytesParams = {
      file: finalFile,
      rangeSize: 10 * 1024 * 1024,
      token,
      uploadUrl,
    };

    const uploadFileToast = toast('Uploading file..', { icon: '🔄' });
    const fileAnswerData = await onedriveService.uploadBytes(uploadParams);
    toast.dismiss(uploadFileToast);

    setTimeout(() => {
      toast.success('Upload success!');
    }, 500);

    const dto: CreateSubmissionDto = {
      game_team_id: teamUser.game_team_id,
      answer_data: fileAnswerData,
      caption,
    };

    await submit(dto);
    isUploadingRef.current = false;
  });

  return (
    <>
      {submission ? (
        <OnedriveImage submission={submission} />
      ) : (
        <form onSubmit={onSubmit} encType='multipart/form-data'>
          <div className='grid grid-cols-2 gap-2'>
            {shouldRenderCameraBtn() && (
              <label htmlFor='cameraInput' className={`${getCameraBtnColSpan()}`}>
                <span className='btn w-full btn-secondary text-white'>
                  Take Photo <CameraIcon className='ml-2 w-5 h-5' />
                </span>

                <input
                  onChange={onFileChange}
                  id='cameraInput'
                  className='hidden'
                  type='file'
                  accept='image/*'
                  capture='environment'
                />
              </label>
            )}

            {shouldRenderVideoBtn() && (
              <label htmlFor='videoInput' className={`${getVideoBtnColSpan()}`}>
                <span className='btn w-full btn-secondary text-white'>
                  Take Video <VideoCameraIcon className='ml-2 w-5 h-5' />
                </span>

                <input
                  onChange={onFileChange}
                  id='videoInput'
                  className='hidden'
                  type='file'
                  accept='video/*'
                  capture='environment'
                />
              </label>
            )}

            {submission_source === SubmissionSource.LIVE_CAPTURE_AND_LIBRARY && (
              <label htmlFor='fileInput' className='col-span-2'>
                <span className='btn w-full btn-secondary text-white'>Select From Gallery</span>

                <input
                  onChange={onFileChange}
                  id='fileInput'
                  className='hidden'
                  type='file'
                  accept='image/*, video/*'
                  capture='environment'
                />
              </label>
            )}
          </div>
          {!file && <small className='text-red-400'>Photo/video is required.</small>}

          {file && (
            <div className='mt-2 bg-white p-2'>
              {file.type.includes('image') && (
                <div>
                  <img src={fileSource} className='rounded' alt='Uploaded Photo' width='100%' />
                </div>
              )}
              {file.type.includes('video') && (
                <div>
                  <video src={fileSource} controls width='100%' />
                </div>
              )}
            </div>
          )}

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
      )}
    </>
  );
}
