// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next';
import {prisma} from '../../../lib/prisma';
import {v4 as uuidv4} from 'uuid';

export type topSellerReq = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{canLogin: boolean; token?: string}>
) {
  res.status(400);

  try {
    const query = req.query;

    const {email, password} = query;

    if (!email || typeof email !== 'string' || !password || typeof password !== 'string') {
      res.status(400);
      return;
    }

    const administrator = await prisma.administrator.findFirst({
      select: {id: true},
      where: {
        AND: [{email: email}, {password: password}],
      },
    });

    if (administrator === null || !administrator.id) {
      res.status(400).json({canLogin: false});
      return;
    }

    const token = uuidv4();

    const tokenAssignation = await prisma.administrator.update({
      where: {
        id: administrator.id,
      },
      data: {
        connectionToken: token,
      },
    });

    if (tokenAssignation === null) {
      res.status(400).json({canLogin: false});
      return;
    }

    res.status(200).json({canLogin: true, token});
  } catch (e) {
    res.status(400).json({canLogin: false});
  }
}
