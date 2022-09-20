import { SessionUser } from '../../models/SessionUser';
import Layout from '../../widgets/Layout';
import SupportAlert from '../shared/SupportAlert';
import GameCardSkeleton from './GameCardSkeleton';

type Props = {
  user?: SessionUser;
};

export default function GameListSkeleton({ user }: Props) {
  const tabs = [
    {
      id: 1,
      title: 'Passed',
    },
    {
      id: 2,
      title: 'Active',
    },
    {
      id: 3,
      title: 'Future',
    },
  ];

  return (
    <Layout className='bg-gray-50 min-h-screen pt-3'>
      <SupportAlert />

      <div className='font-semibold text-orange-400 border rounded py-2 px-3 shadow-xs bg-white'>
        Welcome, {user?.name}
      </div>

      <div style={{ padding: '0.1rem' }} className='bg-white tabs mt-3 rounded-md border'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab w-1/3 ${tab.id === 2 ? 'bg-gray-400 text-white rounded shadow' : ''}`}>
            {tab.title}
          </button>
        ))}
      </div>

      <ul className='bg-white grid grid-cols-1 md:grid-cols-2 gap-4 mt-2'>
        {[1, 2, 3, 4, 5].map((game) => (
          <GameCardSkeleton key={game} />
        ))}
      </ul>
    </Layout>
  );
}
