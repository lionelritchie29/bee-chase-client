import Layout from '../components/shared/Layout';
import InputGameCode from '../components/home/InputGameCode';
import { NextPage } from 'next';
import GameList from '../components/home/GameList';

const Home: NextPage = () => {
  return (
    <Layout>
      {/* <InputGameCode /> */}
      <GameList />
    </Layout>
  );
};

export default Home;
