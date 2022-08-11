import { ChevronRightIcon, PlusCircleIcon } from '@heroicons/react/outline';

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
      id: 2,
      name: 'Team 3',
    },
  ];

  return (
    <section>
      <div className='relative'>
        <div style={{ background: '#0394c4' }} className='h-32 -mt-1'></div>
        <div className='h-32'>
          <div className='absolute bottom-10 w-full'>
            <img
              className='w-full rounded object-fit h-32 w-32 mx-auto'
              src='https://i.pravatar.cc/200'
              alt='game image'
            />
            <div className='text-center mt-2 font-bold text-lg'>Telor</div>
          </div>
        </div>
      </div>

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
