import Image from 'next/image';
import useWindowSize from '../hooks/use-window-size';
import binusLogo from '../../public/assets/logo.png';
import Navbar from './Navbar';

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
      {showNavbar && <Navbar />}

      <main style={style} className={`pt-20 min-h-screen px-4 ${className}`}>
        {children}
      </main>
    </div>
  );
}
