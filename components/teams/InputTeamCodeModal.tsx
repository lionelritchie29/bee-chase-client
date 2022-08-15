import { GameTeam } from '../../models/GameTeam';
import { Transition, Dialog } from '@headlessui/react';
import { Dispatch, Fragment, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { SessionUser } from '../../models/SessionUser';
import { GameTeamService } from '../../services/GameTeamService';
import useLoading from '../../hooks/use-loading';

type Props = {
  selectedTeam: GameTeam;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  joinTeam: (teamId: string, accessCode: string | null) => void;
};

type FormData = {
  accessCode: number;
};

export default function InputTeamCodeModal({ isOpen, setIsOpen, selectedTeam, joinTeam }: Props) {
  console.log({ selectedTeam });
  const session = useSession();
  const user = session?.data?.user as SessionUser;
  const teamService = new GameTeamService(user?.access_token);
  const [{ load, finish, isLoading }] = useLoading(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const close = () => {
    setIsOpen(false);
  };

  const onSubmit = handleSubmit(async ({ accessCode }) => {
    load('Veriying...');
    const isCorrect = await teamService.verifyCode(
      selectedTeam.game_id,
      selectedTeam.id,
      accessCode.toString(),
    );
    if (isCorrect) {
      finish('Access code correct');
      joinTeam(selectedTeam.id, accessCode.toString());
    } else {
      finish('Wrong access code', { success: false });
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
                  <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                    Input Team Access Code
                  </Dialog.Title>
                  <form onSubmit={onSubmit} className='mt-2'>
                    <input
                      {...register('accessCode', {
                        valueAsNumber: true,
                        required: true,
                        validate: (val) => {
                          return val >= 1000 && val <= 9999;
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
                      <small className='text-red-300'>Access code must be 4 characters long</small>
                    )}

                    <div className='mt-4'>
                      <button
                        type='submit'
                        className='btn btn-primary text-white w-full'
                        onClick={() => {}}>
                        ENTER
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
