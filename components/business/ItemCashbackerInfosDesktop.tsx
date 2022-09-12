import {Button, createStyles, Image} from '@mantine/core';
import {FC} from 'react';
import StarSvg from '../svg/StarSvg';

/*
 * Used seller page to details advantages for each cashbackers (desktop view)
 */

const useStyles = createStyles((theme) => ({}));

export const ItemCashbackerInfosDesktop: FC = () => {
  const {classes} = useStyles();

  return (
    <tr key="ebuyclub">
      <td>
        <div style={{width: 100, flex: 1, flexDirection: 'column'}}>
          <Image
            alt="logo ebuyclub"
            src="/cashbackers/logo-rectangle-ebuyclub.png"
            className="self-center"
          />
        </div>
      </td>
      <td>7€ à l'inscription</td>
      <td>20€</td>
      <td>PayPal, Chèque, Virement, Cartes cadeaux</td>
    </tr>
  );
};
