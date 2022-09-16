import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import Layout from '../../widgets/Layout';
import BinusImg from '../../public/assets/logo.png';
import RibbonImg from '../../public/assets/ribbon.png';
import { signIn } from 'next-auth/react';
import useLoading from '../../hooks/use-loading';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import LoginBackdrop from '../../public/assets/login_backdrop.jpg';

type FormData = {
  username: string;
  password: string;
};

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [{ isLoading, load, finish }] = useLoading(false);
  const router = useRouter();

  const onSubmit = handleSubmit(async ({ username, password }) => {
    load('Signing in...');
    const response = await signIn('credentials', {
      redirect: false,
      username: `${username}@binus.ac.id`,
      password,
    });
    toast.dismiss();

    if (!response?.ok) {
      finish(response?.error as any, { success: false });
    } else {
      router.push('/');
      finish('Logged in', { loading: true });
    }
  });

  return (
    <Layout
      showNavbar={false}
      className='grid place-items-center bg-primary min-h-screen'
      style={{
        backgroundImage: `url('${LoginBackdrop.src}')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#005AA1',
      }}>
      <div className='w-full'>
        <section className='card rounded-lg mx-auto w-full max-w-sm bg-base-100 shadow border border-grey-300'>
          <div className='flex items-center gap-2 px-4'>
            <Image src={RibbonImg} alt='ribbon' className='mr-2' />
            <Image src={BinusImg} alt='binus' />
          </div>

          <form onSubmit={onSubmit} className='card-body '>
            <div>
              <div className='flex'>
                <input
                  type='text'
                  {...register('username', { required: true })}
                  placeholder='Email'
                  className='input input-bordered rounded-r-none w-full'
                />
                <div className='px-3 flex items-center justify-center bg-primary text-white rounded-r-md'>
                  @binus.ac.id
                </div>
              </div>
              {errors?.username && <small className='text-red-300'>Username must be filled</small>}
            </div>

            <div>
              <input
                type='password'
                {...register('password', { required: true })}
                placeholder='Password'
                className='input input-bordered w-full max-w-xs input-md'
              />
              {errors?.password && <small className='text-red-300'>Password must be filled</small>}
            </div>

            <div className='card-actions w-full'>
              <button
                disabled={isLoading}
                type='submit'
                className={`btn ${
                  isLoading ? 'btn-disabled' : 'btn-primary'
                } w-full mt-3 text-white`}>
                Login
              </button>
            </div>
          </form>
        </section>

        <footer className='footer footer-center mt-4 p-4 text-base-content'>
          <div>
            <p className='text-white'>
              Copyright © {new Date().getFullYear()} <br />
              Research and Development Team (RnD) <br />
              Software Laboratory Center (SLC)
            </p>
          </div>
        </footer>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Login;
