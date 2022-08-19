import { Dispatch, SetStateAction } from 'react';
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

  const onSubmit = handleSubmit(async ({ caption }) => {
    console.log({ caption });
  });

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor='cameraFileInput'>
        <span className='btn btn-primary'>Open camera</span>

        <input
          id='cameraFileInput'
          className='hidden'
          type='file'
          accept='image/*'
          capture='environment'
        />
      </label>

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
