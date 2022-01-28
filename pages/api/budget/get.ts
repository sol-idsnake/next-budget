import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.body;
  console.log(userId, 'userId');
  const budget = await prisma.budget.findMany({
    where: {
      id: '123',
    },
  });

  res.status(200).json({ budget });
};

export default handler;
