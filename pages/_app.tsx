import '../styles/globals.css';
import type { AppProps } from 'next/app';
import toast, { Toaster } from 'react-hot-toast';

import { SessionProvider } from 'next-auth/react';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { SWRConfig } from 'swr';

const NextNProgress = dynamic(() => import('nextjs-progressbar'));

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  useEffect(() => {
    toast.dismiss();
  }, []);

  return (
    <SessionProvider session={session} basePath={`${process.env.NEXT_PUBLIC_BASE_PATH}/api/auth`}>
      <Toaster />
      <NextNProgress color='#fb923c' />
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
        }}>
        <Component {...pageProps} />
      </SWRConfig>
    </SessionProvider>
  );
}
