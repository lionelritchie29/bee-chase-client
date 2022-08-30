import { useForm } from 'react-hook-form';
import { MultipleChoiceAnswerData } from '../../models/answer-data/MultipleChoiceAnswerData';
import { CreateSubmissionDto } from '../../models/dto/submissions/create-submission.dto';
import { GameMission } from '../../models/GameMission';
import { GameTeamUser } from '../../models/GameTeamUser';
import { MultipleChoiceMissionData } from '../../models/mission-data/MultipleChoiceMissionData';
import { Submission } from '../../models/Submission';

type Props = {
  submit: (dto: CreateSubmissionDto) => void;
  teamUser: GameTeamUser;
  isLoading: boolean;
  submission: Submission | null;
  mission: GameMission;
};

type FormData = {
  selectedChoices: string[];
};

export default function InputMultipleChoiceAnswer({
  submit,
  teamUser,
  isLoading,
  submission,
  mission,
}: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>();
  const missionData = JSON.parse(mission.mission_data) as MultipleChoiceMissionData;

  setValue('selectedChoices', []);
  if (submission) {
    const answers = JSON.parse(submission.answer_data) as MultipleChoiceAnswerData;
    setValue('selectedChoices', answers.answers);
  }

  const onChange = (e: any) => {
    const val = e.target.value;
    const checked = e.target.checked;

    if (missionData.can_choose_multiple) {
      let selected = getValues('selectedChoices');
      if (!checked) {
        selected = selected.filter((ch) => ch !== val);
      } else {
        selected = [...selected, val];
      }
      setValue('selectedChoices', selected);
    } else {
      setValue('selectedChoices', [val]);
    }
  };

  const onSubmit = handleSubmit(async ({ selectedChoices }) => {
    const dto: CreateSubmissionDto = {
      caption: null,
      game_team_id: teamUser.game_team_id,
      answer_data: { answers: selectedChoices },
    };
    await submit(dto);
  });

  return (
    <form onSubmit={onSubmit}>
      <div className='mb-4 text-blue-600 text-sm'>
        {missionData.can_choose_multiple
          ? 'You can choose multiple answers'
          : 'You can only choose one valid answer'}
      </div>

      <div className='flex flex-col space-y-2'>
        {missionData.choices.map((choice, idx) => (
          <label key={choice} className='flex'>
            <input
              type='checkbox'
              disabled={submission != null}
              value={choice}
              className='checkbox'
              {...register('selectedChoices', { validate: (val) => val.length > 0 })}
              onChange={onChange}
            />
            <div className='ml-3'>{choice}</div>
          </label>
        ))}

        {errors?.selectedChoices && <small className='text-red-400'>Answer must be chosen</small>}
      </div>

      <button
        type='submit'
        disabled={isLoading || submission != null}
        className={`btn ${
          isLoading || submission ? 'btn-disabled' : 'btn-primary'
        } text-white w-full shadow mt-5`}>
        {submission ? 'Answered' : 'Submit Answer'}
      </button>
    </form>
  );
}
