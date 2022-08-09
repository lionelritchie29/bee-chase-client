import { PlayIcon, StopIcon } from '@heroicons/react/outline';
import { LockClosedIcon } from '@heroicons/react/solid';
import Link from 'next/link';

export default function GameCard() {
  return (
    <Link href={`/games/123`}>
      <div className='border rounded p-2'>
        <div className='mb-2 pb-3 border-b flex'>
          <div className='w-1/3'>
            <img
              className='w-full rounded object-fit'
              src='https://i.pravatar.cc/200'
              alt='game image'
            />
          </div>
          <div className='w-2/3 ml-4'>
            <h2 className='font-bold flex justify-between'>
              <span>Game Title</span>
              <LockClosedIcon className='w-4 h-4' />
            </h2>
            <p className='text-sm'>Game Description</p>
          </div>
        </div>

        <div className='flex'>
          <div className='w-1/2 border-r'>
            <div className='text-center'>
              <span className='block text-gray-400 font-semibold flex items-center justify-center'>
                <PlayIcon className='w-4 h-4 mr-1' /> <span className='block'>Start</span>
              </span>
              <span className='block text-sm font-bold'>Aug 7, 2022</span>
            </div>
          </div>
          <div className='w-1/2'>
            <div className='text-center'>
              <span className='block text-gray-400 font-semibold flex items-center justify-center'>
                <StopIcon className='w-4 h-4 mr-1' /> <span className='block'>End</span>
              </span>
              <span className='block text-sm font-bold'>Aug 7, 2022</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
