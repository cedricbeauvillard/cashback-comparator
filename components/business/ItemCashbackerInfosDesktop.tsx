import {Image} from '@mantine/core';
import {FC} from 'react';

/*
 * Used seller page to details advantages for each cashbackers (desktop view)
 */

interface ItemCashbackerInfosDesktopProps {
  cashbackerName: string;
  imageUrl: string;
  bonus: number;
  paymentThresold: number;
  paymentMethod: string;
  sponsorshipUrl: string;
}

export const ItemCashbackerInfosDesktop: FC<ItemCashbackerInfosDesktopProps> = ({
  cashbackerName,
  imageUrl,
  bonus,
  paymentThresold,
  paymentMethod,
  sponsorshipUrl,
}) => {
  return (
    <tr key="ebuyclub">
      <td>
        <div style={{width: 100, flex: 1, flexDirection: 'column'}}>
          <a href={sponsorshipUrl} target="_blank">
            <Image alt={`logo ${cashbackerName}`} src={imageUrl} className="self-center" />
          </a>
        </div>
      </td>
      <td>{bonus}€ offerts</td>
      <td>{paymentThresold}€</td>
      <td>{paymentMethod}</td>
    </tr>
  );
};
