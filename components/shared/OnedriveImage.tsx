import axios from 'axios';
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
  const onedriveService = new OnedriveService(user?.access_token);
  const [url, setUrl] = useState('');

  useEffect(() => {
    const getFile = async () => {
      if (submission) {
        const apiUrl = `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/onedrive-token`;
        const { token } = await axios.get(apiUrl).then((res) => res.data);
        const ans = JSON.parse(submission.answer_data) as FileAnswerData;
        const r = await onedriveService.getOneDriveFileUrl(ans.download_url, token);
        setUrl(r['@microsoft.graph.downloadUrl']);
      }
    };

    getFile();
  }, [submission]);

  return (
    <>
      {!url ? (
        <Image
          src={defaultPlaceholder}
          className='object-cover'
          alt='Placeholder Image'
          width={600}
          height={400}
        />
      ) : (
        <img src={url} className='min-h-[12rem] w-full h-auto' alt='Uploaded File' />
      )}
    </>
  );
}
