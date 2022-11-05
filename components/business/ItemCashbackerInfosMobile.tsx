import {Card, createStyles, Group, Image, Text} from '@mantine/core';
import {FC} from 'react';

/*
 * Used in home description of cashbackers listed in the site
 */

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },
  title: {
    lineHeight: 1.2,
    marginLeft: '1rem',
    paddingRight: '0.6rem',
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
        <Image
          className="ml-2"
          src={imageUrl}
          height={130}
          width={130}
          fit="contain"
          alt={`logo du site de cashback ${name} réputé professionnel meilleur cashback promo marque gain économie`}
        />
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
