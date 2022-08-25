export default function LeaderboardSkeleton() {
  return (
    <ul>
      {[1, 2, 3, 4].map((rank) => (
        <div key={rank} className='flex items-center justify-between p-2 border-b'>
          <div className='flex'>
            <div className='avatar'>
              <div className='w-12 bg-gray-300 rounded-full  animate-pulse'></div>
            </div>
            <div className='ml-3'>
              <span className='block font-bold bg-gray-300 w-40 h-5 animate-pulse rounded'></span>
              <span className='block bg-gray-300 font-semibold text-gray-400 w-24 h-5 animate-pulse rounded mt-1 text-sm'></span>
            </div>
          </div>

          <div className='font-bold bg-gray-300 w-12 h-8 rounded animate-pulse'></div>
        </div>
      ))}
    </ul>
  );
}
