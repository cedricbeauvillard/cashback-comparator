import {PrismaClient, RateUnit} from '@prisma/client';
import {exDatabaseSecondPartData, firstPartData} from './_static';

function shuffle(array: any) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

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

  let finalResult = [];

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

  finalResult = shuffle(finalResult);

  for (let i = 0; i < finalResult.length; ++i) {
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

        /*
        Supprimé le 17/10
        isRangeRateFunC: item[12],
        rateFunC: item[13],
        unitRateFunC: item[14], */

        /*        
        Supprimé le 17/10
        isRangeRateAuBonProfit: item[15],
        rateAuBonProfit: item[16],
        unitRateAuBonProfit: item[17], */

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
