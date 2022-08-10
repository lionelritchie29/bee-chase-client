export default function LeaderboardCard() {
  return (
    <div className='flex items-center justify-between p-2 border-b'>
      <div className='flex'>
        <div className='avatar'>
          <div className='w-12 rounded-full'>
            <img src='https://placeimg.com/192/192/people' />
          </div>
        </div>
        <div className='ml-3'>
          <span className='block font-bold'>Tim A</span>
          <span className='block text-sm'>0 points</span>
        </div>
      </div>

      <div className='font-bold'>1st</div>
    </div>
  );
}
