export default function GameCardSkeleton() {
  return (
    <div className='border rounded p-2 shadow-sm'>
      <div className='mb-2 pb-3 border-b flex'>
        <div className='w-1/3'>
          <div className='border pt-3 h-28 w-full rounded animate-pulse bg-gray-300 rounded flex justify-center'></div>
        </div>
        <div className='w-2/3 ml-4'>
          <h2 className='font-bold flex justify-between bg-gray-300 w-36 h-5 mb-2 rounded animate-pulse'></h2>
          <p className='text-sm bg-gray-300 rounded animate-pulse h-5 w-full'></p>
          <p className='text-sm bg-gray-300 rounded animate-pulse h-5 w-full mt-1'></p>
          <p className='text-sm bg-gray-300 rounded animate-pulse h-5 w-full mt-1'></p>
        </div>
      </div>

      <div className='flex'>
        <div className='w-1/2 border-r'>
          <div className='text-center'>
            <span className='block text-sm font-bold w-28 mx-auto h-10 rounded animate-pulse bg-gray-300'></span>
          </div>
        </div>
        <div className='w-1/2'>
          <span className='block text-sm font-bold w-28 mx-auto h-10 rounded animate-pulse bg-gray-300'></span>
        </div>
      </div>
    </div>
  );
}
