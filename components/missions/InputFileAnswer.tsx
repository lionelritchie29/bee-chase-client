import { CameraIcon, VideoCameraIcon } from '@heroicons/react/outline';
import { ChangeEvent, ChangeEventHandler, Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import useLoading from '../../hooks/use-loading';
import { CreateSubmissionDto } from '../../models/dto/submissions/create-submission.dto';
import { GameTeamUser } from '../../models/GameTeamUser';

type Props = {
  submit: (dto: CreateSubmissionDto) => void;
  teamUser: GameTeamUser;
  isLoading: boolean;
};

type FormData = {
  caption: string;
};

export default function InputFileAnswer({ submit, teamUser, isLoading }: Props) {
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

  const onSubmit = handleSubmit(async ({ caption }) => {
    console.log({ caption });
  });

  return (
    <form onSubmit={onSubmit} encType='multipart/form-data'>
      <div>
        <label htmlFor='fileInput'>
          <span className='btn w-full btn-secondary text-white'>
            Select Photo / Video <CameraIcon className='ml-2 w-5 h-5' />
          </span>

          <input
            onChange={onFileChange}
            id='fileInput'
            className='hidden'
            type='file'
            accept='camera/*,video/*'
            capture='environment'
          />
        </label>
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
  );
}
