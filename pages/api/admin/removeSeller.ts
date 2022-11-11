// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export type topSellerReq = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{sellerRemoved: boolean;}>
) {
  res.status(400);

  try {
    const query = req.query;

    const {id} = query;

    let sellerId = 0;

    if (typeof id === 'string') {
      sellerId = parseInt(id);
    }

    if (!sellerId) {
      res.status(400).json({sellerRemoved: false});
      return;
    }

    const removedSeller =  await prisma.seller.delete({
      where: {
        id: sellerId,
      },
    });

    if (removedSeller) {
      res.status(200).json({sellerRemoved: true});
      return;
    } else {
      res.status(400).json({sellerRemoved: false});
      return;
    }
  } catch (e) {
    res.status(400).json({sellerRemoved: false});
  }
}
