import {Button, Card, createStyles, Group, Image} from '@mantine/core';
import {FC} from 'react';
import StarSvg from '../svg/StarSvg';
import {ItemCashbackerProps} from './types';
import {rankingIcons} from './_static';

/*
 * Used seller page to details advantages for each cashbackers (mobile view)
 */

const useStyles = createStyles((theme) => ({
  cashbackerItemCol: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    marginTop: '0.5rem',
  },
  cashbackerItemRow: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
}));

export const ItemCashbackerMobile: FC<ItemCashbackerProps> = ({cashbacker, rateData}) => {
  const {classes} = useStyles();

  let stars = [];

  for (let i = 0; i < cashbacker.score; ++i) {
    stars.push(<StarSvg key={`star-${i}`} width={'10%'}></StarSvg>);
  }

  const cashbackerUnit = rateData.unit === 'None' ? '' : rateData.unit === 'Euro' ? '€' : '%';

  const cashbackerRate = `${rateData.isRangeRate ? "Jusqu'a" : ''}${
    rateData.rate
  }${cashbackerUnit}`;

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder className="px-4 py-3">
      {/* Cashbacker name */}
      <Group className={classes.cashbackerItemCol} style={{marginTop: 0}}>
        <p className="self-start m-0">Nom du site</p>
        <div style={{width: '55%'}}>
          <Image alt="logo ebuyclub" src={cashbacker.logoUrl} className="self-center" />
        </div>
      </Group>
      {/* Rating */}
      <Group className={classes.cashbackerItemCol}>
        <p className="self-start m-0">Note</p>
        <Group className="justify-center">{stars}</Group>
      </Group>
      {/* Ranking */}
      <Group className={classes.cashbackerItemCol}>
        <p className="self-start m-0">Rang</p>
        <div style={{width: '30%'}}>
          <Image alt="rang or" src={rankingIcons[cashbacker.rank - 1]} className="self-center" />
        </div>
      </Group>
      {/* Bonus */}
      <Group className={classes.cashbackerItemRow}>
        <p>Bonus:</p>
        <td>{cashbacker.signupBonus}€ à l'inscription</td>
      </Group>
      {/* Cashback rate */}
      <Group className={classes.cashbackerItemRow}>
        <p>Taux de cashback:</p>
        <p>{cashbackerRate}</p>
      </Group>
      {/* More informations  ctas*/}
      <Group className={classes.cashbackerItemCol}>
        <p className="self-start m-0">Plus d'informations:</p>
        <Button.Group orientation="vertical" className="flex">
          <Button className="my-2 w-48">Avis</Button>
          <Button className="my-2 w-48">Visiter</Button>
        </Button.Group>
      </Group>
    </Card>
  );
};
