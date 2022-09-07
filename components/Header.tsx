import {FC} from 'react';
import Image from 'next/image';
import BurgerButtonSvg from './svg/BurgerButtonSvg';
/* export interface HomePageProps {} */

export const Header: FC = () => {
  return (
    <div className="h-16 bg-mainColor flex justify-between">
      <div className="w-1/4 relative my-1">
        <Image
          alt="logo"
          src="/logo.png"
          className="align-middle"
          layout="fill"
          objectFit="contain"
        ></Image>
      </div>
      <BurgerButtonSvg width="10%" height="100%" className="bg-black"></BurgerButtonSvg>
    </div>
  );
};
