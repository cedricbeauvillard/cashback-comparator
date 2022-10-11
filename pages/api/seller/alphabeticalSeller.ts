// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {Seller} from '@prisma/client';
import {prisma} from '../../../lib/prisma';
import type {NextApiRequest, NextApiResponse} from 'next';

export type alphabeticalSellerReq = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Seller[] | null>) {
  try {
    const query = req.query;

    const {letter} = query;

    // Avoid attacks
    if (letter && typeof letter === 'string' && !/^[a-zA-Z]+$/.test(letter) && letter !== 'other') {
      res.status(400).json(null);
    }

    const alphabeticalSeller = await prisma.$queryRawUnsafe<Seller[]>(
      // DO NOT pass in or accept user input here
      `SELECT DISTINCT name, slug  FROM Seller WHERE slug IS NOT NULL AND name LIKE '${letter}%'`
    );

    res.status(200).json(alphabeticalSeller);
  } catch (e) {
    res.status(400);
  }
}
