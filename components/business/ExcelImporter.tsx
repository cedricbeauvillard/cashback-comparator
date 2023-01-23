import {Button, FileInput} from '@mantine/core';
import {RateUnit, Seller} from '@prisma/client';
import {FC, useEffect, useState} from 'react';
import readXlsxFile, {Row} from 'read-excel-file';
import {Cell} from 'read-excel-file/types';
import {addSeller, editSeller, removeSeller} from '../../lib/api/consumers/seller';
import {logger} from '../../lib/logger';
import {getDefaultImportResult, ImportResults} from '../_static';

export interface ExcelImporterProps {
  fileImported: (changes: ImportResults) => void;
  parsingError: () => {};
}

type ActionType = 'ADD' | 'EDIT' | 'REMOVE' | null;

type Action = Seller & {
  type?: ActionType;
  active?: boolean;
};

const symbolToRateUnit = (symbol: Cell): RateUnit | null => {
  if (!symbol || typeof symbol !== 'string') {
    return null;
  }

  if (symbol === '%') {
    return RateUnit.Percent;
  } else if (symbol === '€') {
    return RateUnit.Euro;
  }

  return RateUnit.None;
};

const switchToBool = (switchAnswer: String): boolean => {
  if (switchAnswer === 'OUI') {
    return true;
  }

  return false;
};

const parseRate = (rowCell: Cell): number | null => {
  if (!rowCell) {
    return null;
  }

  return typeof rowCell === 'number' ? rowCell : 0;
};

const excelActionToJsActionType = (excelAction: String): ActionType => {
  if (excelAction === 'AJOUT') {
    return 'ADD';
  } else if (excelAction === 'MODIF') {
    return 'EDIT';
  } else if (excelAction === 'SUPPR') {
    return 'REMOVE';
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
    rateIgraal: parseRate(row[8]),
    unitRateIgraal: symbolToRateUnit(row[9]),
    isRangeRatePoulpeo: row[10] ? switchToBool(row[10].toString()) : null,
    ratePoulpeo: parseRate(row[11]),
    unitRatePoulpeo: symbolToRateUnit(row[12]),
    isRangeRateFlouzy: row[13] ? switchToBool(row[13].toString()) : null,
    rateFlouzy: parseRate(row[14]),
    unitRateFlouzy: symbolToRateUnit(row[15]),
    isRangeRateCapitalKoala: row[16] ? switchToBool(row[16].toString()) : null,
    rateCapitalKoala: parseRate(row[17]),
    unitRateCapitalKoala: symbolToRateUnit(row[18]),
    isRangeRateEbuyclub: row[19] ? switchToBool(row[19].toString()) : null,
    rateEbuyclub: parseRate(row[20]),
    unitRateEbuyclub: symbolToRateUnit(row[21]),
    isRangeRateWidilo: row[22] ? switchToBool(row[22].toString()) : null,
    rateWidilo: parseRate(row[23]),
    unitRateWidilo: symbolToRateUnit(row[24]),
    isRangeRateJoko: row[25] ? switchToBool(row[25].toString()) : null,
    rateJoko: parseRate(row[26]),
    unitRateJoko: symbolToRateUnit(row[27]),
    isRangeRateBoursorama: row[28] ? switchToBool(row[28].toString()) : null,
    rateBoursorama: parseRate(row[29]),
    unitRateBoursorama: symbolToRateUnit(row[30]),
    isRangeRateEbuyclubCoupon: row[31] ? switchToBool(row[31].toString()) : null,
    rateEbuyclubCoupon: parseRate(row[32]),
    unitRateEbuyclubCoupon: symbolToRateUnit(row[33]),
  };

  return action;
};

// TODO: Move import system in the back-end
export const ExcelImporter: FC<ExcelImporterProps> = ({fileImported, parsingError}) => {
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

  const updateImportResults = async (
    results: ImportResults,
    actionType: ActionType,
    code: number
  ) => {
    // TODO: Make a more generic code (try for an hour to do it with type and Object.entities... no way...)
    if (actionType === 'ADD') {
      if (code === 200) {
        results.add.ADD_SUCCESS++;
        results.totalSuccess++;
      } else if (code === 400) {
        results.add.ADD_400++;
      } else if (code === 403) {
        results.add.ADD_403++;
      } else if (code === 409) {
        results.add.ADD_409++;
      } else if (code === 500) {
        results.add.ADD_500++;
      }
    } else if (actionType === 'REMOVE') {
      if (code === 200) {
        results.remove.REMOVE_SUCCESS++;
        results.totalSuccess++;
      } else if (code === 400) {
        results.remove.REMOVE_400++;
      } else if (code === 403) {
        results.remove.REMOVE_403++;
      } else if (code === 404) {
        results.remove.REMOVE_404++;
      } else if (code === 500) {
        results.remove.REMOVE_500++;
      }
    } else if (actionType === 'EDIT') {
      if (code === 200) {
        results.edit.EDIT_SUCCESS++;
        results.totalSuccess++;
      } else if (code === 400) {
        results.edit.EDIT_400++;
      } else if (code === 403) {
        results.edit.EDIT_403++;
      } else if (code === 404) {
        results.edit.EDIT_404++;
      } else if (code === 500) {
        results.edit.EDIT_500++;
      }
    }
  };

  const operateChanges = async (): Promise<ImportResults | null> => {
    if (!actions.length) {
      return null;
    }

    const importResults: ImportResults = getDefaultImportResult();

    for (const action of actions) {
      const active = action.active;
      const type = action.type;

      if (!type) {
        logger.warn('Skip this action, cannot parse it.');
        continue;
      }

      delete action.type;
      if (active) {
        delete action.active;
      }

      if (type === 'ADD') {
        const res = await addSeller(action as Seller, active ?? undefined);

        updateImportResults(importResults, type, res.status);
      } else if (type == 'EDIT') {
        const res = await editSeller(action.id, action as Seller, active ?? undefined);

        updateImportResults(importResults, type, res.status);
      } else if (type === 'REMOVE') {
        const res = await removeSeller(action.id);

        updateImportResults(importResults, type, res.status);
      }

      importResults.totalOperations++;
    }

    setFile(null);
    return importResults;
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
            await operateChanges().then((changes: ImportResults | null) => {
              if (!changes) {
                parsingError();
              } else {
                fileImported(changes);
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
