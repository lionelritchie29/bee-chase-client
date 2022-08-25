import Link from 'next/link';
import { Game } from '../../models/Game';
import GameCard from '../shared/GameCard';

type Props = {
  games: Game[];
  title: string;
};

export default function GameList({ games, title }: Props) {
  return (
    <section>
      <ul className='bg-white grid grid-cols-1 md:grid-cols-2 gap-4 mt-2'>
        {games.length === 0 && (
          <li className='border rounded p-2 min-h-[36rem] flex items-center shadow-sm justify-center'>
            There are no {title} games.
          </li>
        )}

        {games.map((game) => (
          <li key={game.id}>
            <GameCard game={game} />
          </li>
        ))}
      </ul>
    </section>
  );
}
