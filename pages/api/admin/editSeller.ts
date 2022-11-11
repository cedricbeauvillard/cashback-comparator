// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Seller } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export type topSellerReq = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{sellerEdited: boolean;}>
) {
  try {
    const seller: Seller = JSON.parse(req.body);
    const sellerId = seller.id;
    
    if (!seller.id) {
      res.status(400).json({sellerEdited: false});
      return;
    }

    Object.keys(seller).forEach((key) => {
      const sellerKey: keyof Seller = key as keyof Seller;

      if (seller[sellerKey] === null) {
        delete seller[sellerKey];
      }
    });

    const { id, ...sellerCreateInput } = seller;
    

    const updatedSeller =  await prisma.seller.update({
      where: {
        id: sellerId,
      },
      data: {
        ...sellerCreateInput
      }
    });

    if (updatedSeller) {
      res.status(200).json({sellerEdited: true});
      return;
    } else {
      res.status(400).json({sellerEdited: false});
      return;
    }
  } catch (e) {
    res.status(400).json({sellerEdited: false});
  }
}
