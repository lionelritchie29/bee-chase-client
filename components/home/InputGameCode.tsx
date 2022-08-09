import binusLogo from '../../public/assets/logo.png';
import Image from 'next/image';

export default function InputGameCode() {
  return (
    <section className='flex justify-center'>
      <div className='mt-8'>
        <h1 className='font-bold text-2xl mt-4 text-center'>Welcome to BeeChase!</h1>
        <div className='flex justify-center mt-12'>
          <Image src={binusLogo} width={185} height={125} alt='logo' />
        </div>
        <form className='mt-8 border border-gray-300 p-4 rounded-lg shadow'>
          <label htmlFor='game_code_inp text-left'>Input Game Code:</label>
          <input
            type='text'
            id='game_code_inp'
            placeholder='Game Code'
            className='input input-bordered w-full mt-2'
          />
          <button className='btn btn-primary text-white w-full mt-3'>Enter</button>
        </form>
      </div>
    </section>
  );
}
