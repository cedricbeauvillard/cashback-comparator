import {Button, createStyles, Group, SimpleGrid} from '@mantine/core';
import {FC} from 'react';

/*
 * Used in sellers list as group representing every sellers starting with X letter
 */

const useStyles = createStyles((theme) => ({}));

export interface ItemSellerLetterProps {
  letter: string;
}

export const ItemSellerLetter: FC<ItemSellerLetterProps> = ({letter}) => {
  const {classes} = useStyles();

  return (
    <Group className="w-full" id={letter}>
      <h1 className="underline my-2">{letter}</h1>
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
        <p className="m-0">Castorama</p>
        <p className="m-0">Castorama</p>
        <p className="m-0">Castorama</p>
        <p className="m-0">Castorama</p>
        <p className="m-0">Castorama</p>
        <p className="m-0">Castorama</p>
      </SimpleGrid>
      <Button color="red" size="xs" className="m-auto">
        Voir plus
      </Button>
    </Group>
  );
};
