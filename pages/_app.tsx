import '../styles/globals.css';
import type { AppProps } from 'next/app';
import toast, { Toaster } from 'react-hot-toast';

import { SessionProvider } from 'next-auth/react';
import { useEffect } from 'react';
import NextNProgress from 'nextjs-progressbar';
export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  useEffect(() => {
    toast.dismiss();
  }, []);

  return (
    <SessionProvider session={session}>
      <Toaster />
      <NextNProgress color='#fb923c' />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
