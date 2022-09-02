import { Html5Qrcode } from 'html5-qrcode';
import { useEffect } from 'react';

export default function QrScanner() {
  const qrCodeRegionId = 'html5qr-code-full-region';

  useEffect(() => {
    const config: any = {};
    const qrCodeScanner = new Html5Qrcode(qrCodeRegionId);
    qrCodeScanner.start(
      { facingMode: 'environment' },
      config,
      (decodedText, decodedResult) => {
        console.log({ decodedText });
      },
      (errorMessage) => {
        // parse error, ignore it.
      },
    );
  }, []);

  return <div className='w-full p-4' id={qrCodeRegionId} />;
}
