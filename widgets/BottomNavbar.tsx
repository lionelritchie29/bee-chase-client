import { Dispatch, SetStateAction } from 'react';
import { BottomNavbarItem } from '../models/view/BottomNavbarItem';

type Props = {
  items: BottomNavbarItem[];
  activeItemId: number;
  setActiveItemId: Dispatch<SetStateAction<number>>;
};

export default function GameBottomNavbar({ items, activeItemId, setActiveItemId }: Props) {
  return (
    <div className='btm-nav'>
      {items.map((item) => (
        <button
          onClick={() => setActiveItemId(item.id)}
          className={`border-t ${activeItemId === item.id ? 'border-primary' : 'border-gray-300'}`}
          key={item.id}>
          <div className={`${activeItemId === item.id ? 'text-primary' : ''}`}>{item.icon}</div>
          <span
            className={`btm-nav-label text-sm ${activeItemId === item.id ? 'text-primary' : ''}`}>
            {item.title}
          </span>
        </button>
      ))}
    </div>
  );
}
