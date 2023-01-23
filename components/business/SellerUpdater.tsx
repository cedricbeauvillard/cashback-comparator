import {Select} from '@mantine/core';
import {Seller} from '@prisma/client';
import {FC, useEffect, useState} from 'react';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {findDetailedSeller, findManySeller} from '../../lib/api/consumers/seller';
import SearchSvg from '../svg/SearchSvg';
import {ImportResults} from '../_static';
import {ExcelImporter} from './ExcelImporter';
import {SellerRow} from './SellerRow';

export interface SellerUpdaterProps {}

export const SellerUpdater: FC<SellerUpdaterProps> = () => {
  const [searchedSeller, setSearchedSeller] = useState<Seller | null>();
  const [foundedSellers, setFoundedSellers] = useState<Seller[] | null>([]);

  const getFormattedImportResult = (changes: ImportResults): string =>
    `Excel importé avec ${changes.totalOperations} opérations traitées:

    AJOUT:
    - Total opérations: ${
      changes.add.ADD_SUCCESS +
      changes.add.ADD_400 +
      changes.add.ADD_403 +
      changes.add.ADD_409 +
      changes.add.ADD_500
    }
    - Total succès: ${changes.add.ADD_SUCCESS}
    - Erreur 400 d’arguments API: ${changes.add.ADD_400}
    - Erreur 403 de droits ou Prisma: ${changes.add.ADD_403}
    - Erreur 409 marchand déjà existant: ${changes.add.ADD_409}
    - Erreur 500 serveur inconnu: ${changes.add.ADD_500}
    
    SUPPRESSION:
    - Total opérations: ${
      changes.remove.REMOVE_SUCCESS +
      changes.remove.REMOVE_400 +
      changes.remove.REMOVE_403 +
      changes.remove.REMOVE_404 +
      changes.remove.REMOVE_500
    }
    - Total succès: ${changes.remove.REMOVE_SUCCESS}
    - Erreur 400 d’arguments API: ${changes.remove.REMOVE_400}
    - Erreur 403 de droits ou Prisma: ${changes.remove.REMOVE_403}
    - Erreur 404 seller pas trouvé: ${changes.remove.REMOVE_404}
    - Erreur 500 serveur inconnu: ${changes.remove.REMOVE_500}
    
    MODIFICATION:
    - Total OPERATIONS: ${
      changes.edit.EDIT_SUCCESS +
      changes.edit.EDIT_400 +
      changes.edit.EDIT_403 +
      changes.edit.EDIT_404 +
      changes.edit.EDIT_500
    }
    - Total succès: ${changes.edit.EDIT_SUCCESS}
    - Erreur 400 d’arguments API: ${changes.edit.EDIT_400}
    - Erreur 403 de droits ou Prisma: ${changes.edit.EDIT_403}
    - Erreur 404 seller pas trouvé: ${changes.edit.EDIT_404}
    - Erreur 500 serveur inconnu: ${changes.edit.EDIT_500}
    `;

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

  const fileImported = (changes: ImportResults) => {
    if (!changes.totalSuccess) {
      toast.error(getFormattedImportResult(changes), {
        position: 'bottom-left',
        autoClose: 30000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        bodyStyle: {
          whiteSpace: 'pre-line',
        },
        progress: undefined,
        theme: 'light',
      });
    } else if (changes.totalSuccess === changes.totalOperations) {
      toast.success(getFormattedImportResult(changes), {
        position: 'bottom-left',
        autoClose: 30000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        bodyStyle: {
          whiteSpace: 'pre-line',
        },
        progress: undefined,
        theme: 'light',
      });
    } else {
      toast.warn(getFormattedImportResult(changes), {
        position: 'bottom-left',
        autoClose: 30000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        bodyStyle: {
          whiteSpace: 'pre-line',
        },
        progress: undefined,
        theme: 'light',
      });
    }
  };

  /*   useEffect(() => {
    fileImported({
      totalOperations: 0,
      totalSuccess: 0,
      add: {
        ADD_SUCCESS: 0,
        ADD_400: 0,
        ADD_403: 0,
        ADD_409: 0,
        ADD_500: 0,
      },
      edit: {
        EDIT_SUCCESS: 0,
        EDIT_400: 0,
        EDIT_403: 0,
        EDIT_404: 0,
        EDIT_500: 0,
      },
      remove: {
        REMOVE_SUCCESS: 0,
        REMOVE_400: 0,
        REMOVE_403: 0,
        REMOVE_404: 0,
        REMOVE_500: 0,
      },
    });
  }, []); */

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

      <ExcelImporter fileImported={fileImported} parsingError={parsingError}></ExcelImporter>
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
