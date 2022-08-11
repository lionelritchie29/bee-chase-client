import { ChevronRightIcon } from '@heroicons/react/outline';

export default function TeamCard() {
  return (
    <button className='w-full flex justify-between items-center p-4 border-b'>
      <div className='flex items-center text-orange-400'>
        <div className='w-6 h-6 rounded-full bg-orange-300 mr-2' />
        <span className='block font-semibold'>Team 1</span>
      </div>
      <ChevronRightIcon className='w-5 h-5' />
    </button>
  );
}
