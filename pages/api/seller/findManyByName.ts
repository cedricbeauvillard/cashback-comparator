// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {Seller} from '@prisma/client';
import {prisma} from '../../../lib/prisma';
import type {NextApiRequest, NextApiResponse} from 'next';

export type topSellerReq = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Seller[] | null>) {
  try {
    const query = req.query;

    const {name} = query;

    const sellers = await prisma.$queryRawUnsafe<Seller[]>(
      // DO NOT pass in or accept user input here
      `SELECT DISTINCT name, slug FROM Seller WHERE slug IS NOT NULL AND NAME LIKE '%${name}%' ORDER BY name ASC LIMIT 10;`
    );

    if (!sellers) {
      res.status(400);
    }

    res.status(200).json(sellers);
  } catch (e) {
    res.status(400);
  }
}
