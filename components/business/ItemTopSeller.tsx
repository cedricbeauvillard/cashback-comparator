import {Card, Image, Text} from '@mantine/core';
import {FC} from 'react';

export interface ItemTopSellerProps {
  name: string;
  pageUrl: string;
  logoUrl?: string | null;
}

export const ItemTopSeller: FC<ItemTopSellerProps> = ({name, pageUrl, logoUrl}) => {
  return (
    <Card
      className="flex flex-col items-center justify-center"
      shadow="sm"
      p="xs"
      component="a"
      href={pageUrl}
      target="_blank"
      withBorder
      style={{height: logoUrl ? '190px' : 'auto'}}
    >
      {logoUrl ? (
        <div>
          <Card.Section className="flex flex-col items-center justify-center">
            <Image
              src={
                logoUrl ?? 'https://www.lerevenu.com/sites/site/files/field/image/fnac-darty.jpg'
              }
              width={140}
              height={130}
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
