import { PlusIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className='navbar bg-primary border-b text-white'>
      <div className='flex-1'>
        <a className='btn btn-ghost normal-case text-xl'>BeeChase</a>
      </div>
      <div className='flex-none'>
        <button
          tabIndex={0}
          onClick={() => {
            router.push('/join');
          }}
          className='btn btn-square btn-ghost'>
          <PlusIcon className='w-5 h-5' />
        </button>
        <div className='dropdown dropdown-end'>
          <label tabIndex={0} className='btn btn-square btn-ghost'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='inline-block w-5 h-5 stroke-current'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z'></path>
            </svg>
          </label>
          <ul
            tabIndex={0}
            className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-black'>
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
