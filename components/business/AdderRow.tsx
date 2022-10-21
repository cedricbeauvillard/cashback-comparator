import {Checkbox, Select, SimpleGrid, TextInput} from '@mantine/core';
import {FC} from 'react';

export interface AdderRowProps {}

export const AdderRow: FC<AdderRowProps> = () => {
  return (
    <div className="w-full h-auto bg-hyperlink">
      <SimpleGrid cols={10} spacing="lg">
        <div className="flex flex-col w-22 bg-mainColor">
          <h5 className="m-0">Nom</h5>
          <TextInput />
        </div>
        <div className="flex flex-col w-22 bg-mainColor">
          <h5 className="m-0">URL Logo</h5>
          <TextInput />
        </div>
        <div className="flex flex-col w-22 bg-mainColor">
          <h5 className="m-0">Top 40</h5>
          <Checkbox />
        </div>
        <div className="flex flex-col w-22 bg-mainColor">
          <h5 className="m-0">Top Seller</h5>
          <Checkbox />
        </div>
        <div className="flex flex-col w-22 bg-mainColor">
          <h5 className="m-0">Coupon Ebuyclub</h5>
          <Checkbox />
        </div>

        {/* Igraal */}
        <div className="flex flex-col w-22 bg-mainColor">
          <h5 className="m-0">Type Igraal</h5>
          <Select
            placeholder="Pick one"
            data={[
              {value: 'react', label: 'Valeur'},
              {value: 'ng', label: 'Rang'},
            ]}
          />
        </div>
        <div className="flex flex-col w-22 bg-mainColor">
          <h5 className="m-0">Valeur Igraal</h5>
          <TextInput type={'number'} />
        </div>
        <div className="flex flex-col w-22 bg-mainColor">
          <h5 className="m-0">Unité Igraal</h5>
          <Select
            placeholder="Pick one"
            data={[
              {value: 'react', label: '€'},
              {value: 'ng', label: '%'},
            ]}
          />
        </div>

        {/* Poulpeo */}
        <div className="flex flex-col w-22 bg-mainColor">
          <h5 className="m-0">Type Poulpeo</h5>
          <Select
            placeholder="Pick one"
            data={[
              {value: 'react', label: 'Valeur'},
              {value: 'ng', label: 'Rang'},
            ]}
          />
        </div>
        <div className="flex flex-col w-22 bg-mainColor">
          <h5 className="m-0">Valeur Poulpeo</h5>
          <TextInput type={'number'} />
        </div>
        <div className="flex flex-col w-22 bg-mainColor">
          <h5 className="m-0">Unité Poulpeo</h5>
          <Select
            placeholder="Pick one"
            data={[
              {value: 'react', label: '€'},
              {value: 'ng', label: '%'},
            ]}
          />
        </div>

        {/* Flouzy */}
        <div className="flex flex-col w-22 bg-mainColor">
          <h5 className="m-0">Type Flouzy</h5>
          <Select
            placeholder="Pick one"
            data={[
              {value: 'react', label: 'Valeur'},
              {value: 'ng', label: 'Rang'},
            ]}
          />
        </div>
        <div className="flex flex-col w-22 bg-mainColor">
          <h5 className="m-0">Valeur Flouzy</h5>
          <TextInput type={'number'} />
        </div>
        <div className="flex flex-col w-22 bg-mainColor">
          <h5 className="m-0">Unité Flouzy</h5>
          <Select
            placeholder="Pick one"
            data={[
              {value: 'react', label: '€'},
              {value: 'ng', label: '%'},
            ]}
          />
        </div>

        {/* CapitalKoala */}
        <div className="flex flex-col w-22 bg-mainColor">
          <h5 className="m-0">Type CapitalKoala</h5>
          <Select
            placeholder="Pick one"
            data={[
              {value: 'react', label: 'Valeur'},
              {value: 'ng', label: 'Rang'},
            ]}
          />
        </div>
        <div className="flex flex-col w-22 bg-mainColor">
          <h5 className="m-0">Valeur CapitalKoala</h5>
          <TextInput type={'number'} />
        </div>
        <div className="flex flex-col w-22 bg-mainColor">
          <h5 className="m-0">Unité CapitalKoala</h5>
          <Select
            placeholder="Pick one"
            data={[
              {value: 'react', label: '€'},
              {value: 'ng', label: '%'},
            ]}
          />
        </div>

        {/* Ebuyclub */}
        <div className="flex flex-col w-22 bg-mainColor">
          <h5 className="m-0">Type Ebuyclub</h5>
          <Select
            placeholder="Pick one"
            data={[
              {value: 'react', label: 'Valeur'},
              {value: 'ng', label: 'Rang'},
            ]}
          />
        </div>
        <div className="flex flex-col w-22 bg-mainColor">
          <h5 className="m-0">Valeur Ebuyclub</h5>
          <TextInput type={'number'} />
        </div>
        <div className="flex flex-col w-22 bg-mainColor">
          <h5 className="m-0">Unité Ebuyclub</h5>
          <Select
            placeholder="Pick one"
            data={[
              {value: 'react', label: '€'},
              {value: 'ng', label: '%'},
            ]}
          />
        </div>

        {/* Widilo */}
        <div className="flex flex-col w-22 bg-mainColor">
          <h5 className="m-0">Type Widilo</h5>
          <Select
            placeholder="Pick one"
            data={[
              {value: 'react', label: 'Valeur'},
              {value: 'ng', label: 'Rang'},
            ]}
          />
        </div>
        <div className="flex flex-col w-22 bg-mainColor">
          <h5 className="m-0">Valeur Widilo</h5>
          <TextInput type={'number'} />
        </div>
        <div className="flex flex-col w-22 bg-mainColor">
          <h5 className="m-0">Unité Widilo</h5>
          <Select
            placeholder="Pick one"
            data={[
              {value: 'react', label: '€'},
              {value: 'ng', label: '%'},
            ]}
          />
        </div>

        {/* Joko */}
        <div className="flex flex-col w-22 bg-mainColor">
          <h5 className="m-0">Type Joko</h5>
          <Select
            placeholder="Pick one"
            data={[
              {value: 'react', label: 'Valeur'},
              {value: 'ng', label: 'Rang'},
            ]}
          />
        </div>
        <div className="flex flex-col w-22 bg-mainColor">
          <h5 className="m-0">Valeur Joko</h5>
          <TextInput type={'number'} />
        </div>
        <div className="flex flex-col w-22 bg-mainColor">
          <h5 className="m-0">Unité Joko</h5>
          <Select
            placeholder="Pick one"
            data={[
              {value: 'react', label: '€'},
              {value: 'ng', label: '%'},
            ]}
          />
        </div>

        {/* Boursorama */}
        <div className="flex flex-col w-22 bg-mainColor">
          <h5 className="m-0">Type Boursorama</h5>
          <Select
            placeholder="Pick one"
            data={[
              {value: 'react', label: 'Valeur'},
              {value: 'ng', label: 'Rang'},
            ]}
          />
        </div>
        <div className="flex flex-col w-22 bg-mainColor">
          <h5 className="m-0">Valeur Boursorama</h5>
          <TextInput type={'number'} />
        </div>
        <div className="flex flex-col w-22 bg-mainColor">
          <h5 className="m-0">Unité Boursorama</h5>
          <Select
            placeholder="Pick one"
            data={[
              {value: 'react', label: '€'},
              {value: 'ng', label: '%'},
            ]}
          />
        </div>

        {/* Ebuyclub Coupon */}
        <div className="flex flex-col w-22 bg-mainColor">
          <h5 className="m-0">Type Ebuyclub Coupon</h5>
          <Select
            placeholder="Pick one"
            data={[
              {value: 'react', label: 'Valeur'},
              {value: 'ng', label: 'Rang'},
            ]}
          />
        </div>
        <div className="flex flex-col w-22 bg-mainColor">
          <h5 className="m-0">Valeur Ebuyclub Coupon</h5>
          <TextInput type={'number'} />
        </div>
        <div className="flex flex-col w-22 bg-mainColor">
          <h5 className="m-0">Unité Ebuyclub Coupon</h5>
          <Select
            placeholder="Pick one"
            data={[
              {value: 'react', label: '€'},
              {value: 'ng', label: '%'},
            ]}
          />
        </div>
      </SimpleGrid>
    </div>
  );
};
