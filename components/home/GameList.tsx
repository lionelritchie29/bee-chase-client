import GameCard from '../shared/GameCard';

export default function GameList() {
  return (
    <section>
      <ul className='grid grid-cols-1 gap-4'>
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
