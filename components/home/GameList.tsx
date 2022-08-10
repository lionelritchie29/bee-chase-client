import Link from 'next/link';
import GameCard from '../shared/GameCard';

export default function GameList() {
  return (
    <section>
      <h1 className='font-bold border mb-2 rounded py-2 px-4 mt-2'>Available Games</h1>
      <ul className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <li>
          <GameCard key={1} />
        </li>
        <li>
          <GameCard key={2} />
        </li>
        <li>
          <GameCard key={3} />
        </li>
      </ul>
    </section>
  );
}
