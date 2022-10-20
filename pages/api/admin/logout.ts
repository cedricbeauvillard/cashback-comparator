// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next';
import {prisma} from '../../../lib/prisma';
import {v4 as uuidv4} from 'uuid';

export type topSellerReq = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse<boolean>) {
  res.status(400);

  try {
    const query = req.query;

    const {token} = query;

    if (!token || typeof token !== 'string') {
      res.status(400);
      return;
    }

    const administrator = await prisma.administrator.findFirst({
      select: {
        id: true,
      },
      where: {
        connectionToken: token,
      },
    });

    if (administrator === null || !administrator.id) {
      res.status(400).json(false);
      return;
    }

    const administratorResetToken = await prisma.administrator.update({
      data: {
        connectionToken: null,
      },
      where: {
        id: administrator?.id,
      },
    });

    if (administratorResetToken === null || !administratorResetToken.id) {
      res.status(400).json(false);
      return;
    }

    res.status(200).json(true);
  } catch (e) {
    res.status(400).json(false);
  }
}
