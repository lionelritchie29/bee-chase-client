import { LockClosedIcon, PlayIcon, StopIcon } from '@heroicons/react/outline';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import GameDetailHeader from '../../../components/games/GameDetailHeader';
import Layout from '../../../widgets/Layout';

const GameIndexPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const items = [
    {
      id: 1,
      title: 'START',
      value: 'TBD',
      icon: <PlayIcon className='w-5 h-5'></PlayIcon>,
    },
    {
      id: 2,
      title: 'END',
      value: 'TBD',
      icon: <StopIcon className='w-5 h-5'></StopIcon>,
    },
    {
      id: 3,
      title: 'PASSWORD',
      value: 'ON',
      icon: <LockClosedIcon className='w-5 h-5'></LockClosedIcon>,
    },
  ];

  return (
    <Layout controlSpacing={false}>
      <GameDetailHeader />

      <ul className='flex flex-col divide-y'>
        {items.map((item) => (
          <li key={item.id} className='flex justify-between w-full px-4 py-3'>
            <div className='font-semibold text-gray-400 flex items-center'>
              {item.icon}
              <span className='block ml-2'>{item.title}</span>
            </div>
            <div className='font-semibold'>{item.value}</div>
          </li>
        ))}
      </ul>

      <div className='px-4 mt-4'>
        <Link href={`/games/${id}/teams`}>
          <button className='w-full text-white btn btn-primary'>Select Team & Join Game</button>
        </Link>
      </div>
    </Layout>
  );
};

export default GameIndexPage;
