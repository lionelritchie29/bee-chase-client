import { NextPage } from 'next';
import SelectTeam from '../../../components/teams/SelectTeam';
import Layout from '../../../widgets/Layout';

const GameTeamsPage: NextPage = () => {
  return (
    <Layout controlSpacing={false}>
      <SelectTeam />
    </Layout>
  );
};

export default GameTeamsPage;
