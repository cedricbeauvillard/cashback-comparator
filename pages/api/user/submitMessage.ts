// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next';
import {prisma} from '../../../lib/prisma';

export type topSellerReq = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse<boolean | null>) {
  try {
    const query = req.query;

    const {email, name, message} = query;

    if (
      !email ||
      typeof email !== 'string' ||
      !name ||
      typeof name !== 'string' ||
      !message ||
      typeof message !== 'string'
    ) {
      res.status(400);
      return;
    }

    const userMessage = await prisma.userMessage.create({
      data: {
        email: email,
        name: name,
        message: message,
      },
    });

    res.status(200).json(userMessage !== undefined);
  } catch (e) {
    res.status(400);
  }
}
