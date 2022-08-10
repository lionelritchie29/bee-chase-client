import { useState } from 'react';
import MissionCard from './MissionCard';

export default function MissionList() {
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

  const renderContent = () => {
    switch (activeTabId) {
      case 1:
        return 'Remaining';
      case 2:
        return 'Completed';
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
              activeTabId === tab.id ? 'bg-primary text-white rounded shadow' : ''
            }`}>
            {tab.title}
          </button>
        ))}
      </div>

      <div>
        <ul className='grid grid-cols-1 md:grid-cols-2'>
          <li>
            <MissionCard />
          </li>
          <li>
            <MissionCard />
          </li>
          <li>
            <MissionCard />
          </li>
        </ul>
      </div>
    </div>
  );
}
