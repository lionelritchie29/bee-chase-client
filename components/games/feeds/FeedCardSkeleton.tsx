export default function FeedCardSkeleton() {
  return (
    <div className='border bg-white rounded shadow p-4'>
      <div className='flex items-center'>
        <div className='h-12 w-14 rounded-full border bg-gray-300 animate-pulse'></div>

        <div className='ml-2 w-full'>
          <div className='flex justify-between'>
            <div className='font-bold truncate h-4 w-28 bg-gray-300 rounded animate-pulse'></div>
            <div className='text-xs h-3 w-12 bg-gray-300 rounded animate-pulse'></div>
          </div>
          <div className='text-sm font-normal flex mt-2'>
            <span className='font-semibold truncate h-4 w-24 bg-gray-300 block rounded animate-pulse'></span>{' '}
            <span className='ml-1 h-4 w-12 block bg-gray-300 rounded animate-pulse'></span>
          </div>
        </div>
      </div>

      <div className='mt-4 h-32 w-full bg-gray-300 rounded animate-pulse'></div>
    </div>
  );
}
