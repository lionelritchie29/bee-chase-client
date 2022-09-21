import { addDays, format, subDays } from 'date-fns';
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
  const [currentRank, setCurrentRank] = useState<GlobalRank | null>(null);
  const [filterDate, setFilterDate] = useState(true);
  const [{ isLoading, load, finish }] = useLoading(false);
  const [{ isLoading: isLoadingCurrent, load: loadCurrent, finish: finishCurrent }] =
    useLoading(false);

  const [startDate, setStartDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState(format(addDays(new Date(), 1), 'yyyy-MM-dd'));

  useEffect(() => {
    const fetchRanks = async () => {
      load();

      setRanks(
        await tagService.getGlobalLeaderboard(
          selectedTagId,
          filterDate ? startDate : '1970-01-01',
          filterDate ? endDate : '2999-01-01',
        ),
      );
      finish();
    };

    if (user && tags.length > 0) fetchRanks();
  }, [selectedTagId, startDate, endDate, filterDate, user]);

  useEffect(() => {
    const fetchCurrentRank = async () => {
      loadCurrent();

      const curr = await tagService.getCurrentGlobalLeaderboard(
        selectedTagId,
        filterDate ? startDate : '1970-01-01',
        filterDate ? endDate : '2999-01-01',
      );
      finishCurrent();
      setCurrentRank(curr ?? null);
    };

    if (user && tags.length > 0) fetchCurrentRank();
  }, [selectedTagId, startDate, endDate, filterDate, user]);

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
      <div className='form-control w-full px-3 mb-4'>
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

      <div className='form-control px-3'>
        <label className='flex cursor-pointer'>
          <input
            type='checkbox'
            onChange={(e) => setFilterDate(e.target.checked)}
            checked={filterDate}
            className='checkbox'
          />
          <div className='ml-3'>Filter date</div>
        </label>
      </div>

      {filterDate && (
        <div className='flex'>
          <div className='px-3 mb-4 mt-4'>
            <label className='text-sm ml-1'>From</label>
            <input
              defaultValue={startDate}
              onChange={(e) => {
                const date = e.target.value;
                setStartDate(date);
                setEndDate(format(addDays(new Date(date), 1), 'yyyy-MM-dd'));
              }}
              type='date'
              className='w-full input input-bordered'
            />
          </div>

          <div className='px-3 mb-4 mt-4'>
            <label className='text-sm ml-1'>To</label>
            <input
              defaultValue={endDate}
              onChange={(e) => {
                const end = new Date(e.target.value);
                const start = new Date(startDate);

                if (start.getTime() >= end.getTime()) {
                  setStartDate(format(subDays(end, 1), 'yyyy-MM-dd'));
                }
                setEndDate(e.target.value);
              }}
              type='date'
              className='w-full input input-bordered'
            />
          </div>
        </div>
      )}

      <div className='divider'></div>

      <div className='mx-3'>
        Hi, <span className='font-bold'>{user?.name}</span>
      </div>
      <div className='flex justify-between uppercase mb-4 mx-3 bg-orange-100 border border-orange-300 rounded p-2'>
        <div className='flex items-center'>
          <span className='block'>Your Score: </span>

          {isLoadingCurrent ? (
            <span className='block ml-1 h-5 w-20 bg-gray-300 rounded animate-pulse'></span>
          ) : (
            <span className='block font-bold ml-1'>
              {currentRank ? `${currentRank.total_point} pts` : '#NA'}
            </span>
          )}
        </div>

        <div>
          Rank: #<span className='font-bold'>{currentRank ? currentRank.rank : 'N/A'}</span>
        </div>
      </div>

      {!isLoading ? (
        <ul className='border-t'>
          {ranks.map((rank) => (
            <li key={rank.id}>
              <GlobalLeaderboardCard currentUser={user} globalRank={rank} />
            </li>
          ))}
        </ul>
      ) : (
        <LeaderboardSkeleton />
      )}

      {ranks.length == 0 && (
        <div className='mt-4 border rounded p-3 mx-3 text-sm'>
          Cannot show leaderboard, no data available yet.
        </div>
      )}

      <div className='text-xs mx-3 mt-2 text-blue-600'>
        Leaderboard will be updated every one hours (ex: 11:00, 12:00, etc)
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
