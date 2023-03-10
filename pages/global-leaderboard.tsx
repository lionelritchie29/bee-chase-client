import {
  addDays,
  endOfMonth,
  format,
  formatISO,
  startOfMonth,
  startOfYear,
  subDays,
} from 'date-fns';
import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import LeaderboardSkeleton from '../components/games/LeaderboardSkeleton';
import GlobalLeaderboardCard from '../components/global-leaderboard/GlobalLeaderboardCard';
import { GLOBAL_LEADERBOARD } from '../constants/global-leaderboard';
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
  const [filterDate, setFilterDate] = useState(false);
  const [{ isLoading, load, finish }] = useLoading(false);
  const [{ isLoading: isLoadingCurrent, load: loadCurrent, finish: finishCurrent }] =
    useLoading(false);

  const startDateDomRef = useRef<any>(null);
  const endDateDomRef = useRef<any>(null);

  const currDate = new Date();
  const minStartDate = GLOBAL_LEADERBOARD.ENABLE_FILTER
    ? GLOBAL_LEADERBOARD.START_DATE
    : '1970-01-01T00:00:00Z';
  const maxEndDate = GLOBAL_LEADERBOARD.ENABLE_FILTER
    ? GLOBAL_LEADERBOARD.END_DATE
    : formatISO(endOfMonth(currDate)).slice(0, -9);

  const [startDate, setStartDate] = useState(() => {
    if (GLOBAL_LEADERBOARD.ENABLE_FILTER) return new Date(GLOBAL_LEADERBOARD.START_DATE);
    return startOfYear(currDate);
  });
  const [endDate, setEndDate] = useState(() => {
    if (GLOBAL_LEADERBOARD.ENABLE_FILTER) return addDays(new Date(GLOBAL_LEADERBOARD.END_DATE), 1);
    return endOfMonth(currDate);
  });

  useEffect(() => {
    const fetchRanks = async () => {
      load();

      setRanks(
        await tagService.getGlobalLeaderboard(
          selectedTagId,
          formatISO(startDate),
          formatISO(endDate),
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
        formatISO(startDate),
        formatISO(endDate),
      );
      finishCurrent();
      setCurrentRank(curr ?? null);
    };

    if (user && tags.length > 0) fetchCurrentRank();
  }, [selectedTagId, startDate, endDate, filterDate, user]);

  const handleChangeStartDate = (e: any) => {
    const selectedDate = new Date(e.target.value);
    const endDate = GLOBAL_LEADERBOARD.ENABLE_FILTER
      ? new Date(GLOBAL_LEADERBOARD.END_DATE)
      : new Date();

    if (selectedDate.getTime() > endDate.getTime()) {
      alert(`Start date must be less than or equal ${format(endDate, 'dd MMM yyyy, HH:mm')}`);
      setStartDate(startDate);
      startDateDomRef.current.value = format(startDate, 'yyyy-MM-dd HH:mm');
      return;
    }

    setStartDate(selectedDate);
  };

  const handleChangeEndDate = (e: any) => {
    const selectedEnd = new Date(e.target.value);
    const selectedStart = new Date(startDate);

    if (selectedEnd.getTime() > endDate.getTime()) {
      alert(`End date must be less than or equal ${format(endDate, 'dd MMM yyyy, HH:mm')}`);
      setEndDate(endDate);
      endDateDomRef.current.value = format(endDate, 'yyyy-MM-dd HH:mm');
      return;
    }

    if (selectedStart.getTime() >= selectedEnd.getTime()) {
      setStartDate(subDays(selectedEnd, 1));
    }
    setEndDate(selectedEnd);
  };

  if (tags.length == 0) {
    return (
      <Layout title='Global Leaderboard' controlSpacing={false} className='mt-4'>
        <div className='border rounded p-3 text-sm'>
          Cannot show leaderboard, no data available yet.
        </div>
      </Layout>
    );
  }

  const renderLeaderboardInfo = () => {
    if (!GLOBAL_LEADERBOARD.ENABLE_FILTER) return <></>;
    return (
      <div className='text-xs mx-3 mt-2 bg-blue-100 text-blue-600 p-2 border rounded border-blue-300 space-y-4'>
        <p>
          Leaderboard will be updated every one hour (ex: 11:00, 12:00, etc) and will not be updated
          to participants after{' '}
          <b>{format(new Date(GLOBAL_LEADERBOARD.END_DATE), 'dd MMM yyyy, HH:mm')}</b>. Leaderboard
          data calculated at <b>{GLOBAL_LEADERBOARD.CUT_OFF}</b> will be used to determine the
          winner of this competition (but not shown to participants), and will be announced at the
          Closing Ceremony.
        </p>

        <p>
          Please join the Reward Announcement and Closing at{' '}
          <b>{format(new Date(GLOBAL_LEADERBOARD.ANNOUNCEMENT_DATE), 'HH:mm')}</b> in{' '}
          <b>{GLOBAL_LEADERBOARD.ANNOUNCEMENT_PLACE}</b>.
        </p>
      </div>
    );
  };

  const renderGlobalLeaderboardDateInfo = () => {
    return (
      <div className='text-xs mx-3 mt-2 bg-blue-100 text-blue-600 p-2 border rounded border-blue-300 space-y-4'>
        <p>
          Showing Global Leaderboard from <b>{format(startDate, 'dd MMM yyyy, HH:mm')}</b> to{' '}
          <b>{format(endDate, 'dd MMM yyyy, HH:mm')}</b>
        </p>
      </div>
    );
  };

  return (
    <Layout title='Global Leaderboard' controlSpacing={false} className='mt-4'>
      {renderLeaderboardInfo()}
      {renderGlobalLeaderboardDateInfo()}

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
        <div>
          <div className='px-3 mb-4 mt-4'>
            <label className='text-sm ml-1'>From</label>
            <input
              defaultValue={formatISO(startDate).slice(0, -9)}
              onChange={handleChangeStartDate}
              ref={startDateDomRef}
              min={minStartDate}
              max={maxEndDate}
              type='datetime-local'
              className='w-full input input-bordered'
              required
            />
          </div>

          <div className='px-3 mb-4'>
            <label className='text-sm ml-1'>To</label>
            <input
              defaultValue={formatISO(endDate).slice(0, -9)}
              onChange={handleChangeEndDate}
              type='datetime-local'
              ref={endDateDomRef}
              min={minStartDate}
              max={maxEndDate}
              className='w-full input input-bordered'
              required
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
