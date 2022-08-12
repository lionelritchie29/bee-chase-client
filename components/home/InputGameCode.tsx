import binusLogo from '../../public/assets/logo.png';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { SessionUser } from '../../models/SessionUser';
import { GameService } from '../../services/GameService';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useLoading from '../../hooks/use-loading';
import { useRouter } from 'next/router';

type FormData = {
  code: string;
};

export default function InputGameCode() {
  const session = useSession();
  const user = session?.data?.user as SessionUser;
  const gameService = new GameService(user?.access_token);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [{ isLoading, load, finish }] = useLoading(false);
  const router = useRouter();

  const onSubmit = handleSubmit(async ({ code }) => {
    load('Searching game...');
    const game = await gameService.getByCode(code);

    if (!game) {
      toast.dismiss();
      toast.error('Ups, invalid code');
      finish();
    } else {
      router.push(`/games/${game.id}`);
    }
  });

  return (
    <section className='flex justify-center'>
      <div className='mt-8'>
        <h1 className='font-bold text-2xl mt-4 text-center'>Welcome to BeeChase!</h1>
        <div className='flex justify-center mt-12'>
          <Image src={binusLogo} width={185} height={125} alt='logo' />
        </div>
        <form onSubmit={onSubmit} className='mt-8 border border-gray-300 p-4 rounded-lg shadow'>
          <label htmlFor='game_code_inp text-left'>Input Game Code:</label>
          <input
            {...register('code', { required: true, minLength: 6, maxLength: 6 })}
            type='text'
            id='game_code_inp'
            placeholder='Game Code'
            className='input input-bordered w-full mt-2'
          />
          {errors?.code?.type === 'required' && (
            <small className='text-red-300'>Game code must be filled</small>
          )}
          {(errors?.code?.type === 'minLength' || errors?.code?.type === 'maxLength') && (
            <small className='text-red-300'>Game code must consist of 6 characters</small>
          )}
          <button
            disabled={isLoading}
            type='submit'
            className={`btn ${isLoading ? 'btn-disabled' : 'btn-primary'} text-white w-full mt-3`}>
            Enter
          </button>
        </form>
      </div>
    </section>
  );
}
