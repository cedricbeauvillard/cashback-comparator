import {Button} from '@mantine/core';
import {FC} from 'react';
import Image from 'next/image';
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
        <div style={{width: 184, height: 117}}>
          <Image
            alt={`logo du site de cashback ${cashbacker.name} réputé professionnel meilleur cashback promo marque gain économie`}
            src={cashbacker.logoUrl}
            className="self-center"
            width={184}
            height={117}
          />
        </div>
      </td>
      {/* Rating */}
      <td className="w-50">{stars}</td>
      {/* Ranking */}
      <td>
        <div style={{width: 80, height: 80}}>
          <Image
            alt="rang classement meilleur économie"
            src={rankingIcons[cashbacker.rank - 1]}
            className="self-center"
            width={80}
            height={80}
          />
        </div>
      </td>
      {/* Bonus */}
      <td>{cashbacker.signupBonus}€ offerts</td>
      {/* Cashback rate */}
      {displayRate ? <td>{cashbackerRate}</td> : undefined}
      {/* More informations  cta's*/}
      <td>
        <Button.Group orientation="vertical" className="flex">
          <a target="_blank" href={cashbacker.reviewsUrl} rel="noopener noreferrer">
            <Button className="my-2 w-full">Avis</Button>
          </a>
          <a target="_blank" href={cashbacker.sponsorshipUrl} rel="noopener noreferrer">
            <Button className="my-2 w-full">Visiter</Button>
          </a>
        </Button.Group>
      </td>
    </tr>
  );
};
