// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {Seller} from '@prisma/client';
import type {NextApiRequest, NextApiResponse} from 'next';
import {logger} from '../../../lib/logger';
import {prisma} from '../../../lib/prisma';
import {getSlugFromName} from '../../../lib/_url';

export type topSellerReq = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{sellerEdited: boolean; message?: string}>
) {
  try {
    const body = JSON.parse(req.body);

    const sellerInput: Seller = body.seller;
    const sellerId = sellerInput.id;

    logger.info('Edit seller: %s', sellerInput.name ?? sellerInput.id);

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
      res.status(400).json({sellerEdited: false, message: 'Edit seller: seller not found'});
      logger.warn('Edit seller: seller not found');
      return;
    }

    const needNameChange = sellerInput.name && originalSeller.name !== sellerInput.name;
    const sellerFirstTimeActive = sellerActive && !originalSeller.slug;

    if (needNameChange || sellerFirstTimeActive) {
      logger.info('New slug');
      sellerInput.slug = getSlugFromName(originalSeller.name) ?? null;
    }

    // Remove null properties
    Object.keys(sellerInput).forEach((key) => {
      const sellerKey: keyof Seller = key as keyof Seller;

      if (sellerInput[sellerKey] === null) {
        delete sellerInput[sellerKey];
      }
    });

    // Disable seller
    if (sellerActive === false && originalSeller.slug) {
      logger.info('Disable seller');
      sellerInput.slug = null;
    }

    const {id, ...sellerCreateInput} = sellerInput;

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
      logger.info('Edit failed');
      res.status(400).json({sellerEdited: false, message: 'Edit failed'});
      return;
    }
  } catch (e) {
    logger.info('Edit failed: ', e);
    res.status(400).json({sellerEdited: false, message: `Edit failed: ${e}`});
  }
}
