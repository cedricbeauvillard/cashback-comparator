import {Button, createStyles, Group, SimpleGrid, Image} from '@mantine/core';
import {FC} from 'react';
import StarSvg from './svg/StarSvg';

const useStyles = createStyles((theme) => ({}));

export const SellerDetails: FC = () => {
  return (
    <div className="flex flex-col flex-1 w-full">
      <SimpleGrid cols={1} className="w-full">
        {/* Name */}
        <Group className="flex flex-col w-full">
          <p className="self-start">Nom du site</p>
          <div style={{width: '70%'}}>
            <Image
              alt="logo ebuyclub"
              src="/cashbackers/logo-rectangle-ebuyclub.png"
              className="self-center"
            />
          </div>
        </Group>
        {/* Rating */}
        <Group className="flex flex-col w-full">
          <p className="self-start">Note</p>
          <Group className="justify-center">
            <StarSvg width={'10%'}></StarSvg>
            <StarSvg width={'10%'}></StarSvg>
            <StarSvg width={'10%'}></StarSvg>
            <StarSvg width={'10%'}></StarSvg>
            <StarSvg width={'10%'}></StarSvg>
          </Group>
        </Group>
        {/* Ranking */}
        <Group className="flex flex-col w-full">
          <p className="self-start">Rang</p>
          <div style={{width: '50%'}}>
            <Image
              alt="rang or"
              src="/ranking/medaille-or-classement-cashback.png"
              className="self-center"
            />
          </div>
        </Group>
        {/* Bonus */}
        <Group className="flex flex-row w-full justify-between">
          <p>Bonus</p>
          <p>3€ à l'inscription</p>
        </Group>
        {/* Cashback rate */}
        <Group className="flex flex-row w-full justify-between">
          <p>Taux de cashback</p>
          <p>3€ à l'inscription</p>
        </Group>
        {/* More informations */}
        <Button.Group className="flex flex-col">
          <Button>Settings</Button>
          <Button>Settings</Button>
        </Button.Group>
      </SimpleGrid>
    </div>
  );
};
