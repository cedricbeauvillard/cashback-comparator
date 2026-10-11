import {Button, Card, Group, Image, Text} from '@mantine/core';
import {FC} from 'react';
import StarSvg from '../svg/StarSvg';
import {rankingIcons} from '../_static';
import {ItemCashbackerProps} from './types';

const formatRate = (rateData: ItemCashbackerProps['rateData']): string => {
  if (!rateData || rateData.rate <= 0) return '—';
  const unit = rateData.unit === 'Euro' ? ' €' : rateData.unit === 'None' ? '' : ' %';
  return `${rateData.isRangeRate ? "Jusqu’à " : ''}${rateData.rate.toLocaleString('fr-FR')}${unit}`;
};

export const ItemCashbackerMobile: FC<ItemCashbackerProps> = ({
  displayRate,
  cashbacker,
  rateData,
}) => {
  const rankIcon = rankingIcons[cashbacker.rank - 1];
  const hasOffer = !displayRate || Boolean(rateData && rateData.rate > 0);
  const hasSponsorship = Boolean(cashbacker.sponsorshipUrl);

  return (
    <Card shadow="sm" p="md" radius="md" withBorder style={{width: '100%'}}>
      <Group position="apart" align="center" noWrap spacing="sm">
        <div style={{minWidth: 0}}>
          <Image src={cashbacker.logoUrl} alt={`Logo ${cashbacker.name}`} width={120} height={65} fit="contain" />
          <Text weight={700} size="sm" mt={4}>{cashbacker.name}</Text>
        </div>
        {displayRate && (
          <div style={{textAlign: 'right'}}>
            <Text color="dimmed" size="xs">Cashback</Text>
            <Text weight={800} size="xl">{formatRate(rateData)}</Text>
          </div>
        )}
      </Group>
      <Group position="apart" align="center" mt="md" spacing="xs">
        <div>
          <Text color="dimmed" size="xs">Note</Text>
          <Group spacing={3} align="center">
            {Array.from({length: Math.max(0, Math.min(5, Math.floor(cashbacker.score)))}, (_, i) => (
              <StarSvg key={i} width="0.9rem" />
            ))}
            <Text size="sm">{cashbacker.score}/5</Text>
          </Group>
        </div>
        <div style={{textAlign: 'right'}}>
          <Text color="dimmed" size="xs">Classement</Text>
          {rankIcon ? <Image src={rankIcon} alt={`Rang ${cashbacker.rank}`} width={40} height={40} fit="contain" /> : <Text>#{cashbacker.rank}</Text>}
        </div>
      </Group>
      <Group position="apart" mt="md" spacing="xs">
        <Text size="sm">Bonus de bienvenue</Text>
        <Text size="sm" weight={700}>{cashbacker.signupBonus > 0 ? `${cashbacker.signupBonus} € offerts*` : '—'}</Text>
      </Group>
      {hasOffer && hasSponsorship ? (
        <Button component="a" target="_blank" rel="noopener noreferrer sponsored" href={cashbacker.sponsorshipUrl} fullWidth mt="md">
          Voir l’offre
        </Button>
      ) : (
        <Text color="dimmed" align="center" size="sm" mt="md">Offre indisponible</Text>
      )}
      {cashbacker.reviewsUrl && (
        <Text align="center" size="sm" mt="xs">
          <a href={cashbacker.reviewsUrl} target="_blank" rel="noopener noreferrer">Lire notre avis</a>
        </Text>
      )}
    </Card>
  );
};
