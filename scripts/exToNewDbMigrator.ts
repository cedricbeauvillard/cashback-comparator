import {exDatabaseSecondPartData, firstPartData} from './_static';
import {prisma, Prisma, PrismaClient, RateUnit} from '@prisma/client';

/*   isRangeRateIgraal Boolean  @default(false)
  rateIgraal        Float    @default(0)
  unitRateIgraal    RateUnit

  isRangeRatePoulpeo Boolean  @default(false)
  ratePoulpeo        Float    @default(0)
  unitRatePoulpeo    RateUnit

  isRangeRateFunC Boolean  @default(false)
  rateFunC        Float    @default(0)
  unitRateFunC    RateUnit

  isRangeRateAuBonProfit Boolean  @default(false)
  rateAuBonProfit        Float    @default(0)
  unitRateAuBonProfit    RateUnit

  isRangeRateFlouzy Boolean  @default(false)
  rateFlouzy        Float    @default(0)
  unitRateFlouzy    RateUnit

  isRangeRateCapitalKoala Boolean  @default(false)
  rateCapitalKoala        Float    @default(0)
  unitRateCapitalKoala    RateUnit

  isRangeRateEbuyclub Boolean  @default(false)
  rateEbuyclub        Float    @default(0)
  unitRateEbuyclub    RateUnit

  isRangeRateWidilo Boolean  @default(false)
  rateWidilo        Float    @default(0)
  unitRateWidilo    RateUnit

  isRangeRateJoko Boolean  @default(false)
  rateJoko        Float    @default(0)
  unitRateJoko    RateUnit

  isRangeRateBoursorama Boolean  @default(false)
  rateBoursorama        Float    @default(0)
  unitRateBoursorama    RateUnit

  isRangeRateEbuyclubCoupon Boolean  @default(false)
  rateEbuyclubCoupon        Float    @default(0)
  unitRateEbuyclubCoupon    RateUnit
  
  
  [true, 2.5, 'EURO', true, 2.5, 'EURO', true, 2.5, 'EURO', true, 2.5, 'EURO', true, 2.5, 'EURO', true, 2.5, 'EURO', true, 2.5, 'EURO', true, 2.5, 'EURO', true, 2.5, 'EURO', true, 2.5, 'EURO', true, 2.5, 'EURO']*/

function isUntil(rowData: string): Boolean {
  const regex = new RegExp('jusqu');

  return regex.test(rowData);
}

function isPercent(rowData: string): Boolean {
  const regex = new RegExp('%');

  return regex.test(rowData);
}

function isEuro(rowData: string): Boolean {
  const regex = new RegExp('€');

  return regex.test(rowData);
}

function extractValue(rowData: string): number {
  const regexRoundedFloat = new RegExp('.00');
  const regexRoundedFloat2 = new RegExp(',00');
  const regexFloat = new RegExp('.');
  const regexFloat2 = new RegExp(',');

  const extractedValue = rowData.match(/\d+(?:[\,\.]\d+)?/);

  // Float is rounded
  if (regexRoundedFloat.test(rowData) || regexRoundedFloat2.test(rowData)) {
    const parsedNbr = extractedValue ? parseInt(extractedValue[0], 10) : 0;

    return parsedNbr;
  }

  // Float is not rounded
  if (regexFloat.test(rowData) || regexFloat2.test(rowData)) {
    const parsedNbr = extractedValue ? parseFloat(extractedValue[0].replace(',', '.')) : 0;

    return parsedNbr;
  }

  return extractedValue ? parseInt(extractedValue[0], 10) : 0;
}

function buildNewModelRowUntil(rowData: string): [boolean, number, RateUnit] {
  const regexEuro = new RegExp('€');

  const extractedValue = extractValue(rowData);

  if (regexEuro.test(rowData)) {
    return [true, extractedValue, RateUnit.Euro];
  } else {
    return [true, extractedValue, RateUnit.Percent];
  }
}

function buildNewModelRowPercent(rowData: string): [boolean, number, RateUnit] {
  const extractedValue = extractValue(rowData);

  return [false, extractedValue, RateUnit.Percent];
}

