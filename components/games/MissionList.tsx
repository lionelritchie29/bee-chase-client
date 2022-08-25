import { ExclamationCircleIcon } from '@heroicons/react/outline';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Game } from '../../models/Game';
import { GameMission } from '../../models/GameMission';
import MissionCard from './MissionCard';

type Props = {
  remainingMissions: GameMission[];
  completedMissions: GameMission[];
  game: Game;
};

export default function MissionList({ remainingMissions, completedMissions, game }: Props) {
  const tabs = [
    {
      id: 1,
      title: 'Remaining',
    },
    {
      id: 2,
      title: 'Completed',
    },
  ];

  const [activeTabId, setActiveTabId] = useState(1);
  const router = useRouter();

  const getMissions = () => {
    switch (activeTabId) {
      case 1:
        return remainingMissions;
      case 2:
        return completedMissions;
    }
  };

  const getGameStatus = () => {
    if (!game.start_time || !game.end_time)
      return 'The game has been stopped or has not been started yet, please wait or contact admin.';

    const currDate = new Date();
    const startDate = new Date(game.start_time);
    if (currDate.getTime() < startDate.getTime())
      return `The game will start at <b>${format(startDate, 'kk:mm')}</b> on <b>${format(
        startDate,
        'MMM dd, yyyy',
      )}</b>`;

    return '';
  };

  const isGameExpired = () => {
    if (!game.start_time || !game.end_time) return false;

    const currDate = new Date();
    const endDate = new Date(game.end_time);
    return currDate.getTime() >= endDate.getTime();
  };

  const gameStatus = getGameStatus();

  if (gameStatus) {
    return (
      <div className='h-full p-8 flex justify-center flex-col'>
        <div className='mx-auto'>
          <ExclamationCircleIcon className='w-12 h-12' />
        </div>
        <div className='mt-4 text-center' dangerouslySetInnerHTML={{ __html: gameStatus }}></div>
        <button
          onClick={() => {
            router.replace(`/games/${game.id}/play`);
          }}
          className='btn btn-primary text-white mt-4'>
          Refresh game state
        </button>
      </div>
    );
  }

  return (
    <div>
      {isGameExpired() && (
        <div className='border border-red-300 p-2 m-2 rounded text-sm text-center bg-red-100'>
          The game has been ended.
        </div>
      )}

      <div style={{ padding: '0.1rem' }} className='tabs m-2 rounded-md border'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            className={`tab w-1/2 ${
              activeTabId === tab.id ? 'bg-orange-400 text-white rounded shadow' : ''
            }`}>
            {tab.title}
          </button>
        ))}
      </div>

      <div className='mt-4'>
        <ul className='grid grid-cols-1 md:grid-cols-2'>
          {getMissions()?.length === 0 && (
            <li className='text-center'>
              No {activeTabId === 1 ? 'remaining' : 'completed'} mission.
            </li>
          )}
          {getMissions()?.map((mission) => (
            <li key={mission.id}>
              <MissionCard mission={mission} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
