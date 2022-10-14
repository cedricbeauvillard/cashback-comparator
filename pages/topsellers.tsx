import {Button, Card, Group, SimpleGrid} from '@mantine/core';
import {Seller} from '@prisma/client';
import {GetServerSideProps} from 'next';
import Head from 'next/head';
import {useState, VFC} from 'react';
import {ItemTopSeller} from '../components/business/ItemTopSeller';
import {footerData} from '../components/_static';
import {FooterLinks} from '../components/generic/FooterLinks';
import {SearchHeader} from '../components/generic/SearchHeader';
import {prisma} from '../lib/prisma';

export interface TopSellersPageProps {
  initialTopSellers: Seller[];
}

const fetchTopSellers = async (currentTopSellerAmount: number, fetchAmount: number) => {
  const res = await fetch(`./api/seller/topSeller?limit=${currentTopSellerAmount + fetchAmount}`);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  return data;
};

const TopSellersPage: VFC<TopSellersPageProps> = ({initialTopSellers}) => {
  const [topSellers, setTopSellers] = useState<Seller[]>(initialTopSellers);

  return (
    <div>
      <Head>
        <title>Top marchands - MeilleursCashback - Comparez plus de 8000 marchands</title>
        <meta name="description" content="Description" />
        <link rel="icon" href="/logo.webp" />
        <meta
          property="og:title"
          content={
            'Top marchands - MeilleursCashback - Comparez les taux de cashback plus de 8000 marchands'
          }
        />
        <meta property="og:type" content="website" />
        {/* <meta property="og:url" content={url} />
        <meta property="og:image" content={'/logo.webp'} />
        <meta property="og:image:alt" content="M" />*/}
        <meta property="og:description" content={'Description'} />
        <meta property="og:site_name" content="MeilleursCashback" />
      </Head>
      <main className="w-auto h-auto bg-red-600 justify-center">
        <SearchHeader></SearchHeader>
        <div className="flex flex-col items-center justify-center">
          <Card
            className="mx-4 mb-2 mt-4 sm:w-2/3 sm:mt-4 sm:bg-white sm:rounded-md sm:shadow-lg sm:p-4"
            withBorder
          >
            <h1 style={{zIndex: 0, fontSize: '1.5rem', textAlign: 'left'}}>Les top marchands</h1>
            <p>
              Nous avons répertorié pour vous une liste des principaux marchands (web ou magasin)
              qui sont les plus consultés sur notre comparateur.
            </p>
            <Group className="items-center justify-center">
              <SimpleGrid
                cols={4}
                spacing="lg"
                breakpoints={[
                  {maxWidth: 980, cols: 4, spacing: 'md'},
                  {maxWidth: 755, cols: 3, spacing: 'sm'},
                  {maxWidth: 600, cols: 2, spacing: 'sm'},
                ]}
              >
                {topSellers?.map((topSeller, i) => (
                  <ItemTopSeller
                    logoUrl={topSeller.logoUrl ?? null}
                    name={topSeller.name}
                    pageUrl={topSeller.logoUrl ?? 'None'}
                    key={`topSellers-${i}`}
                  ></ItemTopSeller>
                ))}
              </SimpleGrid>
              <Button
                color="red"
                onClick={async () => {
                  setTopSellers(await fetchTopSellers(topSellers.length, 20));
                }}
              >
                Charger plus
              </Button>
            </Group>
          </Card>
        </div>
      </main>
      <footer>
        <footer>
          <FooterLinks data={footerData}></FooterLinks>
        </footer>
      </footer>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<TopSellersPageProps> = async () => {
  try {
    const topSellers = await prisma.$queryRawUnsafe<Seller[]>(
      // DO NOT pass in or accept user input here
      // TODO: Check and remove ORDER BY RAND() before
      `SELECT DISTINCT id,name,logoUrl FROM Seller WHERE topSeller = 1 OR top40=1 OR coupon=1 LIMIT 20;`
    );

    return {
      props: {
        initialTopSellers: topSellers,
      },
    };
  } catch (e) {
    return {notFound: true};
  }
};

export default TopSellersPage;
