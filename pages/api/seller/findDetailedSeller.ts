// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {Seller} from '@prisma/client';
import {prisma} from '../../../lib/prisma';
import type {NextApiRequest, NextApiResponse} from 'next';

export type topSellerReq = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Seller | null>) {
  try {
    const query = req.query;

    const {id} = query;

    const seller = await prisma.$queryRawUnsafe<Seller>(
      `SELECT DISTINCT * FROM Seller WHERE id=${id}`
    );

    res.status(200).json(seller);
  } catch (e) {
    res.status(400);
  }
}
