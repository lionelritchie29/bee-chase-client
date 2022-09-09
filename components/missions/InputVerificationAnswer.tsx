import { Html5Qrcode } from 'html5-qrcode';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { VerificationAnswerData } from '../../models/answer-data/VerificationAnswerData';
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

  const qrCodeRegionId = 'html5qr-code-full-region';

  const qrCodeRef = useRef<Html5Qrcode | null>(null);
  const isScanningQr = useRef(false);

  useEffect(() => {
    if (window && !qrCodeRef.current && !submission) {
      qrCodeRef.current = new Html5Qrcode(qrCodeRegionId);
    }
  }, []);

  const onScanBtnClick = () => {
    if (!qrCodeRef.current) return;

    if (isScanningQr.current) {
      isScanningQr.current = false;
      qrCodeRef.current.stop();
    } else {
      isScanningQr.current = true;
      qrCodeRef.current.start(
        { facingMode: 'environment' },
        {} as any,
        handleQrSubmit,
        handleQrError,
      );
    }
  };

  const handleQrSubmit = (decodedText: string) => {
    setValue('code', decodedText);
    toast.success('Code scanned succesfully!');
    isScanningQr.current = false;
    qrCodeRef.current?.stop();
    submitAnswer({ code: decodedText });
  };

  const handleQrError = (errorMessage: string) => {
    console.error(errorMessage);
  };

  if (submission) {
    const answer = JSON.parse(submission.answer_data) as VerificationAnswerData;
    setValue('code', answer.code);
  }

  const submitAnswer = async ({ code }: { code: string }) => {
    const dto: CreateSubmissionDto = {
      caption: null,
      game_team_id: teamUser.game_team_id,
      answer_data: { code: code.toUpperCase() },
    };
    await submit(dto);
  };

  const onSubmit = handleSubmit(submitAnswer);

  return (
    <form onSubmit={onSubmit}>
      <div className='p-4 border border-gray-300 rounded'>
        {!submission && (
          <>
            <button
              type='button'
              onClick={onScanBtnClick}
              className='btn btn-secondary text-white w-full shadow'>
              {!isScanningQr.current ? 'Scan QR' : 'Stop Scanning'}
            </button>

            <div className='w-full p-4' id={qrCodeRegionId} />

            <div className='divider'>Or</div>
          </>
        )}

        <input
          {...register('code', { required: true })}
          type='text'
          placeholder='Enter verification code'
          className='input input-bordered w-full mt-2 uppercase'
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
