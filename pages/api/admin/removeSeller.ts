// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next';
import {logger} from '../../../lib/logger';
import {prisma} from '../../../lib/prisma';

export type topSellerReq = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{sellerRemoved: boolean}>
) {
  res.status(400);

  try {
    const query = req.query;

    const {id} = query;

    let sellerId = 0;
    if (typeof id === 'string') {
      sellerId = parseInt(id);
    }

    logger.info('Start remove seller: %d', sellerId);

    if (!sellerId) {
      res.status(400).json({sellerRemoved: false});
      return;
    }

    const removedSeller = await prisma.seller.delete({
      where: {
        id: sellerId,
      },
    });

    if (removedSeller) {
      logger.info('Remove succeed');
      res.status(200).json({sellerRemoved: true});
      return;
    } else {
      logger.info('Remove failed');
      res.status(400).json({sellerRemoved: false});
      return;
    }
  } catch (e) {
    logger.info('Remove failed: ', e);
    res.status(400).json({sellerRemoved: false});
  }
}
