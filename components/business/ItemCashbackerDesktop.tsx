import {Button, createStyles, Image} from '@mantine/core';
import {Cashbacker} from '@prisma/client';
import {FC} from 'react';
import StarSvg from '../svg/StarSvg';
import {ItemCashbackerProps, RateData} from './types';
import {rankingIcons} from './_static';

/*
 * Used seller page to details advantages for each cashbackers (desktop view)
 */

const useStyles = createStyles((theme) => ({}));

export const ItemCashbackerDesktop: FC<ItemCashbackerProps> = ({cashbacker, rateData}) => {
  const {classes} = useStyles();

  let stars = [];

  for (let i = 0; i < cashbacker.score; ++i) {
    stars.push(<StarSvg key={`star-${i}`} width="1rem"></StarSvg>);
  }

  const cashbackerUnit = rateData.unit === 'None' ? '' : rateData.unit === 'Euro' ? '€' : '%';

  const cashbackerRate = `${rateData.isRangeRate ? "Jusqu'a" : ''}${
    rateData.rate
  }${cashbackerUnit}`;

  return (
    <tr key="ebuyclub">
      {/* Cashbacker image */}
      <td>
        <div style={{width: 100}}>
          <Image alt="logo ebuyclub" src={cashbacker.logoUrl} className="self-center" />
        </div>
      </td>
      {/* Rating */}
      <td className="w-32">{stars}</td>
      {/* Ranking */}
      <td>
        <div style={{width: '50%'}}>
          <Image alt="rang or" src={rankingIcons[cashbacker.rank - 1]} className="self-center" />
        </div>
      </td>
      {/* Bonus */}
      <td>{cashbacker.signupBonus}€ à l'inscription</td>
      {/* Cashback rate */}
      <td>{cashbackerRate}</td>
      {/* More informations  cta's*/}
      <td>
        <Button.Group orientation="vertical" className="flex">
          <Button className="my-2 w-24">Avis</Button>
          <Button className="my-2 w-24">Visiter</Button>
        </Button.Group>
      </td>
    </tr>
  );
};
