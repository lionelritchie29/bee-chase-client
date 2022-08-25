import Link from 'next/link';
import { Game } from '../../models/Game';
import GameCard from '../shared/GameCard';

type Props = {
  games: Game[];
};

export default function GameList({ games }: Props) {
  return (
    <section>
      <h1 className='font-bold border mb-2 rounded py-2 px-4 mt-2'>My Joined Games</h1>
      <ul className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {games.map((game) => (
          <li key={game.id}>
            <GameCard game={game} />
          </li>
        ))}
      </ul>
    </section>
  );
}
