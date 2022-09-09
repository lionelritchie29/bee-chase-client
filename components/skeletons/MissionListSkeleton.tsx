import MissionCardSkeleton from './MissionCardSkeleton';

export default function MissionListSkeleton() {
  const tabs = [
    {
      id: 1,
      title: 'Remaining',
    },
    {
      id: 2,
      title: 'Completed',
    },
  ];

  return (
    <div>
      <div style={{ padding: '0.1rem' }} className='tabs m-2 rounded-md border'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab w-1/2 ${
              tab.id === 1 ? 'bg-gray-300 animte-pulse text-white rounded shadow' : ''
            }`}>
            {tab.title}
          </button>
        ))}
      </div>

      <div className='mt-4'>
        <ul className='grid grid-cols-1 md:grid-cols-2'>
          {[1, 2, 3, 4, 5, 6].map((mission) => (
            <MissionCardSkeleton key={mission} />
          ))}
        </ul>
      </div>
    </div>
  );
}