function buildNewModelRowEuro(rowData: string): [boolean, number, RateUnit] {
  const extractedValue = extractValue(rowData);

  return [false, extractedValue, RateUnit.Euro];
}

function parseFirstPart(
  rowFirstPartData: [string, string, number, number, number, string]
): [string, string | undefined, boolean, boolean, boolean, number[]] {
  const sellerName = rowFirstPartData[0];
  const top40 = rowFirstPartData[2] === 1;
  const topSeller = rowFirstPartData[3] === 1;
  const coupon = rowFirstPartData[4] === 1;

  const categories: number[] =
    rowFirstPartData[5].length > 0
      ? rowFirstPartData[5].split(',').map(function (item) {
          return parseInt(item, 10);
        })
      : [];

  return [sellerName, undefined, top40, topSeller, coupon, categories];
}

async function main() {
  const prisma = new PrismaClient();

  console.log(exDatabaseSecondPartData.length);
  console.log(firstPartData.length);

  const finalResult = [];

  // Read rows
  for (let i = 0; i < exDatabaseSecondPartData.length; ++i) {
    let row: any[] = [];

    const firstPartNew = parseFirstPart(firstPartData[i]);

    row = row.concat(firstPartNew);

    // Read row content
    exDatabaseSecondPartData[i].map((exDatabaseDataItem: any) => {
      if (isUntil(exDatabaseDataItem.toString())) {
        const untilNewRow = buildNewModelRowUntil(exDatabaseDataItem.toString());

        row = row.concat(untilNewRow);
        return;
      }

      if (isPercent(exDatabaseDataItem.toString())) {
        const percentNewRow = buildNewModelRowPercent(exDatabaseDataItem.toString());

        row = row.concat(percentNewRow);
        return;
      }

      if (isEuro(exDatabaseDataItem.toString())) {
        const euroNewRow = buildNewModelRowEuro(exDatabaseDataItem.toString());

        row = row.concat(euroNewRow);
        return;
      }

      // Else if NULL or other
      row = row.concat([false, 0, RateUnit.None]);
    });

    finalResult.push(row);
  }

  for (let i = 4000; i < finalResult.length; ++i) {
    const item = finalResult[i];

    await prisma.seller.create({
      data: {
        name: item[0],
        logoUrl: item[1],
        top40: item[2],
        topSeller: item[3],
        coupon: item[4],
        categories: {
          create:
            item[5] && item[5].length > 0
              ? item[5].map((item: number) => ({categoryId: item}))
              : undefined,
        },

        isRangeRateIgraal: item[6],
        rateIgraal: item[7],
        unitRateIgraal: item[8],

        isRangeRatePoulpeo: item[9],
        ratePoulpeo: item[10],
        unitRatePoulpeo: item[11],

        isRangeRateFunC: item[12],
        rateFunC: item[13],
        unitRateFunC: item[14],

        isRangeRateAuBonProfit: item[15],
        rateAuBonProfit: item[16],
        unitRateAuBonProfit: item[17],

        isRangeRateFlouzy: item[18],
        rateFlouzy: item[19],
        unitRateFlouzy: item[20],

        isRangeRateCapitalKoala: item[21],
        rateCapitalKoala: item[22],
        unitRateCapitalKoala: item[23],

        isRangeRateEbuyclub: item[24],
        rateEbuyclub: item[25],
        unitRateEbuyclub: item[26],

        isRangeRateWidilo: item[27],
        rateWidilo: item[28],
        unitRateWidilo: item[29],

        isRangeRateJoko: item[30],
        rateJoko: item[31],
        unitRateJoko: item[32],

        isRangeRateBoursorama: item[33],
        rateBoursorama: item[34],
        unitRateBoursorama: item[35],

        isRangeRateEbuyclubCoupon: item[36],
        rateEbuyclubCoupon: item[37],
        unitRateEbuyclubCoupon: item[38],
      },
    });
  }
}

main().catch(console.log).finally();
