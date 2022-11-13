// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Seller } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { logger } from '../../../lib/logger';
import { prisma } from '../../../lib/prisma';
import { getSlugFromName } from '../../../lib/_url';

export type topSellerReq = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{sellerAdded: boolean;}>
) {
  try {
    const body = JSON.parse(req.body);

    const seller: Seller = body.seller;

    logger.info('Start add new seller: %s', seller.name);

    const sellerActive: boolean | null = body.active;

    if (!seller.name) {
      logger.warn('Add new seller: no name found');
      res.status(400).json({sellerAdded: false});
      return;
    }

    const alreadyExists = await prisma.seller.findFirst({
      select: {
        id: true,
      },
      where: {
        name: seller.name
      }
    });

    if (alreadyExists && alreadyExists.id) {
      logger.warn('Add new seller: seller already exist');
      res.status(400).json({sellerAdded: false});
      return;
    }

    if (sellerActive) {
      seller.slug = getSlugFromName(seller.name) ?? null;
    }

    // Remove null properties
    Object.keys(seller).forEach((key) => {
      const sellerKey: keyof Seller = key as keyof Seller;

      if (seller[sellerKey] === null) {
        delete seller[sellerKey];
      }
    });


    const { id, ...sellerCreateInput } = seller;

    const newSeller =  await prisma.seller.create({
      data: {
        ...sellerCreateInput
      }
    });

    if (newSeller.id) {
      logger.info('Add succeed');
      res.status(200).json({sellerAdded: true});
      return;
    } else {
      logger.warn('Add failed');
      res.status(400).json({sellerAdded: false});
      return;
    }
  } catch (e) {
    logger.warn('Add failed: ', e);
    res.status(400).json({sellerAdded: false});
  }
}
