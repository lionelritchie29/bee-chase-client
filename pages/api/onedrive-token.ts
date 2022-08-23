// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { OnedriveService } from '../../services/OnedriveService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ token: string }>,
) {
  if (req.method === 'GET') {
    const onedriveService = new OnedriveService();
    const result = await onedriveService.getOnedriveToken();
    return res.status(200).json(result);
  }

  return res.status(404).json({ token: '' });
}
