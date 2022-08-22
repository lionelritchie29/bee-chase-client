import { GameTeam, GameTeamRank } from '../../models/GameTeam';
import LeaderboardCard from './LeaderboardCard';

type Props = {
  teamRanks: (GameTeam & GameTeamRank)[];
};

export default function LeaderboardList({ teamRanks }: Props) {
  return (
    <ul>
      {teamRanks.map((teamRank) => (
        <li key={teamRank.id}>
          <LeaderboardCard teamRank={teamRank} />
        </li>
      ))}
    </ul>
  );
}
