import { NextPage } from 'next';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import Layout from '../../widgets/Layout';
import BinusImg from '../../public/assets/logo.png';
import RibbonImg from '../../public/assets/ribbon.png';

const Login: NextPage = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    console.log({ data });
  });

  return (
    <Layout
      showNavbar={false}
      className='grid place-items-center bg-primary'
      style={{
        backgroundImage: `url('/assets/login_backdrop.jpg')`,
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

          <form onSubmit={onSubmit} className='card-body items-center text-center'>
            <input
              type='text'
              {...register('nim')}
              placeholder='NIM'
              className='input input-bordered w-full max-w-xs input-md'
              required
            />

            <input
              type='password'
              {...register('password')}
              placeholder='Password'
              className='input input-bordered w-full max-w-xs input-md'
              required
            />

            <div className='card-actions w-full'>
              <button type='submit' className='btn btn-primary w-full mt-3 text-white'>
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

export default Login;
