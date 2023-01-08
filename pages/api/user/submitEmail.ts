// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next';
import nodemailer from 'nodemailer';

const verifyRecaptcha = async (token: string): Promise<Response> => {
  const secretKey = process.env.RECAPTHA_SECRET_KEY;

  var verificationUrl =
    'https://www.google.com/recaptcha/api/siteverify?secret=' + secretKey + '&response=' + token;

  const response = await fetch(verificationUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  return response;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{emailSent: boolean}>
) {
  try {
    const query = req.query;

    const {token, email, name, message} = query;

    const response = await verifyRecaptcha(token?.toString() ?? '');
    if (!response || response.status !== 200) {
      return res.status(500).json({emailSent: false});
    }

    if (
      !email ||
      typeof email !== 'string' ||
      !name ||
      typeof name !== 'string' ||
      !message ||
      typeof message !== 'string'
    ) {
      res.status(400).json({emailSent: false});
      return;
    }

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAILING_ACCOUNT,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    let mailOptions = {
      from: 'meilleurscashback@gmail.com',
      to: 'meilleurscashback@gmail.com',
      subject: `Nouveau message depuis le site: "MeilleursCashback.com" de ${email}.`,
      text: `${name} vous a écrit un message: ${message}.\nEmail utilisé: ${email}.`,
    };

    transporter.sendMail(mailOptions, (error: any, data: any) => {
      if (error) {
        return res.status(500).json({emailSent: false});
      }
    });

    /*     if (sendEmailNotWorking) {
      const userMessage = await prisma.userMessage.create({
        data: {
          email: email,
          name: name,
          message: message,
        },
      });
    } */

    return res.status(200).json({emailSent: true});
  } catch (e) {
    res.status(500).json({emailSent: false});
  }
}
