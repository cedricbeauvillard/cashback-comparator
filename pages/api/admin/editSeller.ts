// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {Seller} from '@prisma/client';
import type {NextApiRequest, NextApiResponse} from 'next';
import {logger} from '../../../lib/logger';
import {prisma} from '../../../lib/prisma';
import {getSlugFromName} from '../../../lib/_url';

export type topSellerReq = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{sellerEdited: boolean}>
) {
  try {
    const body = JSON.parse(req.body);

    const seller: Seller = body.seller;
    const sellerId = seller.id;

    logger.info('Edit seller: %s', seller.name);

    const sellerActive: boolean | null = body.active;

    const originalSeller = await prisma.seller.findFirst({
      select: {
        name: true,
        slug: true,
      },
      where: {
        id: sellerId,
      },
    });

    // Seller don't exist
    if (!originalSeller) {
      res.status(400).json({sellerEdited: false});
      logger.warn('Edit seller: seller not found');
      return;
    }

    const noStateChangeButAlreadyActive = sellerActive === null && originalSeller.slug;
    if (noStateChangeButAlreadyActive || sellerActive === true) {
      logger.info('New slug');
      seller.slug = getSlugFromName(seller.name) ?? null;
    }

    // Remove null properties
    Object.keys(seller).forEach((key) => {
      const sellerKey: keyof Seller = key as keyof Seller;

      if (seller[sellerKey] === null) {
        delete seller[sellerKey];
      }
    });

    // Disable seller
    if (sellerActive === false && originalSeller.slug) {
      logger.info('Disable seller');
      seller.slug = null;
    }

    const {id, ...sellerCreateInput} = seller;

    const updatedSeller = await prisma.seller.update({
      where: {
        id: sellerId,
      },
      data: {
        ...sellerCreateInput,
      },
    });

    if (updatedSeller) {
      logger.info('Edit succeed');
      res.status(200).json({sellerEdited: true});
      return;
    } else {
      logger.info('Remove failed');
      res.status(400).json({sellerEdited: false});
      return;
    }
  } catch (e) {
    logger.info('Remove failed: ', e);
    res.status(400).json({sellerEdited: false});
  }
}
