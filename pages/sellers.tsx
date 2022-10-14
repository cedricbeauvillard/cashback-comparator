import {Button, Card, createStyles, Group, SimpleGrid} from '@mantine/core';
import {Seller} from '@prisma/client';
import {GetServerSideProps} from 'next';
import Head from 'next/head';
import Link from 'next/link';
import {VFC} from 'react';
import {ItemSellerLetter} from '../components/business/ItemSellerLetter';
import {footerData} from '../components/_static';
import {FooterLinks} from '../components/generic/FooterLinks';
import {SearchHeader} from '../components/generic/SearchHeader';
import {prisma} from '../lib/prisma';

export interface SellerListPageProps {
  alphabeticalSellers: Seller[][];
}

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

const sellers: VFC<SellerListPageProps> = ({alphabeticalSellers}) => {
  const {classes} = useStyles();

  return (
    <div>
      <Head>
        <title>Tous les marchands - MeilleursCashback - Comparez plus de 8000 marchands</title>
        <meta name="description" content="Description" />
        <link rel="icon" href="/logo.webp" />
        <meta
          property="og:title"
          content={
            'Tous les marchands - MeilleursCashback - Comparez les taux de casback de plus de 8000 marchands'
          }
        />
        <meta property="og:type" content="website" />
        {/* <meta property="og:url" content={url} />
        <meta property="og:image" content={'/logo.webp'} />
        <meta property="og:image:alt" content="M" />*/}
        <meta property="og:description" content={'Description'} />
        <meta property="og:site_name" content="MeilleursCashback" />
      </Head>
      <main className="justify-center">
        <SearchHeader></SearchHeader>
        <div className="flex flex-col items-center justify-center">
          <Card className={classes.cardBody} withBorder>
            <h1 style={{zIndex: 0, fontSize: '1.5rem', textAlign: 'center'}}>
              Liste des marchands
            </h1>
            <p>
              Vous trouverez ci-dessous la liste exhaustive des marchands présents sur notre
              comparateur. Si vous recherchez un marchand en particulier, veuillez mentionner son
              nom dans la barre de recherche cidessous.
            </p>
            <SimpleGrid
              className="w-full md:px-16"
              cols={27}
              spacing={6}
              breakpoints={[
                {maxWidth: 1800, cols: 16, spacing: 8},
                {maxWidth: 1000, cols: 10, spacing: 8},
                {maxWidth: 600, cols: 8, spacing: 8},
              ]}
            >
              {[...Array(26)].map((_, i) => {
                const letter = String.fromCharCode('A'.charCodeAt(0) + i);

                return (
                  <Link href={`#${letter}`} scroll={false} key={`letter-${i}`}>
                    <Button size="xs" radius="xs" color={'red'} className="p-0 whitespace-nowrap">
                      {letter}
                    </Button>
                  </Link>
                );
              })}
              <Link href={'#other'} scroll={true} key={`letter-other`}>
                <Button size="xs" radius="xs" color={'red'} className="p-0 whitespace-nowrap">
                  #
                </Button>
              </Link>
            </SimpleGrid>
            <Group className="flex-col flex-1 mt-4">
              {alphabeticalSellers.map((seller, index) => (
                <ItemSellerLetter
                  key={`seller-letter-item-${index}`}
                  sellers={seller}
                  letter={index < 26 ? String.fromCharCode('A'.charCodeAt(0) + index) : 'other'}
                ></ItemSellerLetter>
              ))}
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

export const getServerSideProps: GetServerSideProps<SellerListPageProps> = async () => {
  try {
    const alphabeticalSellers: Seller[][] = [];

    for (let i = 0; i < 26; ++i) {
      const letter = String.fromCharCode('A'.charCodeAt(0) + i);

      const sellers = await prisma.$queryRawUnsafe<Seller[]>(
        `SELECT DISTINCT name, slug FROM Seller WHERE slug IS NOT NULL AND name LIKE '${letter}%'`
      );

      alphabeticalSellers.push(sellers);
    }

    const otherSellers = await prisma.$queryRawUnsafe<Seller[]>(
      `SELECT DISTINCT name, slug
      FROM Seller
      WHERE slug IS NOT NULL
        AND name NOT LIKE 'a%'
        AND name NOT LIKE 'b%'
        AND name NOT LIKE 'c%'
        AND name NOT LIKE 'd%'
        AND name NOT LIKE 'e%'
        AND name NOT LIKE 'f%'
        AND name NOT LIKE 'g%'
        AND name NOT LIKE 'h%'
        AND name NOT LIKE 'i%'
        AND name NOT LIKE 'j%'
        AND name NOT LIKE 'k%'
        AND name NOT LIKE 'l%'
        AND name NOT LIKE 'm%'
        AND name NOT LIKE 'n%'
        AND name NOT LIKE 'o%'
        AND name NOT LIKE 'p%'
        AND name NOT LIKE 'q%'
        AND name NOT LIKE 'r%'
        AND name NOT LIKE 's%'
        AND name NOT LIKE 't%'
        AND name NOT LIKE 'u%'
        AND name NOT LIKE 'v%'
        AND name NOT LIKE 'w%'
        AND name NOT LIKE 'x%'
        AND name NOT LIKE 'y%'
        AND name NOT LIKE 'z%'`
    );

    alphabeticalSellers.push(otherSellers);

    return {
      props: {
        alphabeticalSellers,
      },
    };
  } catch (e) {
    return {notFound: true};
  }
};

export default sellers;
