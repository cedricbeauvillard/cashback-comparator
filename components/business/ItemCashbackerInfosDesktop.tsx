import {Button, createStyles, Image} from '@mantine/core';
import {FC} from 'react';
import StarSvg from '../svg/StarSvg';

/*
 * Used seller page to details advantages for each cashbackers (desktop view)
 */

const useStyles = createStyles((theme) => ({}));

interface ItemCashbackerInfosMobileProps {
  imageUrl: string;
  bonus: number;
  paymentThresold: number;
  paymentMethod: string;
}

export const ItemCashbackerInfosDesktop: FC<ItemCashbackerInfosMobileProps> = ({
  imageUrl,
  bonus,
  paymentThresold,
  paymentMethod,
}) => {
  const {classes} = useStyles();

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
