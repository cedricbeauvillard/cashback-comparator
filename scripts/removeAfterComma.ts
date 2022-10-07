import fs from 'fs';

const readline = require('readline');

function getPosition(string: string, subString: string, index: number): number {
  return string.split(subString, index).join(subString).length;
}

async function processLineByLine() {
  const finalRes = [];
  const fileStream = fs.createReadStream('scripts/tmpExtractName.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    const newLine = line.substring(0, getPosition(line, ',', 6));

    finalRes.push(newLine);
    // Each line in input.txt will be successively available here as `line`.
    console.log(`Line from file: ${line}`);
  }

  let writer = fs.createWriteStream('scripts/tmpExtractName.txt');

  finalRes.forEach(function (v) {
    writer.write(v + '\n');
  });

  writer.end();
}

async function main() {
  await processLineByLine();
}

main().catch(console.log).finally();
