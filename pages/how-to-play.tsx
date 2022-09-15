import { NextPage } from 'next';
import Layout from '../widgets/Layout';
import loginPageImg from '../public/assets/how-to-play/1.jpg';
import homePageImg from '../public/assets/how-to-play/2.jpg';
import joinPageImg from '../public/assets/how-to-play/3.jpg';
import Image from 'next/image';

const HowToPlayPage: NextPage = () => {
  const data = [
    {
      step: 1,
      image: loginPageImg,
      text: 'Login menggunakan email binus.ac.id dan password Binusmaya',
    },
    {
      step: 2,
      image: homePageImg,
      text: 'Setelah berada di <b>Home Page</b>, silahkan klik <b>tombol +</b> di bagian kanan atas untuk memasukkan Game Code',
    },
    {
      step: 3,
      image: joinPageImg,
      text: 'Masukkan <b>Game Code</b>',
    },
  ];

  if (process.env.NODE_ENV === 'production') {
    return (
      <Layout title='How to Play'>
        <div className='text-center border border-yellow-400 text-sm rounded p-4 mt-2 bg-yellow-100'>
          This feature is in development, please check again regularly.
        </div>
      </Layout>
    );
  }

  return (
    <Layout title='How to Play'>
      <section>
        <h1 className='text-secondary font-bold text-2xl text-center mt-4'>How to Play</h1>
      </section>

      <div className='divider'></div>

      <section>
        <ul className='grid grid-cols-1 gap-3'>
          {data.map((item) => (
            <li className='flex' key={item.step}>
              <div className='mr-2'>{item.step}.</div>
              <div>
                <p className='mb-3' dangerouslySetInnerHTML={{ __html: item.text }}></p>
                {item.image && (
                  <div className='border border-gray-400'>
                    <Image
                      src={item.image}
                      className='object-fit'
                      width={600}
                      height={600}
                      alt=''
                    />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default HowToPlayPage;
