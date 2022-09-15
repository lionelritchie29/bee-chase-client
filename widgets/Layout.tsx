import useWindowSize from '../hooks/use-window-size';
import Navbar from './Navbar';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

type Props = {
  children: any;
  className?: string;
  style?: any;
  showNavbar?: boolean;
  controlSpacing?: boolean;
  title?: string;
};

export default function Layout({
  children,
  className = '',
  style = {},
  showNavbar = true,
  controlSpacing = true,
  title = undefined,
}: Props) {
  const size = useWindowSize();
  const [showInstall, setShowInstall] = useState(false);
  const deferredPrompt = useRef<any | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeinstallprompt', (e) => {
        deferredPrompt.current = e;
        setShowInstall(true);
      });

      window.addEventListener('appinstalled', () => {
        setShowInstall(false);
        deferredPrompt.current = null;
        console.log('PWA was installed');
      });
    }
  }, []);

  const onInstall = async () => {
    if (deferredPrompt.current) {
      deferredPrompt.current.prompt();
      const { outcome } = await deferredPrompt.current.userChoice;
      console.log({ outcome });
      deferredPrompt.current = null;
    }
  };

  if (size.width && size.width >= 1024) {
    return (
      <section className='h-screen w-full bg-white absolute top-0 left-0 flex justify-center items-center'>
        This app could only be used in mobile or tablets.
      </section>
    );
  }

  return (
    <>
      <Head>
        <title>BeeChase</title>
      </Head>
      <div className='min-h-screen'>
        {showInstall && (
          <div className='bg-primary border-b border-white flex justify-between pl-1 pr-4 py-2 items-center'>
            <div className='flex items-center space-x-2'>
              <button
                className='btn btn-sm btn-ghost text-white'
                onClick={() => {
                  setShowInstall(false);
                }}>
                <XMarkIcon className='w-5 h-5' />
              </button>
              <div className='text-white font-semibold'>Install BeeChase</div>
            </div>
            <div>
              <button onClick={onInstall} className='btn btn-sm btn-secondary text-white'>
                Install
              </button>
            </div>
          </div>
        )}
        {showNavbar && <Navbar title={title} />}

        <main style={style} className={`${controlSpacing ? 'px-4' : ''} ${className} pb-8`}>
          {children}
        </main>
      </div>
    </>
  );
}
