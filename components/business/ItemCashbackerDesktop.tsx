import {Button, Image} from '@mantine/core';
import {FC} from 'react';
import StarSvg from '../svg/StarSvg';
import {rankingIcons} from '../_static';
import {ItemCashbackerProps} from './types';

/*
 * Used seller page to details advantages for each cashbackers (desktop view)
 */

export const ItemCashbackerDesktop: FC<ItemCashbackerProps> = ({
  displayRate,
  cashbacker,
  rateData,
}) => {
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
          <a target="_blank" href={cashbacker.reviewsUrl} rel="noopener noreferrer">
            <Button className="my-2 w-24">Avis</Button>
          </a>
          <a target="_blank" href={cashbacker.sponsorshipUrl} rel="noopener noreferrer">
            <Button className="my-2 w-24">Visiter</Button>
          </a>
        </Button.Group>
      </td>
    </tr>
  );
};
