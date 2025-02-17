import {
  ChevronLeftIcon,
  PlusIcon,
  ArrowPathIcon,
  UserCircleIcon,
  ChartBarIcon,
  ArrowRightOnRectangleIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentCheckIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { SessionUser } from '../models/SessionUser';

type Props = {
  title?: string;
};

export default function Navbar({ title }: Props) {
  const router = useRouter();

  const globalLeaderboardAllowedRoutes = ['/', '/join'];

  const backBtnAllowedRoutes = [
    '/games/[id]/play',
    '/games/[id]/missions/[missionId]',
    '/join',
    '/games/[id]',
    '/games/[id]/teams',
    '/games/[id]/teams/create',
    '/global-leaderboard',
    '/how-to-play',
  ];

  const refreshBtnAllowedRoutes = [
    '/games/[id]/play',
    '/games/[id]/missions/[missionId]',
    '/games/[id]',
    '/games/[id]/teams',
  ];

  const joinBtnAllowedRoutes = ['/'];

  const profileBtnAllowedRoutes = ['/', '/join'];

  const getLeftWidgets = () => {
    return (
      <>
        {backBtnAllowedRoutes.includes(router.pathname) && (
          <button
            tabIndex={0}
            onClick={() => {
              if (router.pathname.includes('play')) router.replace('/');
              else router.back();
            }}
            className='btn btn-square btn-ghost'>
            <ChevronLeftIcon className='w-5 h-5' />
          </button>
        )}
      </>
    );
  };

  const getRightWidgets = () => {
    return (
      <>
        {joinBtnAllowedRoutes.includes(router.pathname) && (
          <button
            tabIndex={0}
            onClick={() => {
              router.push('/join');
            }}
            className='btn btn-square btn-ghost'>
            <PlusIcon className='w-5 h-5' />
          </button>
        )}

        {globalLeaderboardAllowedRoutes.includes(router.pathname) && (
          <button
            tabIndex={0}
            onClick={() => {
              router.push('/global-leaderboard');
            }}
            className='btn btn-square btn-ghost'>
            <ChartBarIcon className='w-5 h-5' />
          </button>
        )}

        {refreshBtnAllowedRoutes.includes(router.pathname) && (
          <button
            tabIndex={0}
            onClick={() => {
              router.reload();
            }}
            className='btn btn-square btn-ghost'>
            <ArrowPathIcon className='w-5 h-5' />
          </button>
        )}

        {profileBtnAllowedRoutes.includes(router.pathname) && (
          <div className='dropdown dropdown-end'>
            <label tabIndex={0} className='btn btn-square btn-ghost'>
              <UserCircleIcon className='w-5 h-5' />
            </label>
            <ul
              tabIndex={0}
              className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-black'>
              <li>
                <button className='flex items-center' onClick={() => router.push('/how-to-play')}>
                  <InformationCircleIcon className='w-5 h-5' /> How to Play
                </button>
              </li>
              <li>
                <button onClick={logOut} className='flex items-center'>
                  <ArrowRightOnRectangleIcon className='mr-1 w-5 h-5' /> Log out
                </button>
              </li>
            </ul>
          </div>
        )}
      </>
    );
  };

  const logOut = async () => {
    await signOut({ callbackUrl: '/auth/login' });
  };

  return (
    <nav className='navbar bg-primary border-b text-white'>
      {getLeftWidgets()}
      <div className='flex-1 truncate'>
        <a className='btn btn-ghost normal-case text-xl'>{title ?? 'BeeChase'}</a>
      </div>
      <div className='flex-none'>{getRightWidgets()}</div>
    </nav>
  );
}
