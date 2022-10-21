import {Button, SimpleGrid} from '@mantine/core';
import {FC} from 'react';
import {AdderRow} from './AdderRow';
import {UpdaterRow} from './UpdaterRow';

export interface DbUpdaterProps {}

export const DbUpdater: FC<DbUpdaterProps> = () => {
  return (
    <div className="w-full bg-red h-full">
      <div className="w-full bg-green">
        <h1>Ajout</h1>
        <SimpleGrid cols={1}>
          <AdderRow></AdderRow>
          <AdderRow></AdderRow>
        </SimpleGrid>

        <Button className="m-auto block">+</Button>
      </div>

      <div className="w-full bg-green">
        <h1>Modification</h1>
        <Button className="m-auto block">+</Button>
      </div>

      <div className="w-full bg-green">
        <h1>Supression</h1>
        <Button className="m-auto block">+</Button>
      </div>

      <Button size="lg" className="m-auto block my-10">
        Appliquer
      </Button>
    </div>
  );
};
