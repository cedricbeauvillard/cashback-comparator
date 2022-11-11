import {Button, FileInput} from '@mantine/core';
import {RateUnit, Seller} from '@prisma/client';
import {FC, useEffect, useState} from 'react';
import readXlsxFile, {Row} from 'read-excel-file';
import {addSeller, editSeller, removeSeller} from '../../lib/api/consumers/seller';

export interface ExcelImporterProps {}

type ActionType = 'ADD' | 'EDIT' | 'DEL' | null;

type Action = Seller & {
  actionType?: ActionType;
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

const buildSellerAction = (actionType: ActionType, row: Row): Action => {
  let action: Action = {
    actionType,
    id: (row[1] as number) ?? null,
    name: (row[2] as string) ?? null,
    logoUrl: null,
    slug: null,
    top40: row[3] ? switchToBool(row[3].toString()) : null,
    topSeller: row[4] ? switchToBool(row[4].toString()) : null,
    coupon: row[5] ? switchToBool(row[5].toString()) : null,
    isRangeRateIgraal: row[6] ? switchToBool(row[6].toString()) : null,
    rateIgraal: (row[7] as number) ?? null,
    unitRateIgraal: row[8] ? symbolToRateUnit(row[8].toString()) : null,
    isRangeRatePoulpeo: row[9] ? switchToBool(row[9].toString()) : null,
    ratePoulpeo: (row[10] as number) ?? null,
    unitRatePoulpeo: row[11] ? symbolToRateUnit(row[11].toString()) : null,
    isRangeRateFlouzy: row[12] ? switchToBool(row[12].toString()) : null,
    rateFlouzy: (row[13] as number) ?? null,
    unitRateFlouzy: row[14] ? symbolToRateUnit(row[14].toString()) : null,
    isRangeRateCapitalKoala: row[15] ? switchToBool(row[15].toString()) : null,
    rateCapitalKoala: (row[16] as number) ?? null,
    unitRateCapitalKoala: row[17] ? symbolToRateUnit(row[17].toString()) : null,
    isRangeRateEbuyclub: row[18] ? switchToBool(row[18].toString()) : null,
    rateEbuyclub: (row[19] as number) ?? null,
    unitRateEbuyclub: row[20] ? symbolToRateUnit(row[20].toString()) : null,
    isRangeRateWidilo: row[21] ? switchToBool(row[21].toString()) : null,
    rateWidilo: (row[22] as number) ?? null,
    unitRateWidilo: row[23] ? symbolToRateUnit(row[23].toString()) : null,
    isRangeRateJoko: row[24] ? switchToBool(row[24].toString()) : null,
    rateJoko: (row[25] as number) ?? null,
    unitRateJoko: row[26] ? symbolToRateUnit(row[26].toString()) : null,
    isRangeRateBoursorama: row[27] ? switchToBool(row[27].toString()) : null,
    rateBoursorama: (row[28] as number) ?? null,
    unitRateBoursorama: row[29] ? symbolToRateUnit(row[29].toString()) : null,
    isRangeRateEbuyclubCoupon: row[30] ? switchToBool(row[30].toString()) : null,
    rateEbuyclubCoupon: (row[31] as number) ?? null,
    unitRateEbuyclubCoupon: row[32] ? symbolToRateUnit(row[32].toString()) : null,
  };

  return action;
};

export const ExcelImporter: FC<ExcelImporterProps> = () => {
  const [file, setFile] = useState<File | null>(null);
  const [actions, setActions] = useState<Action[]>([]);

  const parseExcel = (file: File) => {
    readXlsxFile(file).then((rows: Row[]) => {
      for (let i = 1; i < rows.length; ++i) {
        const row = rows[i];

        const actionType = excelActionToJsActionType(row[0].toString());
        if (!actionType) {
          continue;
        }

        const action = buildSellerAction(actionType, row);

        setActions((actions) => [...actions, action]);
      }
    });
  };

  const operateChanges = () => {
    actions.forEach(async (action) => {
      if (action.actionType === 'ADD') {
        delete action.actionType;

        console.log(await addSeller(action as Seller));
      } else if (action.actionType === 'EDIT') {
        delete action.actionType;

        console.log(await editSeller(action as Seller));
      } else {
        console.log(await removeSeller(action.id));
      }
    });
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
          onClick={() => {
            operateChanges();
          }}
        >
          APPLIQUER
        </Button>
      </div>
    </div>
  );
};
