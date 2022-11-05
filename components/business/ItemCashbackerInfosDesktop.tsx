import {Image} from '@mantine/core';
import {FC} from 'react';

/*
 * Used seller page to details advantages for each cashbackers (desktop view)
 */

interface ItemCashbackerInfosDesktopProps {
  name: string;
  imageUrl: string;
  bonus: number;
  paymentThresold: number;
  paymentMethod: string;
  sponsorshipUrl: string;
}

export const ItemCashbackerInfosDesktop: FC<ItemCashbackerInfosDesktopProps> = ({
  name,
  imageUrl,
  bonus,
  paymentThresold,
  paymentMethod,
  sponsorshipUrl,
}) => {
  return (
    <tr key="ebuyclub">
      <td>
        <div style={{width: 115, height: 73}}>
          <a href={sponsorshipUrl} target="_blank">
            <Image
              alt={`logo du site de cashback ${name} réputé professionnel meilleur cashback promo marque gain économie`}
              src={imageUrl}
              className="self-center"
              width={115}
              height={73}
            />
          </a>
        </div>
      </td>
      <td>{bonus}€ offerts</td>
      <td>{paymentThresold}€</td>
      <td>{paymentMethod}</td>
    </tr>
  );
};
