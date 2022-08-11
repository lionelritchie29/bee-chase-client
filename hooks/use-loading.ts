import { useState } from 'react';
import toast from 'react-hot-toast';

type LoadOptions = {
  useToast?: boolean;
};

export default function useLoading(initLoadingState: boolean, initMessage: string = '') {
  const [isLoading, setIsLoading] = useState(initLoadingState);
  const [message, setMessage] = useState(initMessage);

  function load(message: string, { useToast = true }: LoadOptions = {}) {
    setIsLoading(true);
    if (useToast) toast(message, { icon: '🔄' });
    setMessage(message);
  }

  function finish() {
    setIsLoading(false);
    setMessage('');
  }

  return [{ isLoading, message, load, finish }];
}
