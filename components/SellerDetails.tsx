import {Button, Card, createStyles, Group, Image, SimpleGrid} from '@mantine/core';
import {FC} from 'react';
import StarSvg from './svg/StarSvg';

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

export const SellerDetails: FC = () => {
  const {classes} = useStyles();

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder className="px-4 py-3">
      {/* Cashbacker name */}
      <Group className={classes.cashbackerItemCol} style={{marginTop: 0}}>
        <p className="self-start m-0">Nom du site</p>
        <div style={{width: '55%'}}>
          <Image
            alt="logo ebuyclub"
            src="/cashbackers/logo-rectangle-ebuyclub.png"
            className="self-center"
          />
        </div>
      </Group>
      {/* Rating */}
      <Group className={classes.cashbackerItemCol}>
        <p className="self-start m-0">Note</p>
        <Group className="justify-center">
          <StarSvg width={'10%'}></StarSvg>
          <StarSvg width={'10%'}></StarSvg>
          <StarSvg width={'10%'}></StarSvg>
          <StarSvg width={'10%'}></StarSvg>
          <StarSvg width={'10%'}></StarSvg>
        </Group>
      </Group>
      {/* Ranking */}
      <Group className={classes.cashbackerItemCol}>
        <p className="self-start m-0">Rang</p>
        <div style={{width: '30%'}}>
          <Image
            alt="rang or"
            src="/ranking/medaille-or-classement-cashback.png"
            className="self-center"
          />
        </div>
      </Group>
      {/* Bonus */}
      <Group className={classes.cashbackerItemRow}>
        <p>Bonus:</p>
        <p>3€ à l'inscription</p>
      </Group>
      {/* Cashback rate */}
      <Group className={classes.cashbackerItemRow}>
        <p>Taux de cashback:</p>
        <p>2.5%</p>
      </Group>
      {/* More informations */}
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
