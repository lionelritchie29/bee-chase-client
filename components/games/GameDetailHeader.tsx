import Image from 'next/image';
import { Game } from '../../models/Game';
import placeholder from '../../public/assets/binus_placeholder.jpg';

type Props = {
  game: Game;
};

export default function GameDetailHeader({ game }: Props) {
  return (
    <div className='relative'>
      <div style={{ background: '#0394c4' }} className='h-32 -mt-1'></div>
      <div className='h-32'>
        <div className='absolute bottom-10 w-full'>
          {game.image ? (
            <img
              className='w-full rounded object-fit h-32 w-32 mx-auto'
              src='https://i.pravatar.cc/200'
              alt='game image'
            />
          ) : (
            <div className='flex justify-center'>
              <div className='shadow rounded'>
                <Image
                  src={placeholder}
                  width={128}
                  height={128}
                  alt='Game Image'
                  className='rounded object-fit'
                />
              </div>
            </div>
          )}
          <div className='text-center mt-2 font-bold text-lg mx-4'>{game.name}</div>
        </div>
      </div>
    </div>
  );
}
