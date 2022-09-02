import { Html5Qrcode } from 'html5-qrcode';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import toast from 'react-hot-toast';

type Props = {
  setValue: UseFormSetValue<{ code: string }>;
  setIsScanning: Dispatch<SetStateAction<boolean>>;
};

export default function QrScanner({ setValue, setIsScanning }: Props) {
  const qrCodeRegionId = 'html5qr-code-full-region';

  useEffect(() => {
    const config: any = {};
    const qrCodeScanner = new Html5Qrcode(qrCodeRegionId);
    qrCodeScanner.start(
      { facingMode: 'environment' },
      config,
      (decodedText) => {
        setValue('code', decodedText);
        setIsScanning(false);
        toast.success('Code scanned succesfully!');
      },
      (errorMessage) => {
        // parse error, ignore it.
      },
    );
  }, []);

  return <div className='w-full p-4' id={qrCodeRegionId} />;
}
