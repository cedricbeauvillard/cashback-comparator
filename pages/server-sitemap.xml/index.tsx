import {getServerSideSitemap} from 'next-sitemap';
import {GetServerSideProps} from 'next';
import {Seller} from '@prisma/client';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}api/seller/findEverySeller?limit=8000`
  );
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  const newsSitemaps = data.map((item: Seller) => ({
    loc: `${process.env.NEXT_PUBLIC_DOMAIN_URL}seller/meilleur-cashback-${item.slug}`,
    lastmod: new Date().toISOString(),
  }));

  const fields = [...newsSitemaps];

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default function Sitemap() {}
