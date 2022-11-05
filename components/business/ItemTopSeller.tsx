import {Card, Image, Text} from '@mantine/core';
import {FC} from 'react';

export interface ItemTopSellerProps {
  name: string;
  pageUrl: string;
  logoUrl?: string | null;
}

export const ItemTopSeller: FC<ItemTopSellerProps> = ({name, pageUrl, logoUrl}) => {
  return (
    <Card shadow="sm" p="xs" component="a" href={pageUrl} target="_blank" withBorder>
      {logoUrl ? (
        <div>
          <Card.Section>
            <Image
              className="p-2"
              src={
                logoUrl ?? 'https://www.lerevenu.com/sites/site/files/field/image/fnac-darty.jpg'
              }
              width={'100%'}
              height={180}
              fit="contain"
              alt={`logo ${name} meilleur cashback promo marque gain économie`}
            />
          </Card.Section>
          <Text weight={500} size="lg" align="center">
            {name}
          </Text>
        </div>
      ) : (
        <div className="h-full flex col items-center justify-center">
          <Text weight={500} size="lg" align="center">
            {name}
          </Text>
        </div>
      )}
    </Card>
  );
};
