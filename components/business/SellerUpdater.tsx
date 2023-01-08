import {Button, Select} from '@mantine/core';
import {Seller} from '@prisma/client';
import {FC, useEffect, useState} from 'react';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {findDetailedSeller, findManySeller} from '../../lib/api/consumers/seller';
import SearchSvg from '../svg/SearchSvg';
import {ExcelImporter} from './ExcelImporter';
import {SellerRow} from './SellerRow';

export interface SellerUpdaterProps {}

export const SellerUpdater: FC<SellerUpdaterProps> = () => {
  const [searchedSeller, setSearchedSeller] = useState<Seller | null>();
  const [foundedSellers, setFoundedSellers] = useState<Seller[] | null>([]);

  const fileImported = (changes: string) =>
    toast.success(`Excel importé: ${changes} action(s) effectuée(s).`, {
      position: 'bottom-left',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  const parsingError = () =>
    toast.error('La lecture du fichier excel a échouée...', {
      position: 'bottom-left',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  const importError = () =>
    toast.error("Aucune action n'a pu être effectuée.", {
      position: 'bottom-left',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  return (
    <div className="w-full h-full">
      {/* Search seller */}
      <div className="w-full">
        <h1>Recherche marchands</h1>
        {/* TODO: Replace with generic search bar */}
        <Select
          size="lg"
          className="w-full sm:w-1/2 my-4"
          radius={'lg'}
          icon={<SearchSvg width={'1.5rem'}></SearchSvg>}
          placeholder="Indiquer le nom du marchand tels que Amazon, Fnac, Carrefour, Aliexpress…"
          searchable
          rightSection={<></>}
          maxLength={120}
          onSearchChange={async (searchValue: string) => {
            if (searchValue.length <= 0) {
              return;
            }

            setFoundedSellers(await findManySeller(searchValue, false));
          }}
          onChange={async (value) => {
            if (!value) {
              return;
            }

            const seller = await findDetailedSeller(value);
            if (seller) {
              setSearchedSeller(seller);
            }
          }}
          nothingFound={null}
          data={
            foundedSellers
              ? foundedSellers.map((seller) => ({
                  value: seller.id.toString() ? seller.id.toString() : 'error',
                  label: seller.name,
                }))
              : []
          }
        />
        {searchedSeller ? (
          <SellerRow seller={searchedSeller} displayOnly={true}></SellerRow>
        ) : undefined}
      </div>

      <ExcelImporter
        fileImported={fileImported}
        parsingError={parsingError}
        importError={importError}
      ></ExcelImporter>
      <ToastContainer
        position="bottom-left"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};
