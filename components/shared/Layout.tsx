import Image from 'next/image';
import useWindowSize from '../../hooks/use-window-size';
import binusLogo from '../../public/assets/logo.png';

type Props = {
  children: any;
  className?: string;
  style?: any;
  showNavbar?: boolean;
};

export default function Layout({ children, className = '', style = {}, showNavbar = true }: Props) {
  const size = useWindowSize();

  if (size.width && size.width >= 1024) {
    return (
      <section className='h-screen w-full bg-white absolute top-0 left-0 flex justify-center items-center'>
        This app could only be used in mobile or tablets.
      </section>
    );
  }

  return (
    <div>
      {showNavbar && (
        <nav className='navbar bg-primary border-b text-white'>
          <div className='flex-1'>
            {/* <Image src={binusLogo} width={50} height={30} alt='logo' /> */}
            <a className='btn btn-ghost normal-case text-xl'>BeeChase</a>
          </div>
          <div className='flex-none'>
            <button className='btn btn-square btn-ghost'>
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
            </button>
          </div>
        </nav>
      )}

      <main style={style} className={`pt-4 min-h-screen px-6 ${className}`}>
        {children}
      </main>
    </div>
  );
}
