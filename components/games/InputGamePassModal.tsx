import { GameTeam } from '../../models/GameTeam';
import { Transition, Dialog } from '@headlessui/react';
import { Dispatch, Fragment, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  verifyPass: (passcode: string) => void;
};

type FormData = {
  passcode: string;
};

export default function InputGamePassModal({ isOpen, setIsOpen, verifyPass }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const close = () => {
    setIsOpen(false);
  };

  const onSubmit = handleSubmit(async ({ passcode }) => {
    verifyPass(passcode);
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
                    Input Game Password
                  </Dialog.Title>
                  <form onSubmit={onSubmit} className='mt-2'>
                    <input
                      {...register('passcode', {
                        required: true,
                      })}
                      type='password'
                      placeholder='Password'
                      className='input input-bordered w-full max-w-xs'
                    />
                    {errors?.passcode?.type === 'required' && (
                      <small className='text-red-300'>Passcode is required</small>
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
