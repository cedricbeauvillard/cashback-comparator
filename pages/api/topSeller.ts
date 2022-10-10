// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {Seller} from '@prisma/client';
import {prisma} from '../../lib/prisma';
import type {NextApiRequest, NextApiResponse} from 'next';

/* type Data = {
  name: string
} */

export type topSellerReq = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Seller[] | null>) {
  try {
    const query = req.query;

    const {limit} = query;

    // Avoid attacks
    if (limit && typeof limit === 'string' && parseInt(limit) > 200) {
      res.status(400).json(null);
    }

    const topSellers = await prisma.$queryRawUnsafe<Seller[]>(
      // DO NOT pass in or accept user input here
      `SELECT DISTINCT id,name,logoUrl FROM Seller WHERE topSeller = 1 OR top40=1 OR coupon=1 ORDER BY RAND() LIMIT ${limit};`
    );

    res.status(200).json(topSellers);
  } catch (e) {
    res.status(400);
  }
}
