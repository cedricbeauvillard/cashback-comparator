import {Checkbox, Select, SimpleGrid, TextInput} from '@mantine/core';
import {useForm} from '@mantine/form';
import {RateUnit, Seller} from '@prisma/client';
import {Dispatch, FC, SetStateAction, useEffect} from 'react';

export interface SellerRowProps {
  id: number;
  seller?: Seller;
  displayOnly?: boolean;
  rows?: Seller[];
  // TODO: Make BETTER!! This is not a good way to do it
  setRows?: Dispatch<SetStateAction<Seller[] | undefined>>;
}

export const SellerRow: FC<SellerRowProps> = ({id, seller, displayOnly = false, rows, setRows}) => {
  const form = useForm<Seller>({});

  const updateRows = () => {
    if (setRows) {
      if (!rows) {
        setRows([form.values]);
      } else {
        if (!rows[id]) {
          rows.push(form.values);
          setRows(rows);
        } else {
          rows[id] = form.values;
        }
      }
    }
  };

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
            <TextInput defaultValue={seller ? seller.id : undefined} readOnly={displayOnly} />
          </div>
        )}
        <div className="flex flex-col w-22">
          <h5 className="m-0">Nom</h5>
          <TextInput
            defaultValue={seller ? seller.name : undefined}
            readOnly={displayOnly}
            onChange={(event) => {
              form.setFieldValue('name', event.currentTarget.value);
              updateRows();
            }}
          />
        </div>
        <div className="flex flex-col w-22">
          <h5 className="m-0">URL Logo</h5>
          <TextInput
            defaultValue={seller && seller.logoUrl ? seller.logoUrl : undefined}
            readOnly={displayOnly}
            onChange={(event) => {
              form.setFieldValue('logoUrl', event.currentTarget.value);
              updateRows();
            }}
          />
        </div>
        <div className="flex flex-col w-22">
          <h5 className="m-0">Top 40</h5>
          <Checkbox
            disabled={displayOnly}
            defaultChecked={seller && seller.top40 ? seller.top40 : false}
          />
        </div>
        <div className="flex flex-col w-22">
          <h5 className="m-0">Top Seller</h5>
          <Checkbox
            disabled={displayOnly}
            defaultChecked={seller && seller.topSeller ? seller.topSeller : false}
          />
        </div>
        <div className="flex flex-col w-22">
          <h5 className="m-0">Coupon Ebuyclub</h5>
          <Checkbox
            defaultChecked={seller && seller.coupon ? seller.coupon : false}
            disabled={displayOnly}
          />
        </div>

        {/* Igraal */}
        <div className="flex flex-col w-22">
          <h5 className="m-0">Type Igraal</h5>
          <Select
            data={[
              {value: 'value', label: 'Valeur'},
              {value: 'range', label: 'Rang'},
            ]}
            defaultValue={
              seller && seller.isRangeRateIgraal
                ? seller.isRangeRateIgraal
                  ? 'range'
                  : 'value'
                : undefined
            }
            readOnly={displayOnly}
          />
        </div>
        <div className="flex flex-col w-22">
          <h5 className="m-0">Valeur Igraal</h5>
          <TextInput
            type={'number'}
            defaultValue={seller && seller.rateIgraal ? seller.rateIgraal : undefined}
            readOnly={displayOnly}
          />
        </div>
        <div className="flex flex-col w-22">
          <h5 className="m-0">Unité Igraal</h5>
          <Select
            data={[
              {value: 'euro', label: '€'},
              {value: 'percent', label: '%'},
            ]}
            defaultValue={
              seller && seller.unitRateIgraal
                ? seller.unitRateIgraal === RateUnit.Euro
                  ? 'euro'
                  : 'percent'
                : undefined
            }
            readOnly={displayOnly}
          />
        </div>

        {/* Poulpeo */}
        <div className="flex flex-col w-22">
          <h5 className="m-0">Type Poulpeo</h5>
          <Select
            data={[
              {value: 'value', label: 'Valeur'},
              {value: 'range', label: 'Rang'},
            ]}
            defaultValue={
              seller && seller.isRangeRatePoulpeo
                ? seller.isRangeRatePoulpeo
                  ? 'range'
                  : 'value'
                : undefined
            }
            readOnly={displayOnly}
          />
        </div>
        <div className="flex flex-col w-22">
          <h5 className="m-0">Valeur Poulpeo</h5>
          <TextInput
            type={'number'}
            defaultValue={seller && seller.ratePoulpeo ? seller.ratePoulpeo : undefined}
            readOnly={displayOnly}
          />
        </div>
        <div className="flex flex-col w-22">
          <h5 className="m-0">Unité Poulpeo</h5>
          <Select
            data={[
              {value: 'euro', label: '€'},
              {value: 'percent', label: '%'},
            ]}
            defaultValue={
              seller && seller.unitRatePoulpeo
                ? seller.unitRatePoulpeo === RateUnit.Euro
                  ? 'euro'
                  : 'percent'
                : undefined
            }
            readOnly={displayOnly}
          />
        </div>

        {/* Flouzy */}
        <div className="flex flex-col w-22">
          <h5 className="m-0">Type Flouzy</h5>
          <Select
            data={[
              {value: 'value', label: 'Valeur'},
              {value: 'range', label: 'Rang'},
            ]}
            defaultValue={
              seller && seller.isRangeRateFlouzy
                ? seller.isRangeRateFlouzy
                  ? 'range'
                  : 'value'
                : undefined
            }
            readOnly={displayOnly}
          />
        </div>
        <div className="flex flex-col w-22">
          <h5 className="m-0">Valeur Flouzy</h5>
          <TextInput
            type={'number'}
            defaultValue={seller && seller.rateFlouzy ? seller.rateFlouzy : undefined}
            readOnly={displayOnly}
          />
        </div>
        <div className="flex flex-col w-22">
          <h5 className="m-0">Unité Flouzy</h5>
          <Select
            data={[
              {value: 'euro', label: '€'},
              {value: 'percent', label: '%'},
            ]}
            defaultValue={
              seller && seller.unitRateFlouzy
                ? seller.unitRateFlouzy === RateUnit.Euro
                  ? 'euro'
                  : 'percent'
                : undefined
            }
            readOnly={displayOnly}
          />
        </div>

        {/* CapitalKoala */}
        <div className="flex flex-col w-22">
          <h5 className="m-0">Type CapitalKoala</h5>
          <Select
            data={[
              {value: 'value', label: 'Valeur'},
              {value: 'range', label: 'Rang'},
            ]}
            defaultValue={
              seller && seller.isRangeRateCapitalKoala
                ? seller.isRangeRateCapitalKoala
                  ? 'range'
                  : 'value'
                : undefined
            }
            readOnly={displayOnly}
          />
        </div>
        <div className="flex flex-col w-22">
          <h5 className="m-0">Valeur CapitalKoala</h5>
          <TextInput
            type={'number'}
            defaultValue={seller && seller.rateCapitalKoala ? seller.rateCapitalKoala : undefined}
            readOnly={displayOnly}
          />
        </div>
        <div className="flex flex-col w-22">
          <h5 className="m-0">Unité CapitalKoala</h5>
          <Select
            data={[
              {value: 'euro', label: '€'},
              {value: 'percent', label: '%'},
            ]}
            defaultValue={
              seller && seller.unitRateCapitalKoala
                ? seller.unitRateCapitalKoala === RateUnit.Euro
                  ? 'euro'
                  : 'percent'
                : undefined
            }
            readOnly={displayOnly}
          />
        </div>

        {/* Ebuyclub */}
        <div className="flex flex-col w-22">
          <h5 className="m-0">Type Ebuyclub</h5>
          <Select
            data={[
              {value: 'value', label: 'Valeur'},
              {value: 'range', label: 'Rang'},
            ]}
            defaultValue={
              seller && seller.isRangeRateEbuyclub
                ? seller.isRangeRateEbuyclub
                  ? 'range'
                  : 'value'
                : undefined
            }
            readOnly={displayOnly}
          />
        </div>
        <div className="flex flex-col w-22">
          <h5 className="m-0">Valeur Ebuyclub</h5>
          <TextInput
            type={'number'}
            defaultValue={seller && seller.rateEbuyclub ? seller.rateEbuyclub : undefined}
            readOnly={displayOnly}
          />
        </div>
        <div className="flex flex-col w-22">
          <h5 className="m-0">Unité Ebuyclub</h5>
          <Select
            data={[
              {value: 'euro', label: '€'},
              {value: 'percent', label: '%'},
            ]}
            defaultValue={
              seller && seller.unitRateEbuyclub
                ? seller.unitRateEbuyclub === RateUnit.Euro
                  ? 'euro'
                  : 'percent'
                : undefined
            }
            readOnly={displayOnly}
          />
        </div>

        {/* Widilo */}
        <div className="flex flex-col w-22">
          <h5 className="m-0">Type Widilo</h5>
          <Select
            data={[
              {value: 'value', label: 'Valeur'},
              {value: 'range', label: 'Rang'},
            ]}
            defaultValue={
              seller && seller.isRangeRateWidilo
                ? seller.isRangeRateWidilo
                  ? 'range'
                  : 'value'
                : undefined
            }
            readOnly={displayOnly}
          />
        </div>
        <div className="flex flex-col w-22">
          <h5 className="m-0">Valeur Widilo</h5>
          <TextInput
            type={'number'}
            defaultValue={seller && seller.rateWidilo ? seller.rateWidilo : undefined}
            readOnly={displayOnly}
          />
        </div>
        <div className="flex flex-col w-22">
          <h5 className="m-0">Unité Widilo</h5>
          <Select
            data={[
              {value: 'euro', label: '€'},
              {value: 'percent', label: '%'},
            ]}
            defaultValue={
              seller && seller.unitRateWidilo
                ? seller.unitRateWidilo === RateUnit.Euro
                  ? 'euro'
                  : 'percent'
                : undefined
            }
            readOnly={displayOnly}
          />
        </div>

        {/* Joko */}
        <div className="flex flex-col w-22">
          <h5 className="m-0">Type Joko</h5>
          <Select
            data={[
              {value: 'value', label: 'Valeur'},
              {value: 'range', label: 'Rang'},
            ]}
            defaultValue={
              seller && seller.isRangeRateJoko
                ? seller.isRangeRateJoko
                  ? 'range'
                  : 'value'
                : undefined
            }
            readOnly={displayOnly}
          />
        </div>
        <div className="flex flex-col w-22">
          <h5 className="m-0">Valeur Joko</h5>
          <TextInput
            type={'number'}
            defaultValue={seller && seller.rateJoko ? seller.rateJoko : undefined}
            readOnly={displayOnly}
          />
        </div>
        <div className="flex flex-col w-22">
          <h5 className="m-0">Unité Joko</h5>
          <Select
            data={[
              {value: 'euro', label: '€'},
              {value: 'percent', label: '%'},
            ]}
            defaultValue={
              seller && seller.unitRateJoko
                ? seller.unitRateJoko === RateUnit.Euro
                  ? 'euro'
                  : 'percent'
                : undefined
            }
            readOnly={displayOnly}
          />
        </div>

        {/* Boursorama */}
        <div className="flex flex-col w-22">
          <h5 className="m-0">Type Boursorama</h5>
          <Select
            data={[
              {value: 'value', label: 'Valeur'},
              {value: 'range', label: 'Rang'},
            ]}
            defaultValue={
              seller && seller.isRangeRateBoursorama
                ? seller.isRangeRateBoursorama
                  ? 'range'
                  : 'value'
                : undefined
            }
            readOnly={displayOnly}
          />
        </div>
        <div className="flex flex-col w-22">
          <h5 className="m-0">Valeur Boursorama</h5>
          <TextInput
            type={'number'}
            defaultValue={seller && seller.rateBoursorama ? seller.rateBoursorama : undefined}
            readOnly={displayOnly}
          />
        </div>
        <div className="flex flex-col w-22">
          <h5 className="m-0">Unité Boursorama</h5>
          <Select
            data={[
              {value: 'euro', label: '€'},
              {value: 'percent', label: '%'},
            ]}
            defaultValue={
              seller && seller.unitRateBoursorama
                ? seller.unitRateBoursorama === RateUnit.Euro
                  ? 'euro'
                  : 'percent'
                : undefined
            }
            readOnly={displayOnly}
          />
        </div>

        {/* Ebuyclub Coupon */}
        <div className="flex flex-col w-22">
          <h5 className="m-0">Type Ebuyclub Coupon</h5>
          <Select
            data={[
              {value: 'value', label: 'Valeur'},
              {value: 'range', label: 'Rang'},
            ]}
            defaultValue={
              seller && seller.isRangeRateEbuyclubCoupon
                ? seller.isRangeRateEbuyclubCoupon
                  ? 'range'
                  : 'value'
                : undefined
            }
            readOnly={displayOnly}
          />
        </div>
        <div className="flex flex-col w-22">
          <h5 className="m-0">Valeur Ebuyclub Coupon</h5>
          <TextInput
            type={'number'}
            defaultValue={
              seller && seller.rateEbuyclubCoupon ? seller.rateEbuyclubCoupon : undefined
            }
            readOnly={displayOnly}
          />
        </div>
        <div className="flex flex-col w-22">
          <h5 className="m-0">Unité Ebuyclub Coupon</h5>
          <Select
            data={[
              {value: 'euro', label: '€'},
              {value: 'percent', label: '%'},
            ]}
            defaultValue={
              seller && seller.unitRateEbuyclubCoupon
                ? seller.unitRateEbuyclubCoupon === RateUnit.Euro
                  ? 'euro'
                  : 'percent'
                : undefined
            }
            readOnly={displayOnly}
          />
        </div>
      </SimpleGrid>
    </div>
  );
};
