import {
  Button,
  Card,
  Center,
  Container,
  createStyles,
  Grid,
  Group,
  Select,
  SimpleGrid,
  Table,
  Text,
} from '@mantine/core';
import {Cashbacker, Seller} from '@prisma/client';
import Head from 'next/head';
import Link from 'next/link';
import {FC, useState} from 'react';
import {FooterLinks} from '../generic/FooterLinks';
import {SearchHeader} from '../generic/SearchHeader';
import {ItemCashbackerInfosDesktop} from './ItemCashbackerInfosDesktop';
import {ItemCashbackerInfosMobile} from './ItemCashbackerInfosMobile';
import {ItemTopSeller} from './ItemTopSeller';

import AllSvg from '../svg/AllSvg';
import RankingSvg from '../svg/RankingSvg';
import {footerData} from '../_static';
import {useRouter} from 'next/router';
import SearchSvg from '../svg/SearchSvg';

const useStyles = createStyles((theme) => ({
  mobileTable: {
    marginTop: '1rem',
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },
  desktopTable: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },
}));

export const findManySellerSlug = async (name: string) => {
  const res = await fetch(`/api/seller/findManySellersByName?name=${name}`);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  return data;
};

export interface HomePageProps {
  cashbackers?: Cashbacker[] | null;
  topSellers?: Seller[] | null;
}

