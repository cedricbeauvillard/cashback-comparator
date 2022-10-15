import {Button, Card, createStyles, Group, SimpleGrid} from '@mantine/core';
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

const useStyles = createStyles((theme) => ({
  // TODO: Generize that to declare only once
  cardBody: {
    marginLeft: '1rem',
    marginRight: '1rem',
    marginTop: '1rem',
    marginBottom: '0.5rem',

    [theme.fn.largerThan('xs')]: {
      maxWidth: 1210,
      borderRadius: '0.6rem',
      padding: '1.5rem',
      backgroundColor: 'white',
      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    },
  },
}));

const TopSellersPage: VFC<TopSellersPageProps> = ({initialTopSellers}) => {
  const [topSellers, setTopSellers] = useState<Seller[]>(initialTopSellers);
  const {classes} = useStyles();

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
      <main>
        <SearchHeader></SearchHeader>
        <div className="flex flex-col items-center justify-center">
          <Card className={classes.cardBody} withBorder>
            <h1 style={{zIndex: 0, fontSize: '1.5rem', textAlign: 'left'}}>Les top marchands</h1>
            <p>
              Nous avons répertorié pour vous une liste des principaux marchands (web ou magasin)
              qui sont les plus consultés sur notre comparateur.
            </p>
            <Group className="flex flex-col items-center justify-center">
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
                    name={topSeller.name}
                    pageUrl={`/seller/meilleur-cashback-${topSeller.slug}`}
                    key={`topSellers-${i}`}
                  ></ItemTopSeller>
                ))}
              </SimpleGrid>
              <Button
                className="mt-2"
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
      `SELECT DISTINCT id,name, slug FROM Seller WHERE (topSeller = 1 OR top40=1 OR coupon=1) ORDER BY name ASC LIMIT 20;`
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
