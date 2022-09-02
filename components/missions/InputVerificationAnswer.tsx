import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CreateSubmissionDto } from '../../models/dto/submissions/create-submission.dto';
import { GameTeamUser } from '../../models/GameTeamUser';
import { Submission } from '../../models/Submission';
import QrScanner from '../shared/QrScanner';

type Props = {
  submit: (dto: CreateSubmissionDto) => void;
  teamUser: GameTeamUser;
  isLoading: boolean;
  submission: Submission | null;
};

type FormData = {
  code: string;
};

export default function InputVerificationAnswer({
  submit,
  teamUser,
  isLoading,
  submission,
}: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const [isScanningQr, setIsScanningQr] = useState(false);

  if (submission) {
    // const answer = JSON.parse(submission.answer_data) as TextAnswerData;
    // setValue('code', answer.text);
  }

  const onSubmit = handleSubmit(async ({ code }) => {
    // const dto: CreateSubmissionDto = {
    //   caption: caption ?? null,
    //   game_team_id: teamUser.game_team_id,
    //   answer_data: { text },
    // };
    // await submit(dto);
  });

  return (
    <form onSubmit={onSubmit}>
      <div className='text-red-400 text-sm mb-2'>
        This feature is Still in development and not yet working.
      </div>
      <div className='p-4 border border-gray-300 rounded'>
        <button
          type='button'
          onClick={() => {
            setIsScanningQr(!isScanningQr);
          }}
          className='btn btn-secondary text-white w-full shadow'>
          {!isScanningQr ? 'Scan QR' : 'Stop Scanning'}
        </button>

        {isScanningQr && <QrScanner setIsScanning={setIsScanningQr} setValue={setValue} />}

        <div className='divider'>Or</div>

        <input
          {...register('code', { required: true })}
          type='text'
          placeholder='Enter verification code'
          className='input input-bordered w-full mt-2'
          disabled={submission !== null}
        />
        {errors?.code && <small className='text-red-400'>Verification code is required</small>}
      </div>

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
