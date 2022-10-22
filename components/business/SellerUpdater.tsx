import {Button, Select, SimpleGrid} from '@mantine/core';
import {RateUnit, Seller} from '@prisma/client';
import {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import SearchSvg from '../svg/SearchSvg';
import {findManySeller} from './HomePage';
import {SellerRow} from './SellerRow';

export interface SellerUpdaterProps {}

export const findDetailedSeller = async (id: string) => {
  const res = await fetch(`/api/seller/findDetailedSeller?id=${id}`);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  return data[0];
};

export type FormType = 'ADD' | 'UPDATE' | 'REMOVE';

export type FormElement = {
  column: string;
  value: string | number | RateUnit;
};

export type SellerForm = {
  id: number;
  formType: FormType;
  elements: FormElement;
};

export const SellerUpdater: FC<SellerUpdaterProps> = () => {
  const [searchedSeller, setSearchedSeller] = useState<Seller | null>();
  const [foundedSellers, setFoundedSellers] = useState<Seller[] | null>([]);

  const [addRows, setAddRows] = useState<Seller[]>();
  const [addRowQuantity, setAddRowQuantity] = useState(0);

  console.log('FROM UPDATER: ', addRows);

  return (
    <div className="w-full h-full">
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
      <div className="w-full">
        <h1>Ajout</h1>
        <SimpleGrid cols={1}>
          {[...Array(addRowQuantity)].map((row, index) => (
            <SellerRow
              key={`seller-add-row${index}`}
              id={index}
              rows={addRows}
              setRows={setAddRows}
            ></SellerRow>
          ))}
        </SimpleGrid>
        <Button.Group orientation="horizontal" className="m-auto flex w-40">
          <Button
            className="m-auto block mt-4"
            onClick={() => {
              addRows?.splice(-1);
              setAddRows(addRows);
              setAddRowQuantity(addRowQuantity - 1);
            }}
          >
            -
          </Button>
          <Button
            className="m-auto block mt-4"
            onClick={() => {
              setAddRowQuantity(addRowQuantity + 1);
            }}
          >
            +
          </Button>
        </Button.Group>
      </div>

      <div className="w-full">
        <h1>Modification</h1>
        <SimpleGrid cols={1}>
          {/*           <SellerRow></SellerRow>
          <SellerRow></SellerRow> */}
        </SimpleGrid>
        <Button.Group orientation="horizontal" className="m-auto flex w-40">
          <Button className="m-auto block mt-4">-</Button>
          <Button className="m-auto block mt-4">+</Button>
        </Button.Group>
      </div>

      <div className="w-full">
        <h1>Supression</h1>
        <Button.Group orientation="horizontal" className="m-auto flex w-40">
          {/*           <Button className="m-auto block mt-4">-</Button>
          <Button className="m-auto block mt-4">+</Button> */}
        </Button.Group>
      </div>

      <Button size="lg" className="m-auto block my-10">
        Appliquer
      </Button>
    </div>
  );
};
