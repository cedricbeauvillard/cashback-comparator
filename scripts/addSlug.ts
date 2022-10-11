import {PrismaClient} from '@prisma/client';
import {getSlugFromName} from '../lib/_url';
import {firstPublishBatch} from './_static';

function readNameArray(): string[] {
  const slugs: string[] = [];

  for (let i = 0; i < firstPublishBatch.length; ++i) {
    const slug = getSlugFromName(firstPublishBatch[i]);

    if (!slug) {
      continue;
    }

    slugs.push(slug);
  }

  return slugs;
}

async function main() {
  const prisma = new PrismaClient();

  const slugs = readNameArray();

  for (let i = 0; i < firstPublishBatch.length; ++i) {
    await prisma.seller.updateMany({
      where: {
        name: firstPublishBatch[i],
      },
      data: {
        slug: slugs[i],
      },
    });
  }
}

main().catch(console.log).finally();
