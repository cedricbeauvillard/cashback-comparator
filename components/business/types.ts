import {Cashbacker, RateUnit} from '@prisma/client';

export interface ItemCashbackerProps {
  cashbacker: Cashbacker;
  rateData: RateData;
}

export type RateData = {
  isRangeRate: boolean;
  rate: number;
  unit: RateUnit;
};

export const emptyRateData: RateData = {
  isRangeRate: false,
  rate: 0,
  unit: RateUnit.None,
};