const HomePage: FC<HomePageProps> = ({topSellers, cashbackers}) => {
  const {classes} = useStyles();
  const [foundedSellers, setFoundedSellers] = useState<Seller[] | null>([]);
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>MeilleursCashback - Comparez plus de 8000 marchands</title>
        <meta
          name="description"
          content="Accueil - MeilleursCashback - CDiscount Amazon ou encore AliExpress..."
        />
        <link rel="icon" href="/logo.webp" />
        <meta
          property="og:title"
          content={'MeilleursCashback - Comparez les taux de casback de plus de 8000 marchands'}
        />
        <meta property="og:type" content="website" />
        {/* <meta property="og:url" content={url} />
        <meta property="og:image" content={'/logo.webp'} />
        <meta property="og:image:alt" content="M" />*/}
        <meta property="og:description" content={'Description'} />
        <meta property="og:site_name" content="MeilleursCashback" />
      </Head>
      <main className="w-auto h-auto justify-center">
        <SearchHeader></SearchHeader>

        {/* Jumbotron */}
        <Center
          sx={(theme) => ({
            height: '30rem',
            backgroundImage: theme.fn.gradient({from: '#2c56cc', to: '#2c85ef', deg: 180}),
            color: theme.white,
          })}
        >
          <Group className="mx-4 justify-center flex-1 flex-col">
            <Text
              component="span"
              align="center"
              variant="gradient"
              gradient={{from: 'red', to: 'orange', deg: 45}}
              size="xl"
              weight={900}
              className="text-5xl"
              style={{
                fontFamily: 'Montserrat',
                fontWeight: 900,
              }}
            >
              Meilleurs Cashback
            </Text>
            <h3
              className="m-0 p-0 text-white text-2xl"
              style={{
                fontFamily: 'Montserrat',
                fontWeight: 700,
              }}
            >
              Comparez les taux de cashback de plus de 8000 marchands en ligne
            </h3>
            <Select
              size="lg"
              className="w-full sm:w-1/2 mt-4"
              radius={'lg'}
              icon={<SearchSvg width={'1.5rem'}></SearchSvg>}
              placeholder="Indiquer le nom du marchand tels que Amazon, Fnac, Carrefour, Aliexpress…"
              searchable
              rightSection={<></>}
              maxLength={120}
              onSearchChange={async (searchValue: string) => {
                if (searchValue.length <= 0) {
                  return;
                }

                setFoundedSellers(await findManySellerSlug(searchValue));
              }}
              onChange={(value) => {
                router.push(`/seller/meilleur-cashback-${value}`);
              }}
              nothingFound={null}
              data={
                foundedSellers
                  ? foundedSellers.map((seller) => ({
                      value: seller.slug ? seller.slug : 'error',
                      label: seller.name,
                    }))
                  : []
              }
            />
            <Group className="flex-col mt-4 w-full sm:mt-8 sm:w-auto sm:flex-row" spacing={'md'}>
              <Link href="/sellers" passHref>
                <Button
                  size="md"
                  color="red"
                  radius="md"
                  className="w-full sm:w-auto"
                  leftIcon={<AllSvg width={'1rem'}></AllSvg>}
                >
                  Voir la liste complète des marchands
                </Button>
              </Link>
              <Link href="/cashbackers" passHref>
                <Button
                  size="md"
                  color="red"
                  radius="md"
                  className="w-full sm:w-auto"
                  leftIcon={<RankingSvg color="white" width={'1rem'}></RankingSvg>}
                >
                  Classement des sites de cashback
                </Button>
              </Link>
            </Group>
          </Group>
        </Center>

        {/* Grid layout */}
        <Container size={1400} className="my-10">
          <Grid columns={24} gutter="lg">
            <Grid.Col md={12} lg={12} xs={24}>
              {/* Main content / Popular sellers */}
              <Card shadow={'xs'} withBorder className="justify-center">
                <h4 className="m-0">Marchands populaires</h4>
                <Group className="justify-center">
                  <SimpleGrid
                    cols={3}
                    spacing="xs"
                    className="mt-4"
                    breakpoints={[
                      {maxWidth: 980, cols: 3, spacing: 'md'},
                      {maxWidth: 755, cols: 3, spacing: 'sm'},
                      {maxWidth: 600, cols: 2, spacing: 'sm'},
                    ]}
                  >
                    {topSellers?.map((topSeller, i) => (
                      <ItemTopSeller
                        logoUrl={topSeller.slug ? `/sellers/logo-${topSeller.slug}.webp` : ''}
                        name={topSeller.name}
                        pageUrl={`/seller/meilleur-cashback-${topSeller.slug}`}
                        key={`topSellers-${i}`}
                      ></ItemTopSeller>
                    ))}
                  </SimpleGrid>
                  <Link href="/topsellers" passHref>
                    <Button color="red" size="xs" className="m-auto mt-4 self-center">
                      Voir plus
                    </Button>
                  </Link>
                </Group>
              </Card>
            </Grid.Col>
            <Grid.Col md={12} lg={12} xs={24}>
              <Card shadow={'xs'} withBorder>
                <h4 className="m-0">Sites de cashback comparés</h4>
                {/* Mobile table */}
                <SimpleGrid cols={1} spacing="lg" className={classes.mobileTable}>
                  {cashbackers?.map((cashbacker, index) => (
                    <ItemCashbackerInfosMobile
                      key={`cashbacker-${index}`}
                      imageUrl={cashbacker.logoUrl}
                      name={cashbacker.name}
                      bonus={cashbacker.signupBonus}
                      paymentThresold={cashbacker.paymentThreshold ?? 0}
                      paymentMethod={cashbacker.paymentMethod ?? '0'}
                      sponsorshipUrl={cashbacker.sponsorshipUrl}
                    ></ItemCashbackerInfosMobile>
                  ))}
                </SimpleGrid>

                {/* Desktop table */}
                <Table sx={{minWidth: 500}} className={classes.desktopTable}>
                  <thead>
                    <tr>
                      <th>Site</th>
                      <th>Bonus d'inscription</th>
                      <th>Seuil de paiement</th>
                      <th>Mode de paiement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cashbackers?.map((cashbacker, index) => (
                      <ItemCashbackerInfosDesktop
                        key={`cashbacker-${index}`}
                        imageUrl={cashbacker.logoUrl}
                        bonus={cashbacker.signupBonus}
                        paymentThresold={cashbacker.paymentThreshold ?? 0}
                        paymentMethod={cashbacker.paymentMethod ?? '0'}
                        sponsorshipUrl={cashbacker.sponsorshipUrl}
                      ></ItemCashbackerInfosDesktop>
                    ))}
                  </tbody>
                </Table>
              </Card>
            </Grid.Col>
            <Grid.Col md={24} lg={24} xs={24}>
              <Card shadow={'xs'} withBorder className="justify-center">
                <h3
                  className="underline m-0"
                  style={{
                    fontFamily: 'Montserrat',
                    fontWeight: 700,
                  }}
                >
                  A quoi sert le comparateur meilleurcashback.com
                </h3>
                <p
                  style={{
                    fontFamily: 'Montserrat',
                    fontWeight: 700,
                  }}
                >
                  Meilleurcashback est un comparateur qui vous permet de trouver d'un seul coup
                  d'oeil quel est le taux de cashback pratiqué par les meilleurs sites de cashback
                  du marché sur le marchand chez lequel vous envisagez de réaliser votre achat. Vous
                  pourrez alors savoir quel site pratique le meilleur taux, mais également avoir
                  toutes les informations nécessaires pour faire votre choix (note, bonus de
                  bienvenue, notre avis...).
                </p>
                <h3
                  style={{
                    fontFamily: 'Montserrat',
                    fontWeight: 700,
                  }}
                  className="underline m-0"
                >
                  <a href="https://sitescashback.com/">
                    Je veux en savoir plus sur le cashback et son fonctionnement
                  </a>
                </h3>
                <p
                  style={{
                    fontFamily: 'Montserrat',
                    fontWeight: 700,
                  }}
                >
                  Ce comparateur a été conçu en collaboration avec le blog sitescashback.com, blog
                  de reference sur le cashback depuis plus de 10 ans, ce qui lui a valu un passage
                  en expert du cashback dans l'émission TV Capital sur M6 fin 2021. Pour trouver de
                  nombreux articles détaillés sur le cashback et ses différents sites, je vous
                  invite à vous rendre sur sitescashback.com. Si vous souhaitez pour commencer
                  comprendre ce qu'est le cashback et comment ça marche vous pouvez lire{' '}
                  <a
                    className="text-hyperlink"
                    href="https://sitescashback.com/le-cashback-explique/"
                  >
                    cet article.
                  </a>
                </p>
              </Card>
            </Grid.Col>
          </Grid>
        </Container>
      </main>
      <footer>
        <FooterLinks data={footerData}></FooterLinks>
      </footer>
    </div>
  );
};

export default HomePage;
