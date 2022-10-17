import {Card, createStyles, Group, Image, Text} from '@mantine/core';
import Link from 'next/link';
import {FC} from 'react';

/*
 * Used in home description of cashbackers listed in the site
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
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  title: {
    lineHeight: 1.2,
    marginLeft: '1rem',
    paddingRight: '0.3rem',
  },

  body: {
    padding: theme.spacing.md,
  },
}));

interface ItemCashbackerInfosMobileProps {
  imageUrl: string;
  name: string;
  bonus: number;
  paymentThresold: number;
  paymentMethod: string;
  sponsorshipUrl: string;
}

export const ItemCashbackerInfosMobile: FC<ItemCashbackerInfosMobileProps> = ({
  imageUrl,
  name,
  bonus,
  paymentThresold,
  paymentMethod,
  sponsorshipUrl,
}) => {
  const {classes} = useStyles();

  return (
    <Card
      withBorder
      radius="md"
      shadow={'sm'}
      p={0}
      component="a"
      href={sponsorshipUrl}
      target="_blank"
      className={classes.card}
    >
      <Group noWrap spacing={0}>
        <Image src={imageUrl} height={140} width={140} fit="contain" />
        <div className={classes.title}>
          <Text transform="uppercase" color="dimmed" weight={900} size="md" className="mt-2">
            {name}
          </Text>
          <Text mt="xs" mb="xs" weight={400}>
            Bonus d'inscription: {bonus}€
          </Text>
          <Text mt="xs" mb="xs" weight={400}>
            Seuil de paiement: {paymentThresold}€
          </Text>
          <Text mt="xs" mb="xs" weight={400}>
            Mode de paiement: {paymentMethod}
          </Text>
        </div>
      </Group>
    </Card>
  );
};
