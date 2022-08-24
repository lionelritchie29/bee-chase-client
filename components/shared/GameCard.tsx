import { PlayIcon, StopIcon } from '@heroicons/react/outline';
import { LockClosedIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { format } from 'date-fns';
import { Game } from '../../models/Game';
import binusLogo from '../../public/assets/binus_placeholder.jpg';
import Image from 'next/image';

type Props = { game: Game };

export default function GameCard({ game }: Props) {
  return (
    <Link href={`/games/${game.id}`}>
      <div className='border rounded p-2'>
        <div className='mb-2 pb-3 border-b flex'>
          <div className='w-1/3'>
            <div className='border rounded'>
              <Image src={binusLogo} alt='Game Image' width={100} height={100} />
            </div>
          </div>
          <div className='w-2/3 ml-4'>
            <h2 className='font-bold flex justify-between'>
              <span>{game.name}</span>
              {game.has_password && <LockClosedIcon className='w-4 h-4' />}
            </h2>
            <p className='text-sm'>{game.description}</p>
          </div>
        </div>

        <div className='flex'>
          <div className='w-1/2 border-r'>
            <div className='text-center'>
              <span className='block text-gray-400 font-semibold flex items-center justify-center'>
                <PlayIcon className='w-4 h-4 mr-1' /> <span className='block'>Start</span>
              </span>
              <span className='block text-sm font-bold'>
                {game.start_time
                  ? format(new Date(game.start_time), 'MMM dd, yyyy | kk:mm')
                  : 'TBD'}
              </span>
            </div>
          </div>
          <div className='w-1/2'>
            <div className='text-center'>
              <span className='block text-gray-400 font-semibold flex items-center justify-center'>
                <StopIcon className='w-4 h-4 mr-1' /> <span className='block'>End</span>
              </span>
              <span className='block text-sm font-bold'>
                {game.end_time ? format(new Date(game.end_time), 'MMM dd, yyyy | kk:mm') : 'TBD'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
