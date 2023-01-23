// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next';
import {logger} from '../../../lib/logger';
import {prisma} from '../../../lib/prisma';

export type topSellerReq = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{sellerRemoved: boolean}>
) {
  try {
    const query = req.query;

    const {id} = query;

    let sellerId = 0;
    if (typeof id === 'string') {
      sellerId = parseInt(id);
    }

    if (!sellerId) {
      logger.error('Invalid id parsing');
      res.status(500).json({sellerRemoved: false});
      return;
    }

    logger.info('Start remove seller: %d', sellerId);
    logger.info('Check that seller exists');

    const sellerToDelete = await prisma.seller.findUnique({
      select: {
        id: true,
      },
      where: {
        id: sellerId,
      },
    });
    if (!sellerToDelete?.id) {
      logger.error("Remove failed because seller id don't exists");
      res.status(404).json({sellerRemoved: false});
      return;
    }

    logger.info('Seller exists, try to remove');

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
      logger.error('Remove failed');
      res.status(403).json({sellerRemoved: false});
      return;
    }
  } catch (e) {
    logger.error('Remove failed: ', e);
    res.status(500).json({sellerRemoved: false});
  }
}
