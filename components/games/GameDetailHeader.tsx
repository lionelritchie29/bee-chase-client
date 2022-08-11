export default function GameDetailHeader() {
  return (
    <div className='relative'>
      <div style={{ background: '#0394c4' }} className='h-32 -mt-1'></div>
      <div className='h-32'>
        <div className='absolute bottom-10 w-full'>
          <img
            className='w-full rounded object-fit h-32 w-32 mx-auto'
            src='https://i.pravatar.cc/200'
            alt='game image'
          />
          <div className='text-center mt-2 font-bold text-lg'>Telor</div>
        </div>
      </div>
    </div>
  );
}
