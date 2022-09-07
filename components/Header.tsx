import {FC, useState} from 'react';
import Image from 'next/image';
import BurgerButtonSvg from './svg/BurgerButtonSvg';

export const Header: FC = () => {
  const [showPagePanel, setShowPagePanel] = useState(false);

  const onBurgerButtonClicked = () => {
    setShowPagePanel(!showPagePanel);
  };

  return (
    <div className="h-16 bg-mainColor flex flex-row justify-between items-center">
      <div style={{width: '100px', height: '50px', marginLeft: '5px'}}>
        <Image alt="logo" src="/logo.png" width="100px" height="50px" />
      </div>
      <button onClick={onBurgerButtonClicked}>
        <BurgerButtonSvg className="mr-2 w-10"></BurgerButtonSvg>
      </button>
      {showPagePanel && (
        <div
          className="h-12 w-12"
          style={{
            flex: '1',
            flexDirection: 'column',
            width: '100%',
            height: '20rem',
            position: 'absolute',
            left: 0,
            top: 64,
            zIndex: 1,
          }}
        >
          <div className="flex flex-row w-full h-1/4">
            <p className="ml-8 text-textColor self-center">Accueil</p>
          </div>
          <div className="flex flex-row w-full h-1/4">
            <p className="ml-8 text-textColor self-center">Meilleur sites de cashback</p>
          </div>
          <div className="flex flex-row w-full h-1/4">
            <p className="ml-8 text-textColor self-center">Liste des marchands</p>
          </div>
          <div className="flex flex-row w-full h-1/4">
            <p className="ml-8 text-textColor self-center">Top marchands</p>
          </div>
          <div className="flex flex-row w-full h-1/4">
            <p className="ml-8 text-textColor self-center">Contact</p>
          </div>
          <div className="flex flex-row w-full h-1/4">
            <p className="ml-8 text-textColor self-center">Mentions légales</p>
          </div>
        </div>
      )}
    </div>
  );
};
