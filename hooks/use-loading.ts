import { useState } from 'react';
import toast from 'react-hot-toast';

type LoadOptions = {
  useToast?: boolean;
};

export default function useLoading(initLoadingState: boolean, initMessage: string = '') {
  const [isLoading, setIsLoading] = useState(initLoadingState);
  const [message, setMessage] = useState(initMessage);

  function load(msg: string = '', { useToast = true }: LoadOptions = {}) {
    setIsLoading(true);
    if (useToast && msg.length > 0) toast(msg, { icon: '🔄' });
    if (msg) setMessage(msg);
  }

  function finish(msg: string = '', { success = true, loading = false } = {}) {
    setIsLoading(loading);
    if (msg.length > 0) {
      toast.dismiss();
      if (success) toast.success(msg);
      else toast.error(msg);
    }
    setMessage(msg);
  }

  return [{ isLoading, message, load, finish }];
}
