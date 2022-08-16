import { useState } from 'react';
import { GameMission } from '../../models/GameMission';
import MissionCard from './MissionCard';

type Props = {
  remainingMissions: GameMission[];
  completedMissions: GameMission[];
};

export default function MissionList({ remainingMissions, completedMissions }: Props) {
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

  const getMissions = () => {
    switch (activeTabId) {
      case 1:
        return remainingMissions;
      case 2:
        return completedMissions;
    }
  };

  return (
    <div>
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
