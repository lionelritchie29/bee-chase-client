export default function MissionCardSkeleton() {
  return (
    <div className='w-full'>
      <div className='mb-3 pb-3 border-b bg-white'>
        <div className='mx-3 flex'>
          <div className='bg-gray-300 rounded w-24 h-24 animate-pulse'></div>

          <div className='ml-3 flex-1'>
            <div className='flex justify-between items-start'>
              <div className='w-24 h-5 bg-gray-300 rounded animate-pulse'></div>
              <div className='text-gray-400 font-semibold flex items-center'>
                <span className='rounded-full w-16 h-5 bg-gray-300 animate-pulse'></span>
              </div>
            </div>
            <div className='bg-gray-300 w-full rounded animate-pulse h-4 mt-2'></div>
            <div className='bg-gray-300 w-full rounded animate-pulse h-4 mt-2'></div>
            <div className='bg-gray-300 w-full rounded animate-pulse h-4 mt-2'></div>
          </div>
        </div>
      </div>
    </div>
  );
}
