// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {Skeleton} from '@mantine/core';
import {RateUnit, Seller} from '@prisma/client';
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
    const query = req.query;
    const {id} = query;

    let sellerId = 0;
    if (typeof id === 'string') {
      sellerId = parseInt(id);
    }

    if (!sellerId) {
      logger.error('Invalid id parsing');
      res.status(500).json({sellerEdited: false});
      return;
    }

    const body = JSON.parse(req.body);
    const sellerInput: Seller = body.seller;
    const sellerActive: boolean | null = body.active;

    logger.info('Edit seller: %s', sellerInput.name ?? sellerInput.id);

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
      res.status(404).json({sellerEdited: false});
      logger.error('Edit seller: seller not found');
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

    const {id: sellerInputId, ...sellerEditInput} = sellerInput;

    const updatedSeller = await prisma.seller.update({
      where: {
        id: sellerId,
      },
      data: {
        ...sellerEditInput,
      },
    });

    if (updatedSeller) {
      logger.info('Edit succeed');
      res.status(200).json({sellerEdited: true});
      return;
    } else {
      logger.error('Edit failed');
      res.status(403).json({sellerEdited: false});
      return;
    }
  } catch (err) {
    logger.error('Edit failed with following error: ', err);
    res.status(500).json({sellerEdited: false});
  }
}
