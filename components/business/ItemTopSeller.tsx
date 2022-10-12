import {Card, createStyles, Image, Text} from '@mantine/core';
import {FC} from 'react';

const useStyles = createStyles((theme) => ({}));

export interface ItemTopSellerProps {
  logoUrl: string | null;
  name: string;
  pageUrl: string;
}

export const ItemTopSeller: FC<ItemTopSellerProps> = ({logoUrl, name, pageUrl}) => {
  const {classes} = useStyles();

  return (
    <Card shadow="sm" p="xs" component="a" href={pageUrl} target="_blank">
      <Card.Section>
        <Image
          src={logoUrl ?? 'https://www.lerevenu.com/sites/site/files/field/image/fnac-darty.jpg'}
          height={180}
          fit="contain"
          alt="sellerLogo"
        />
      </Card.Section>
      <Text weight={500} size="lg" mt="md" align="center">
        {name}
      </Text>
    </Card>
  );
};
