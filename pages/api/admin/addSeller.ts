// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Seller } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export type topSellerReq = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{sellerAdded: boolean;}>
) {
  try {
    const seller: Seller = JSON.parse(req.body);
    if (!seller.name) {
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
      res.status(400).json({sellerAdded: false});
      return;
    }


    const { id, ...sellerCreateInput } = seller;

    const newSeller =  await prisma.seller.create({
      data: {
        ...sellerCreateInput
      }
    });

    if (newSeller.id) {
      res.status(200).json({sellerAdded: true});
      return;
    } else {
      res.status(400).json({sellerAdded: false});
      return;
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({sellerAdded: false});
  }
}
