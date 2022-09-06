import { GameTeam } from '../../models/GameTeam';
import { Transition, Dialog } from '@headlessui/react';
import { Dispatch, Fragment, SetStateAction, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { SessionUser } from '../../models/SessionUser';
import { GameTeamService } from '../../services/GameTeamService';
import useLoading from '../../hooks/use-loading';
import { Game } from '../../models/Game';
import { teamIsFull } from '../../lib/game-utils';

type Props = {
  selectedTeam: GameTeam | null;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  joinTeam: (team: GameTeam, accessCode: string | null) => void;
  game: Game;
};

type FormData = {
  accessCode: number | null;
};

export default function InputTeamCodeModal({
  isOpen,
  setIsOpen,
  selectedTeam,
  game,
  joinTeam,
}: Props) {
  const session = useSession();
  const user = session?.data?.user as SessionUser;
  const teamService = new GameTeamService(user?.access_token);
  const [{ load, finish, isLoading }] = useLoading(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (!selectedTeam?.has_access_code) {
      setValue('accessCode', null);
    }
  }, [selectedTeam]);

  const close = () => {
    setIsOpen(false);
  };

  const onSubmit = handleSubmit(async ({ accessCode }) => {
    if (selectedTeam?.has_access_code) {
      load('Veriying...');
      if (accessCode == null) {
        finish('Access code must be filled', { success: false });
        return;
      }

      const isCorrect = await teamService.verifyCode(
        selectedTeam.game_id,
        selectedTeam.id,
        accessCode.toString(),
      );
      if (isCorrect) {
        load('Joining...');
        await joinTeam(selectedTeam, accessCode.toString());
      } else {
        finish('Wrong access code', { success: false });
      }
    } else {
      load('Joining...');
      await joinTeam(selectedTeam, null);
    }
  });

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={close}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'>
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title as='h3' className='font-medium leading-6 text-gray-900'>
                    Join <b>{selectedTeam?.name}</b>
                  </Dialog.Title>

                  {selectedTeam ? (
                    <>
                      <div className='border rounded-t mt-4 p-3 bg-gray-200 text-sm'>Members</div>
                      <ul className=''>
                        {selectedTeam?.members.length === 0 && (
                          <li className='text-sm border-r border-l border-b p-2'>
                            This team currently has no member.
                          </li>
                        )}
                        {selectedTeam?.members.map((member) => (
                          <li className='text-sm border-r border-l border-b p-2' key={member.id}>
                            {member.user_username} - {member.user_name}
                          </li>
                        ))}
                      </ul>

                      <form onSubmit={onSubmit} className='mt-4'>
                        {selectedTeam?.has_access_code && (
                          <>
                            <h2 className='text-sm mb-1'>Input Access Code</h2>
                            <input
                              {...register('accessCode', {
                                valueAsNumber: true,
                                required: true,
                                validate: (val) => {
                                  if (!selectedTeam?.has_access_code) return true;
                                  return val !== null && val >= 1000 && val <= 9999;
                                },
                              })}
                              type='number'
                              placeholder='Access Code'
                              className='input input-bordered w-full max-w-xs'
                            />
                            {errors?.accessCode?.type === 'required' && (
                              <small className='text-red-300'>Access code is required</small>
                            )}
                            {errors?.accessCode?.type === 'validate' && (
                              <small className='text-red-300'>
                                Access code must be 4 characters long
                              </small>
                            )}
                          </>
                        )}

                        <div className='mt-4'>
                          <button
                            type='submit'
                            disabled={isLoading || teamIsFull(game, selectedTeam)}
                            className={`btn ${
                              isLoading ? 'btn-disabled' : 'btn-primary'
                            } text-white w-full`}
                            onClick={() => {}}>
                            {teamIsFull(game, selectedTeam) ? 'FULL' : 'JOIN'}
                          </button>
                        </div>
                      </form>
                    </>
                  ) : (
                    'Loading...'
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
