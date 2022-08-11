import { ChevronRightIcon, PlusCircleIcon } from '@heroicons/react/outline';
import GameDetailHeader from '../games/GameDetailHeader';

export default function SelectTeam() {
  const dummy = [
    {
      id: 1,
      name: 'Team 1',
    },
    {
      id: 2,
      name: 'Team 2',
    },
    {
      id: 3,
      name: 'Team 3',
    },
  ];

  return (
    <section>
      <GameDetailHeader />

      <div className='bg-gray-200 py-2 px-4 font-semibold uppercase text-sm'>Select Team</div>
      <ul>
        <li>
          <button className='w-full flex justify-between items-center p-4 border-b'>
            <div className='flex items-center text-orange-400'>
              <PlusCircleIcon className='w-6 h-6 mr-2' />
              <span className='block font-semibold'>Create Team</span>
            </div>
            <ChevronRightIcon className='w-5 h-5' />
          </button>
        </li>

        {dummy.length === 0 && (
          <li className='px-4 mt-2 text-sm'>No teams have been created yet. Create one now!</li>
        )}

        {dummy.map((team) => (
          <li key={team.id}>
            <button className='w-full flex justify-between items-center p-4 border-b'>
              <div className='flex items-center text-orange-400'>
                <div className='w-6 h-6 rounded-full bg-orange-300 mr-2' />
                <span className='block font-semibold'>{team.name}</span>
              </div>
              <ChevronRightIcon className='w-5 h-5' />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
