import { CameraIcon } from '@heroicons/react/outline';

export default function MissionCard() {
  return (
    <div className='mb-3 pb-3 border-b'>
      <div className='mx-3 flex'>
        <div className='border-2 border-orange-300 w-24 h-24 flex items-center justify-center'>
          <CameraIcon className='w-12 h-12 text-orange-300' />
        </div>

        <div className='ml-3 flex-1'>
          <div className='flex justify-between'>
            <div className='font-bold'>Brilliant!</div>
            <div className='text-gray-400 font-semibold'>400pts</div>
          </div>
          <div className='text-gray-400 text-sm'>
            Snap a shot of a teammate standing under a lightbulb as if coming up with a brilliant
            idea.
          </div>
        </div>
      </div>
    </div>
  );
}
