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
  text: string;
  caption: string;
};

export default function InputTextAnswer({ submit, teamUser, isLoading }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async ({ text, caption }) => {
    const dto: CreateSubmissionDto = {
      caption: caption ?? null,
      game_team_id: teamUser.game_team_id,
      answer_data: { text },
    };
    await submit(dto);
  });

  return (
    <form onSubmit={onSubmit}>
      <input
        {...register('text', { required: true })}
        type='text'
        placeholder='Answer'
        className='input input-bordered w-full mt-2'
      />
      {errors?.text && <small className='text-red-400'>Answer is required</small>}

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
