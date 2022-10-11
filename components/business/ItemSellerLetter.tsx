import {createStyles, Group, SimpleGrid} from '@mantine/core';
import {Seller} from '@prisma/client';
import Link from 'next/link';
import {FC} from 'react';

/*
 * Used in sellers list as group representing every sellers starting with X letter
 */

const useStyles = createStyles((theme) => ({}));

export interface ItemSellerLetterProps {
  letter: string;
  sellers?: Seller[];
}

export const ItemSellerLetter: FC<ItemSellerLetterProps> = ({letter, sellers}) => {
  const {classes} = useStyles();

  return (
    <Group className="w-full" id={letter}>
      <h1 className="underline my-2">{letter === 'other' ? '#' : letter}</h1>
      <SimpleGrid
        className="w-full"
        cols={3}
        spacing="xs"
        breakpoints={[
          {maxWidth: 980, cols: 3, spacing: 'md'},
          {maxWidth: 755, cols: 3, spacing: 'sm'},
          {maxWidth: 600, cols: 2, spacing: 'sm'},
        ]}
      >
        {sellers?.map((seller, index) => {
          if (!seller.slug) {
            return <a className="m-0">{seller.name}</a>;
          }

          return (
            <Link
              key={`seller-${index}`}
              href={`./seller/meilleur-cashback-${seller.slug}`}
              passHref
            >
              <a className="m-0">{seller.name}</a>
            </Link>
          );
        })}
      </SimpleGrid>
    </Group>
  );
};
