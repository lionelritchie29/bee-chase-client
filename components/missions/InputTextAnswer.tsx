import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextAnswerData } from '../../models/answer-data/TextAnswerData';
import { CreateSubmissionDto } from '../../models/dto/submissions/create-submission.dto';
import { GameTeamUser } from '../../models/GameTeamUser';
import { Submission } from '../../models/Submission';

type Props = {
  submit: (dto: CreateSubmissionDto) => void;
  teamUser: GameTeamUser;
  isLoading: boolean;
  submission: Submission | null;
};

type FormData = {
  text: string;
  caption: string;
};

export default function InputTextAnswer({ submit, teamUser, isLoading, submission }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  if (submission) {
    const answer = JSON.parse(submission.answer_data) as TextAnswerData;
    setValue('caption', submission.caption);
    setValue('text', answer.text);
  }

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
        disabled={submission !== null}
      />
      {errors?.text && <small className='text-red-400'>Answer is required</small>}

      <input
        {...register('caption')}
        type='text'
        placeholder='Caption (optional)'
        disabled={submission !== null}
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
