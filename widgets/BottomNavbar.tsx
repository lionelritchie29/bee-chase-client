import { BottomNavbarItem } from '../models/view/BottomNavbarItem';

type Props = {
  items: BottomNavbarItem[];
  activeItemId: number;
  setActiveTab: (tabId: number) => void;
};

export default function GameBottomNavbar({ items, activeItemId, setActiveTab }: Props) {
  return (
    <div className='btm-nav btm-nav-sm z-50'>
      {items.map((item) => (
        <button
          onClick={() => setActiveTab(item.id)}
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
