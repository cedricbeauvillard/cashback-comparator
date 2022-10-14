import {Button, createStyles, Image} from '@mantine/core';
import Link from 'next/link';
import {FC} from 'react';
import StarSvg from '../svg/StarSvg';
import {ItemCashbackerProps} from './types';
import {rankingIcons} from '../_static';

/*
 * Used seller page to details advantages for each cashbackers (desktop view)
 */

const useStyles = createStyles((theme) => ({}));

export const ItemCashbackerDesktop: FC<ItemCashbackerProps> = ({
  displayRate,
  cashbacker,
  rateData,
}) => {
  const {classes} = useStyles();

  let stars = [];

  for (let i = 0; i < cashbacker.score; ++i) {
    stars.push(<StarSvg key={`star-${i}`} width="1rem"></StarSvg>);
  }

  const cashbackerUnit = rateData?.unit === 'None' ? '' : rateData?.unit === 'Euro' ? '€' : '%';

  let cashbackerRate = '';

  if (rateData && rateData?.rate > 0) {
    cashbackerRate = `${rateData?.isRangeRate ? "Jusqu'a" : ''}${rateData?.rate}${cashbackerUnit}`;
  } else {
    cashbackerRate = '-';
  }

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
        <div style={{width: '30%'}}>
          <Image alt="rang or" src={rankingIcons[cashbacker.rank - 1]} className="self-center" />
        </div>
      </td>
      {/* Bonus */}
      <td>{cashbacker.signupBonus}€ à l'inscription</td>
      {/* Cashback rate */}
      {displayRate ? <td>{cashbackerRate}</td> : undefined}
      {/* More informations  cta's*/}
      <td>
        <Button.Group orientation="vertical" className="flex">
          <Link href={cashbacker.reviewsUrl} passHref>
            <Button className="my-2 w-24">Avis</Button>
          </Link>
          <Link href={cashbacker.sponsorshipUrl} passHref>
            <Button className="my-2 w-24">Visiter</Button>
          </Link>
        </Button.Group>
      </td>
    </tr>
  );
};
