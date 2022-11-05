import {MantineSize, Select} from '@mantine/core';
import {Seller} from '@prisma/client';
import {useRouter} from 'next/router';
import {FC, useState} from 'react';
import {findManySeller} from '../../lib/api/seller/consumers';
import SearchSvg from '../svg/SearchSvg';

export interface SellerSearchBarProps {
  size?: MantineSize;
  radius?: MantineSize;
}

export const SellerSearchBar: FC<SellerSearchBarProps> = ({size, radius}) => {
  const [foundedSellers, setFoundedSellers] = useState<Seller[] | null>([]);
  const router = useRouter();

  return (
    <Select
      size={size || 'lg'}
      className="w-full h-full"
      radius={radius || 'lg'}
      style={{
        fontFamily: 'Montserrat',
        fontWeight: 600,
      }}
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
      onChange={(value) => {
        router.push(`/seller/meilleur-cashback-${value}`);
      }}
      nothingFound={null}
      data={
        foundedSellers
          ? foundedSellers.map((seller) => ({
              value: seller.slug ? seller.slug : 'error',
              label: seller.name,
            }))
          : []
      }
    />
  );
};
