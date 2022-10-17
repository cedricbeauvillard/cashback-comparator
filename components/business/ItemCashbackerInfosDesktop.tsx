import {createStyles, Image} from '@mantine/core';
import Link from 'next/link';
import {FC} from 'react';

/*
 * Used seller page to details advantages for each cashbackers (desktop view)
 */

const useStyles = createStyles((theme) => ({}));

interface ItemCashbackerInfosDesktopProps {
  imageUrl: string;
  bonus: number;
  paymentThresold: number;
  paymentMethod: string;
}

export const ItemCashbackerInfosDesktop: FC<ItemCashbackerInfosDesktopProps> = ({
  imageUrl,
  bonus,
  paymentThresold,
  paymentMethod,
}) => {
  return (
    <tr key="ebuyclub">
      <td>
        <div style={{width: 100, flex: 1, flexDirection: 'column'}}>
          <Image alt="logo ebuyclub" src={imageUrl} className="self-center" />
        </div>
      </td>
      <td>{bonus}€ à l'inscription</td>
      <td>{paymentThresold}€</td>
      <td>{paymentMethod}€</td>
    </tr>
  );
};
