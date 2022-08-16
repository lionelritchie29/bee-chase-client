import { GameTeam } from '../../models/GameTeam';
import LeaderboardCard from './LeaderboardCard';

type Props = {
  teams: GameTeam[];
};

export default function LeaderboardList({ teams }: Props) {
  return (
    <ul>
      {teams.map((team) => (
        <li key={team.id}>
          <LeaderboardCard />
        </li>
      ))}
    </ul>
  );
}
