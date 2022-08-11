import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import MissionCard from '../../../../components/games/MissionCard';
import Layout from '../../../../widgets/Layout';
import { authOptions } from '../../../api/auth/[...nextauth]';

const MissionDetailPage: NextPage = () => {
  return (
    <Layout controlSpacing={false} className='bg-gray-100'>
      <MissionCard className='pt-3' />

      <div className='px-3'>
        <button className='btn btn-primary text-white w-full shadow'>Submit Evidence</button>
      </div>
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

export default MissionDetailPage;
