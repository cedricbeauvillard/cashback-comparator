import {Button, FileInput, Select} from '@mantine/core';
import {Seller} from '@prisma/client';
import {FC, useState} from 'react';
import {addSeller, findDetailedSeller, findManySeller} from '../../lib/api/consumers/seller';
import SearchSvg from '../svg/SearchSvg';
import {ExcelImporter} from './ExcelImporter';
import {SellerRow} from './SellerRow';

export interface SellerUpdaterProps {}

export const SellerUpdater: FC<SellerUpdaterProps> = () => {
  const [searchedSeller, setSearchedSeller] = useState<Seller | null>();
  const [foundedSellers, setFoundedSellers] = useState<Seller[] | null>([]);

  return (
    <div className="w-full h-full">
      {/* Search seller */}
      <div className="w-full">
        <h1>Recherche</h1>
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

            setFoundedSellers(await findManySeller(searchValue));
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
          <SellerRow seller={searchedSeller} displayOnly={true} id={1}></SellerRow>
        ) : undefined}
      </div>

      <ExcelImporter></ExcelImporter>
    </div>
  );
};
