import { NextPage } from 'next';
import MissionCard from '../../../../components/games/MissionCard';
import Layout from '../../../../widgets/Layout';

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

export default MissionDetailPage;
