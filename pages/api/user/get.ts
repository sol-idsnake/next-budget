import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await prisma.user.findFirst();

  res.status(200).json(user);
};

export default handler;
