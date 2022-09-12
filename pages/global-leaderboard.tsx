import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import LeaderboardSkeleton from '../components/games/LeaderboardSkeleton';
import GlobalLeaderboardCard from '../components/global-leaderboard/GlobalLeaderboardCard';
import useLoading from '../hooks/use-loading';
import { GlobalRank } from '../models/GlobalRank';
import { SessionUser } from '../models/SessionUser';
import { Tag } from '../models/Tag';
import { TagService } from '../services/TagService';
import Layout from '../widgets/Layout';
import { authOptions } from './api/auth/[...nextauth]';

type Props = {
  tags: Tag[];
};

const GlobalLeaderboardPage: NextPage<Props> = ({ tags }) => {
  const session = useSession();
  const user = session?.data?.user as SessionUser;
  const tagService = new TagService(user?.access_token);
  const [selectedTagId, setSelectedTagId] = useState(tags ? tags[0].id : '');
  const [ranks, setRanks] = useState<GlobalRank[]>([]);
  const [{ isLoading, load, finish }] = useLoading(false);

  useEffect(() => {
    const fetchRanks = async () => {
      load();
      setRanks(await tagService.getLeaderboard(selectedTagId));
      finish();
    };

    if (user && tags.length > 0) fetchRanks();
  }, [selectedTagId, user]);

  if (tags.length == 0) {
    return (
      <Layout title='Global Leaderboard' controlSpacing={false} className='mt-4'>
        <div className='border rounded p-3 text-sm'>
          Cannot show leaderboard, no data available yet.
        </div>
      </Layout>
    );
  }

  return (
    <Layout title='Global Leaderboard' controlSpacing={false} className='mt-4'>
      <div className='form-control w-full px-4 mb-4'>
        <label className='label'>
          <span className='label-text'>Show leaderboard for:</span>
        </label>
        <select
          onChange={(e) => {
            setSelectedTagId(e.target.value);
          }}
          className='select select-bordered'>
          {tags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>
      </div>

      {!isLoading ? (
        <ul className='border-t'>
          {ranks.map((rank) => (
            <li key={rank.id}>
              <GlobalLeaderboardCard globalRank={rank} />
            </li>
          ))}
        </ul>
      ) : (
        <LeaderboardSkeleton />
      )}

      {ranks.length == 0 && (
        <div className='mt-4 border rounded p-3 mx-4 text-sm'>
          Cannot show leaderboard, no data available yet.
        </div>
      )}
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

  const user = session.user as SessionUser;
  const tagService = new TagService(user.access_token);
  const tags = await tagService.gets();

  return {
    props: {
      tags,
    },
  };
};

export default GlobalLeaderboardPage;
