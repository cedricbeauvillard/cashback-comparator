import {Button} from '@mantine/core';
import {FC} from 'react';
import Image from 'next/image';
import StarSvg from '../svg/StarSvg';
import {rankingIcons} from '../_static';
import {ItemCashbackerProps} from './types';

const formatRate = (rateData: ItemCashbackerProps['rateData']): string => {
  if (!rateData || rateData.rate <= 0) return '—';
  const unit = rateData.unit === 'Euro' ? ' €' : rateData.unit === 'None' ? '' : ' %';
  return `${rateData.isRangeRate ? "Jusqu’à " : ''}${rateData.rate.toLocaleString('fr-FR')}${unit}`;
};

export const ItemCashbackerDesktop: FC<ItemCashbackerProps> = ({
  displayRate,
  cashbacker,
  rateData,
}) => {
  const rankIcon = rankingIcons[cashbacker.rank - 1];
  const hasOffer = !displayRate || Boolean(rateData && rateData.rate > 0);
  const hasSponsorship = Boolean(cashbacker.sponsorshipUrl);

  return (
    <tr>
      <td>
        <div style={{display: 'flex', alignItems: 'center', gap: 10, minWidth: 150}}>
          <Image
            alt={`Logo ${cashbacker.name}`}
            src={cashbacker.logoUrl}
            width={110}
            height={70}
            objectFit="contain"
          />
          <strong>{cashbacker.name}</strong>
        </div>
      </td>
      <td>
        <div style={{display: 'flex', gap: 2, alignItems: 'center'}} aria-label={`Note : ${cashbacker.score} sur 5`}>
          {Array.from({length: Math.max(0, Math.min(5, Math.floor(cashbacker.score)))}, (_, i) => (
            <StarSvg key={i} width="1rem" />
          ))}
          <span style={{marginLeft: 5, whiteSpace: 'nowrap'}}>{cashbacker.score}/5</span>
        </div>
      </td>
      <td>
        {rankIcon ? (
          <Image alt={`Classement : ${cashbacker.rank}`} src={rankIcon} width={54} height={54} objectFit="contain" />
        ) : (
          <span>#{cashbacker.rank}</span>
        )}
      </td>
      <td>
        {cashbacker.signupBonus > 0 ? `${cashbacker.signupBonus} € offerts*` : '—'}
      </td>
      {displayRate && <td><strong style={{fontSize: '1.1rem'}}>{formatRate(rateData)}</strong></td>}
      <td>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 6, minWidth: 125}}>
          {hasOffer && hasSponsorship ? (
            <Button component="a" target="_blank" rel="noopener noreferrer sponsored" href={cashbacker.sponsorshipUrl}>
              Voir l’offre
            </Button>
          ) : (
            <span style={{color: '#777', fontSize: 13}}>Offre indisponible</span>
          )}
          {cashbacker.reviewsUrl && (
            <a href={cashbacker.reviewsUrl} target="_blank" rel="noopener noreferrer" style={{textAlign: 'center', fontSize: 13}}>
              Lire notre avis
            </a>
          )}
        </div>
      </td>
    </tr>
  );
};
