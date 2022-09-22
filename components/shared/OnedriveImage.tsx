import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { FileAnswerData } from '../../models/answer-data/FileAnswerData';
import { SessionUser } from '../../models/SessionUser';
import { Submission } from '../../models/Submission';
import { OnedriveService } from '../../services/OnedriveService';
import defaultPlaceholder from '../../public/assets/default-placeholder.png';
import Image from 'next/image';

type Props = {
  submission: Submission | null;
};

export default function OnedriveImage({ submission }: Props) {
  const session = useSession();
  const user = session?.data?.user as SessionUser;
  const [url, setUrl] = useState('');
  const [mimeType, setMimeType] = useState('');

  useEffect(() => {
    const getFile = async () => {
      if (submission) {
        const onedriveService = new OnedriveService(user?.access_token);
        const { token } = await onedriveService.getOnedriveToken();
        const ans = JSON.parse(submission.answer_data) as FileAnswerData;
        const r = await onedriveService.getOneDriveFileUrl(ans.download_url, token);
        setUrl(r['@microsoft.graph.downloadUrl']);
        setMimeType(ans.mime_type);
      }
    };

    if (user) {
      getFile();
    }
  }, [submission]);

  const renderContent = () => {
    if (mimeType.includes('image')) {
      return <img src={url} className='min-h-[12rem] w-full h-auto' alt='Uploaded File' />;
    } else if (mimeType.includes('video')) {
      return <video src={url} controls className='w-full' />;
    } else {
      return <div>Content not supported</div>;
    }
  };

  return (
    <>
      {!url ? (
        <Image
          src={defaultPlaceholder}
          className='object-cover'
          alt='Placeholder Image'
          width={600}
          height={600}
        />
      ) : (
        renderContent()
      )}
    </>
  );
}
