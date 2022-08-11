import Layout from '../widgets/Layout';
import InputGameCode from '../components/home/InputGameCode';
import { GetServerSideProps, NextPage } from 'next';
import GameList from '../components/home/GameList';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

const Home: NextPage = () => {
  return (
    <Layout>
      {/* <InputGameCode /> */}
      <GameList />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Home;
