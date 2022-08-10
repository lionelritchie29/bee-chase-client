import { CameraIcon, ChevronRightIcon } from '@heroicons/react/outline';
import Link from 'next/link';

type Props = {
  className?: string;
};

export default function MissionCard({ className }: Props) {
  return (
    <Link href='/games/123/missions/123'>
      <div className={`mb-3 pb-3 ${className} border-b bg-white`}>
        <div className='mx-3 flex'>
          <div className='border-2 border-orange-300 w-24 h-24 flex items-center justify-center'>
            <CameraIcon className='w-12 h-12 text-orange-300' />
          </div>

          <div className='ml-3 flex-1'>
            <div className='flex justify-between'>
              <div className='font-bold'>Brilliant!</div>
              <div className='text-gray-400 font-semibold flex items-center'>
                <span className='block'>400pts</span>
                {/* <ChevronRightIcon className='w-4 h-4 ml-2 text-orange-400' /> */}
              </div>
            </div>
            <div className='text-gray-400 text-sm'>
              Snap a shot of a teammate standing under a lightbulb as if coming up with a brilliant
              idea.
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
