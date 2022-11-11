import {Button, Card, createStyles, Group, SimpleGrid, Table} from '@mantine/core';
import {Cashbacker, RateUnit, Seller} from '@prisma/client';
import {GetServerSideProps} from 'next';
import Head from 'next/head';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useState, VFC} from 'react';
import {ItemCashbackerDesktop} from '../../components/business/ItemCashbackerDesktop';
import {ItemCashbackerMobile} from '../../components/business/ItemCashbackerMobile';
import {SellerSearchBar} from '../../components/business/SellerSearchBar';
import {emptyRateData, RateData} from '../../components/business/types';
import {FooterLinks} from '../../components/generic/FooterLinks';
import {SearchHeader} from '../../components/generic/SearchHeader';
import AllSvg from '../../components/svg/AllSvg';
import {footerData} from '../../components/_static';
import {prisma} from '../../lib/prisma';

/*
 * Template page for sellers
 */

const useStyles = createStyles((theme) => ({
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

  mobileTable: {
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

export interface SellerPageProps {
  seller: Seller;
  cashbackers: Cashbacker[] | null;
}

/*
 * Find column in seller that match current treated cashbacker
 */
const getCashbackerRateData = (seller: Seller | null, cashbackerName: string): RateData => {
  if (!seller) {
    return emptyRateData;
  }

  // Remove space and get only first 3 chars
  cashbackerName = cashbackerName.replace(' ', '').substring(0, 3);

  const keys = Object.keys(seller) as Array<keyof typeof seller>;

  let rateIndex = 0;

  for (let i = 0; i < keys.length; ++i) {
    if (keys[i].toLowerCase().includes(cashbackerName.toLowerCase())) {
      rateIndex = i;
      break;
    }
  }

  let isRangeRate: boolean = false;
  const possibleRangeRate = seller[keys[rateIndex]];

  if (possibleRangeRate != null && typeof possibleRangeRate === 'boolean') {
    isRangeRate = possibleRangeRate;
  }

  let rate: number = 0;
  const possibleRate = seller[keys[rateIndex + 1]];

  if (possibleRate != null && typeof possibleRate === 'number') {
    rate = possibleRate;
  }

  let unit: RateUnit = RateUnit.None;

  const possibleUnit = seller[keys[rateIndex + 2]];

  if (possibleUnit && typeof possibleUnit === 'string') {
    unit = RateUnit[possibleUnit as keyof typeof RateUnit];
  }

  return {
    isRangeRate,
    rate,
    unit,
  };
};

const SellerPage: VFC<SellerPageProps> = ({seller, cashbackers}) => {
  const {classes} = useStyles();
  const [foundedSellers, setFoundedSellers] = useState<Seller[] | null>([]);
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Meilleur cashback {seller.name} comparés - Meilleurscashback.com</title>
        <link rel="icon" href="/logo.webp" />
        <meta
          name="description"
          content={`Découvrez quel site de cashback vous propose le meilleur taux pour vos achats sur le site marchand ${seller.name}.`}
        />
        <link
          rel="canonical"
          href={`https://meilleurscashback.com/seller/meilleur-cashback-${seller.slug}`}
        />
        <meta
          property="og:title"
          content={`Meilleurs cashback ${seller.name} comparés - MeilleursCashback.com`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content={`Découvrez quel site de cashback vous propose le meilleur taux pour vos achats sur le site marchand ${seller.name}.`}
        />
        <meta property="og:site_name" content="MeilleursCashback" />
        <meta
          property="og:url"
          content={`https://meilleurscashback.com/seller/meilleur-cashback-${seller.slug}`}
        ></meta>
        <meta property="og:image" content="/logo.webp"></meta>
      </Head>
      <main>
        <SearchHeader></SearchHeader>
        <div className="flex items-center justify-center">
          <Card className={classes.cardBody} withBorder>
            <h1
              className="m-0"
              style={{
                fontFamily: 'Montserrat',
                fontWeight: 900,
              }}
            >
              MEILLEUR CASHBACK {seller.name.toUpperCase()}
            </h1>
            <p
              className="mx-0 mt-4"
              style={{
                fontFamily: 'Montserrat',
                fontWeight: 700,
              }}
            >
              Vous vous apprêtez à faire un achat sur le site marchand de <b>{seller.name}</b> et
              vous cherchez quel site de cashback vous propose le meilleur taux, et bien notre
              comparatif ci-dessous est fait pour vous. Vous pourrez retrouver le taux de cashback
              pratiqué par
              <a
                target="_blank"
                className="text-hyperlink"
                href="https://sitescashback.com/classement-des-meilleurs-sites-de-cashback/"
              >
                {' '}
                chacun des meilleurs sites de notre classement sitescashback
              </a>
              , mais également toutes les informations nécessaires pour faire votre choix (note,
              bonus de bienvenue, notre avis...).<br></br>Pour gagner encore plus, vous pouvez
              utiliser les <b>codes promos</b> disponibles sur le site de cashback, sans oublier le{' '}
              <b>bonus de bienvenue</b> à votre inscription sur le site de cashback. Pour les sites
              permettant de cumuler plusieurs types de cashback tels que le
              <a
                target="_blank"
                className="text-hyperlink"
                href="https://sitescashback.com/acheter-des-bons-dachat-en-reduction-le-bon-plan-ebuyclub/"
              >
                {' '}
                cashback sur bon d'achat{' '}
              </a>
              et le
              <a
                target="_blank"
                className="text-hyperlink"
                href="https://sitescashback.com/acheter-des-bons-dachat-en-reduction-le-bon-plan-ebuyclub/"
              >
                {' '}
                cashback en magasin{' '}
              </a>
              , le taux cashback indiqué dans le comparateur est le taux total.
            </p>
            <h3
              className="mt-8"
              style={{
                fontFamily: 'Montserrat',
                fontWeight: 700,
                fontSize: '1.4rem',
              }}
            >
              TAUX DE CASHBACK POUR LE SITE {seller.name.toUpperCase()}
            </h3>
            {/* Mobile table */}
            <SimpleGrid cols={1} spacing="lg" className={classes.mobileTable}>
              {cashbackers?.map((cashbacker, index) => (
                <ItemCashbackerMobile
                  displayRate={true}
                  key={`cashbacker-${index}`}
                  cashbacker={cashbacker}
                  rateData={getCashbackerRateData(seller, cashbacker.name)}
                ></ItemCashbackerMobile>
              ))}
            </SimpleGrid>
            {/* Desktop table */}
            <Table sx={{minWidth: 500}} className={classes.desktopTable}>
              <thead>
                <tr>
                  <th>Nom du site</th>
                  <th>Note (/5)</th>
                  <th>Classement</th>
                  <th>Bonus</th>
                  <th>Taux de cashback</th>
                  <th>Plus d'infos</th>
                </tr>
              </thead>
              <tbody>
                {cashbackers?.map((cashbacker, index) => (
                  <ItemCashbackerDesktop
                    displayRate={true}
                    key={`cashbacker-${index}`}
                    cashbacker={cashbacker}
                    rateData={getCashbackerRateData(seller, cashbacker.name)}
                  ></ItemCashbackerDesktop>
                ))}
              </tbody>
            </Table>
            <p className="mt-4 md:mt-0">
              Même si nous nous efforçons de mettre à jour le plus fréquemment possible les taux de
              cashback présents dans nos comparatifs, nous vous conseillons de vérifier leur
              validité sur les sites concernés. Une erreur dans ces taux ne pourrait engager ni
              MeilleursCashback ni le site de cashback en question.
            </p>
            <SimpleGrid
              className="my-4"
              cols={2}
              spacing="lg"
              breakpoints={[
                {maxWidth: 980, cols: 2, spacing: 'md'},
                {maxWidth: 755, cols: 2, spacing: 'sm'},
                {maxWidth: 600, cols: 1, spacing: 'sm'},
              ]}
            >
              <div>
                <Group className="w-full">
                  {seller?.topSeller ? (
                    <Link href={'/topsellers'}>
                      <Button variant="outline" className="w-full" color="green">
                        CE SITE FAIT PARTIE DU TOP MARCHAND (voir la liste)
                      </Button>
                    </Link>
                  ) : (
                    <Link href={'/topsellers'}>
                      <Button variant="outline" className="w-full" color="red">
                        CE SITE NE FAIT PAS PARTIE DU TOP MARCHAND (voir la liste)
                      </Button>
                    </Link>
                  )}
                </Group>
              </div>
              <div>
                <Group spacing={0} className="my-2 w-full sm:m-0">
                  <h3 className="m-0">Chercher un marchand</h3>
                  <SellerSearchBar radius="sm"></SellerSearchBar>
                  {/*    <Select
                    className="w-full mt-2"
                    icon={<SearchSvg width={'1rem'}></SearchSvg>}
                    placeholder="Indiquer le nom du marchand tels que Amazon, Fnac, Carrefour, Aliexpress…"
                    searchable
                    rightSection={<></>}
                    maxLength={120}
                    onSearchChange={async (searchValue: string) => {
                      if (searchValue.length <= 0) {
                        return;
                      }

                      setFoundedSellers(await findManySeller(searchValue));
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
                  /> */}
                </Group>
                <Link key="SellerList" href="/sellers" className="w-full bg-white">
                  <Button className="w-full mt-4 mb-8" leftIcon={<AllSvg width={'1rem'}></AllSvg>}>
                    Voir la liste complète des marchands
                  </Button>
                </Link>
              </div>
            </SimpleGrid>
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

export const getServerSideProps: GetServerSideProps<SellerPageProps, {pid: string}> = async (
  context
) => {
  // Avoid soft 404
  if (Object.keys(context.query).length > 1) {
    return {notFound: true};
  }

  if (!context.params || !context.params.pid) {
    return {notFound: true};
  }

  try {
    let slug: string | undefined = context.params.pid.toString().slice(18);

    if (!slug) {
      return {
        notFound: true,
      };
    }

    const seller = await prisma.seller.findFirst({
      where: {slug: slug},
    });

    if (!seller || !seller.name) {
      return {
        notFound: true,
      };
    }

    const cashbackers = await prisma.cashbacker.findMany({
      orderBy: {rank: 'asc'},
    });

    return {
      props: {
        seller,
        cashbackers,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export default SellerPage;
