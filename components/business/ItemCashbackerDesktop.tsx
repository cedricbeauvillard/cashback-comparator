import {Button, createStyles, Image} from '@mantine/core';
import {FC} from 'react';
import StarSvg from '../svg/StarSvg';

/*
 * Used seller page to details advantages for each cashbackers (desktop view)
 */

const useStyles = createStyles((theme) => ({}));

export const ItemCashbackerDesktop: FC = () => {
  const {classes} = useStyles();

  return (
    <tr key="ebuyclub">
      {/* Cashbacker image */}
      <td>
        <div style={{width: 100}}>
          <Image
            alt="logo ebuyclub"
            src="/cashbackers/logo-rectangle-ebuyclub.png"
            className="self-center"
          />
        </div>
      </td>
      {/* Rating */}
      <td className="w-32">
        <StarSvg width="1rem"></StarSvg>
        <StarSvg width="1rem"></StarSvg>
        <StarSvg width="1rem"></StarSvg>
        <StarSvg width="1rem"></StarSvg>
        <StarSvg width="1rem"></StarSvg>
      </td>
      {/* Ranking */}
      <td>
        <div style={{width: '50%'}}>
          <Image
            alt="rang or"
            src="/ranking/medaille-or-classement-cashback.png"
            className="self-center"
          />
        </div>
      </td>
      {/* Bonus */}
      <td>7 euros à l'inscription</td>
      {/* Cashback rate */}
      <td>7,5%</td>
      {/* More informations  ctas*/}
      <td>
        <Button.Group orientation="vertical" className="flex">
          <Button className="my-2 w-24">Avis</Button>
          <Button className="my-2 w-24">Visiter</Button>
        </Button.Group>
      </td>
    </tr>
  );
};
