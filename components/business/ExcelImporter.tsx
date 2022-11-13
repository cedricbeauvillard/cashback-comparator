import {Button, FileInput} from '@mantine/core';
import {RateUnit, Seller} from '@prisma/client';
import {FC, useEffect, useState} from 'react';
import readXlsxFile, {Row} from 'read-excel-file';
import {addSeller, editSeller, removeSeller} from '../../lib/api/consumers/seller';

export interface ExcelImporterProps {
  fileImported: (changes: string) => {};
  importError: () => {};
}

type ActionType = 'ADD' | 'EDIT' | 'DEL' | null;

type Action = Seller & {
  type?: ActionType;
  active?: boolean;
};

const symbolToRateUnit = (symbol: String): RateUnit => {
  if (symbol === '%') {
    return RateUnit.Percent;
  }

  return RateUnit.Euro;
};

const switchToBool = (switchAnswer: String): boolean => {
  if (switchAnswer === 'OUI') {
    return true;
  }

  return false;
};

const excelActionToJsActionType = (excelAction: String): ActionType => {
  if (excelAction === 'AJOUT') {
    return 'ADD';
  } else if (excelAction === 'MODIF') {
    return 'EDIT';
  } else if (excelAction === 'SUPPR') {
    return 'DEL';
  } else {
    return null;
  }
};

const buildSellerAction = (type: ActionType, row: Row): Action => {
  let action: Action = {
    type,
    active: row[1] ? switchToBool(row[1].toString()) : undefined,
    id: (row[2] as number) ?? null,
    name: (row[3] as string) ?? null,
    logoUrl: null,
    slug: null,
    top40: row[4] ? switchToBool(row[4].toString()) : null,
    topSeller: row[5] ? switchToBool(row[5].toString()) : null,
    coupon: row[6] ? switchToBool(row[6].toString()) : null,
    isRangeRateIgraal: row[7] ? switchToBool(row[7].toString()) : null,
    rateIgraal: (row[8] as number) ?? null,
    unitRateIgraal: row[9] ? symbolToRateUnit(row[9].toString()) : null,
    isRangeRatePoulpeo: row[10] ? switchToBool(row[10].toString()) : null,
    ratePoulpeo: (row[11] as number) ?? null,
    unitRatePoulpeo: row[12] ? symbolToRateUnit(row[12].toString()) : null,
    isRangeRateFlouzy: row[13] ? switchToBool(row[13].toString()) : null,
    rateFlouzy: (row[14] as number) ?? null,
    unitRateFlouzy: row[15] ? symbolToRateUnit(row[15].toString()) : null,
    isRangeRateCapitalKoala: row[16] ? switchToBool(row[16].toString()) : null,
    rateCapitalKoala: (row[17] as number) ?? null,
    unitRateCapitalKoala: row[18] ? symbolToRateUnit(row[18].toString()) : null,
    isRangeRateEbuyclub: row[19] ? switchToBool(row[19].toString()) : null,
    rateEbuyclub: (row[20] as number) ?? null,
    unitRateEbuyclub: row[21] ? symbolToRateUnit(row[21].toString()) : null,
    isRangeRateWidilo: row[22] ? switchToBool(row[22].toString()) : null,
    rateWidilo: (row[23] as number) ?? null,
    unitRateWidilo: row[24] ? symbolToRateUnit(row[24].toString()) : null,
    isRangeRateJoko: row[25] ? switchToBool(row[25].toString()) : null,
    rateJoko: (row[26] as number) ?? null,
    unitRateJoko: row[27] ? symbolToRateUnit(row[27].toString()) : null,
    isRangeRateBoursorama: row[28] ? switchToBool(row[28].toString()) : null,
    rateBoursorama: (row[29] as number) ?? null,
    unitRateBoursorama: row[30] ? symbolToRateUnit(row[30].toString()) : null,
    isRangeRateEbuyclubCoupon: row[31] ? switchToBool(row[31].toString()) : null,
    rateEbuyclubCoupon: (row[32] as number) ?? null,
    unitRateEbuyclubCoupon: row[33] ? symbolToRateUnit(row[33].toString()) : null,
  };

  return action;
};

export const ExcelImporter: FC<ExcelImporterProps> = ({fileImported, importError}) => {
  const [file, setFile] = useState<File | null>(null);
  const [actions, setActions] = useState<Action[]>([]);

  const parseExcel = (file: File) => {
    readXlsxFile(file).then((rows: Row[]) => {
      for (let i = 1; i < rows.length; ++i) {
        const row = rows[i];

        const type = excelActionToJsActionType(row[0].toString());
        if (!type) {
          continue;
        }

        const action = buildSellerAction(type, row);
        setActions((actions) => [...actions, action]);
      }
    });
  };

  const operateChanges = async (): Promise<string> => {
    let successfullOperationsCount: number = 0;

    for (const action of actions) {
      const active = action.active;
      const type = action.type;

      delete action.active;
      delete action.type;

      if (type === 'ADD') {
        const res = await addSeller(action as Seller, active ?? undefined);

        if (res.added) {
          successfullOperationsCount += 1;
        }
      } else if (type == 'EDIT') {
        const res = await editSeller(action as Seller, active ?? undefined);

        if (res.edited) {
          successfullOperationsCount += 1;
        }
      } else {
        const res = await removeSeller(action.id);

        if (res.removed) {
          successfullOperationsCount += 1;
        }
      }
    }

    return `${successfullOperationsCount}/${actions.length}`;
  };

  useEffect(() => {
    if (!file) {
      return;
    }

    parseExcel(file);
  }, [file]);

  return (
    <div>
      {/* xlsx import */}
      <div className="w-full">
        <h1>Import excel (xlsx)</h1>
        <FileInput
          value={file}
          onChange={setFile}
          id="fileInput"
          size="lg"
          className="w-72"
          placeholder="Choisir un fichier"
          label="Fichier xlsx"
          withAsterisk
        />
        <Button
          className="mt-4"
          onClick={async () => {
            await operateChanges().then((changes: string) => {
              const changeOccured = changes[0] !== '0';

              if (changeOccured) {
                fileImported(changes);
              } else {
                importError();
              }

              setActions([]);
            });
          }}
        >
          APPLIQUER
        </Button>
      </div>
    </div>
  );
};
