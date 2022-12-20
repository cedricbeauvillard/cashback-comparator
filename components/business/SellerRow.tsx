import {Checkbox, Select, SimpleGrid, TextInput} from '@mantine/core';
import {range} from '@mantine/hooks';
import {RateUnit, Seller} from '@prisma/client';
import {FC} from 'react';
import {isReturnStatement} from 'typescript';

export interface SellerRowProps {
  seller?: Seller;
  displayOnly?: boolean;
}

export const SellerRow: FC<SellerRowProps> = ({seller, displayOnly = true}) => {
  const cashbackers = [
    {name: 'Igraal', variableName: 'Igraal'},
    {name: 'Poulpeo', variableName: 'Poulpeo'},
    {name: 'Flouzy', variableName: 'Flouzy'},
    {name: 'Capital Koala', variableName: 'CapitalKoala'},
    {name: 'Ebuyclub', variableName: 'Ebuyclub'},
    {name: 'Widilo', variableName: 'Widilo'},
    {name: 'Joko', variableName: 'Joko'},
    {name: 'Boursorama', variableName: 'Boursorama'},
    {name: 'Ebuyclub Coupon', variableName: 'EbuyclubCoupon'},
  ];
  return (
    <div className="w-full h-auto bg-cardBackground p-4">
      <SimpleGrid
        cols={8}
        spacing="lg"
        breakpoints={[
          {maxWidth: 3000, cols: 10, spacing: 8},
          {maxWidth: 1500, cols: 6, spacing: 8},
          {maxWidth: 1000, cols: 4, spacing: 8},
          {maxWidth: 600, cols: 4, spacing: 8},
        ]}
      >
        {seller && (
          <div className="flex flex-col w-22">
            <h5 className="m-0">Id</h5>
            <TextInput value={seller ? seller.id : undefined} readOnly={displayOnly} />
          </div>
        )}
        <div className="flex flex-col w-22">
          <h5 className="m-0">Nom</h5>
          <TextInput value={seller ? seller.name : undefined} readOnly={displayOnly} />
        </div>
        <div className="flex flex-col w-22">
          <h5 className="m-0">URL Logo</h5>
          <TextInput
            value={seller && seller.logoUrl ? seller.logoUrl : undefined}
            readOnly={displayOnly}
          />
        </div>
        <div className="flex flex-col w-22">
          <h5 className="m-0">Actif</h5>
          <Checkbox
            disabled={displayOnly}
            checked={seller && seller.slug && seller.slug.length > 0 ? true : false}
          />
        </div>
        <div className="flex flex-col w-22">
          <h5 className="m-0">Top 40</h5>
          <Checkbox
            disabled={displayOnly}
            checked={seller && seller.top40 ? seller.top40 : false}
          />
        </div>
        <div className="flex flex-col w-22">
          <h5 className="m-0">Top Seller</h5>
          <Checkbox
            disabled={displayOnly}
            checked={seller && seller.topSeller ? seller.topSeller : false}
          />
        </div>
        <div className="flex flex-col w-22">
          <h5 className="m-0">Coupon Ebuyclub</h5>
          <Checkbox
            checked={seller && seller.coupon ? seller.coupon : false}
            disabled={displayOnly}
          />
        </div>

        {/* Cashbackers */}
        {cashbackers.map(({name, variableName}, index) => {
          if (!name || !variableName || !seller) {
            return null;
          }

          const rangeIndex = `isRangeRate${variableName}` as keyof Seller;
          const rateIndex = `rate${variableName}` as keyof Seller;
          const unitIndex = `unitRate${variableName}` as keyof Seller;

          if (!rangeIndex || !rateIndex || !unitIndex) {
            return;
          }

          const rangeValue = typeof seller[rangeIndex] === 'number' ? seller[rangeIndex] : null;
          const rateValue = typeof seller[rateIndex] === 'number' ? seller[rateIndex] : null;
          const unitValue = typeof seller[unitIndex] === 'string' ? seller[unitIndex] : null;

          const displayedRange =
            rateValue && rateValue > 0 ? (rangeValue ? 'range' : 'value') : 'none';
          const displayedRate = rateValue && rateValue > 0 ? rateValue.toString() : '-';
          const displayedUnit =
            rateValue && rateValue > 0 && unitValue !== RateUnit.None
              ? unitValue === RateUnit.Euro
                ? 'euro'
                : 'percent'
              : 'none';

          return (
            <div
              key={`rowCashbacker-${index}`}
              className={index % 2 === 0 ? 'p-2 bg-lightBlue' : 'p-2'}
            >
              <div className="flex flex-col w-22">
                <h5 className="m-0">Type {name}</h5>
                <Select
                  data={[
                    {value: 'value', label: 'Valeur'},
                    {value: 'range', label: "Rang (jusqu'à)"},
                    {value: 'none', label: '-'},
                  ]}
                  value={displayedRange}
                  readOnly={displayOnly}
                />
              </div>
              <div className="flex flex-col w-22">
                <h5 className="m-0">Valeur {name}</h5>
                <TextInput type={'number || string'} value={displayedRate} readOnly={displayOnly} />
              </div>
              <div className="flex flex-col w-22">
                <h5 className="m-0">Unité {name}</h5>
                <Select
                  data={[
                    {value: 'euro', label: '€'},
                    {value: 'percent', label: '%'},
                    {value: 'none', label: '-'},
                  ]}
                  value={displayedUnit}
                  readOnly={displayOnly}
                />
              </div>
            </div>
          );
        })}
      </SimpleGrid>
    </div>
  );
};
