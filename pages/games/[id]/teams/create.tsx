import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { SessionUser } from '../../../../models/SessionUser';
import Layout from '../../../../widgets/Layout';

type FormData = {
  name: string;
  code: string;
};

const CreateTeamPage: NextPage = () => {
  const session = useSession();
  const user = session?.data?.user as SessionUser;
  const router = useRouter();
  const { id } = router.query;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    const MAX = 9999;
    const MIN = 1000;
    const randomAccessCode = Math.floor(Math.random() * (MAX - MIN)) + MIN;

    setValue('name', user?.name);
    setValue('code', randomAccessCode.toString());
  }, []);

  const onSubmit = handleSubmit(async ({ name, code }) => {
    router.push(`/games/${id}/play`);
  });

  return (
    <Layout controlSpacing={false}>
      <div className='relative'>
        <div style={{ background: '#0394c4' }} className='h-32 -mt-1'></div>
        <div className='h-32'>
          <div className='absolute bottom-10 w-full'>
            <div className='w-full rounded-full h-32 w-32 mx-auto bg-gray-300'></div>
          </div>
        </div>
      </div>

      <form onSubmit={onSubmit} className='w-full px-4'>
        <div className='form-control w-full'>
          <label className='label'>
            <span className='label-text uppercase font-semibold uppercase text-gray-400'>
              Team Name
            </span>
          </label>
          <input
            type='text'
            {...register('name', { required: true })}
            placeholder='Team Name'
            className='input input-bordered w-full input-md'
          />
          {errors?.name && <small className='text-red-300'>Team name must be filled</small>}
        </div>

        <div className='form-control w-full mt-4'>
          <label className='label'>
            <span className='label-text uppercase font-semibold uppercase text-gray-400'>
              Access Code
            </span>
          </label>
          <input
            type='text'
            {...register('code', { required: true })}
            placeholder='Access Code'
            className='input input-bordered w-full input-md'
          />
          {errors?.name && <small className='text-red-300'>Access code must be filled</small>}
        </div>

        <button type='submit' className='btn btn-primary w-full text-white mt-4'>
          Create Team & Join GAme
        </button>
      </form>
    </Layout>
  );
};

export default CreateTeamPage;
