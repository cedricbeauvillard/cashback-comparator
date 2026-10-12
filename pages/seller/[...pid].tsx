import {Card, createStyles, SimpleGrid, Table} from '@mantine/core';
import {Cashbacker, RateUnit, Seller} from '@prisma/client';
import {GetServerSideProps} from 'next';
import Head from 'next/head';
import Link from 'next/link';
import {VFC} from 'react';
import {ItemCashbackerDesktop} from '../../components/business/ItemCashbackerDesktop';
import {ItemCashbackerMobile} from '../../components/business/ItemCashbackerMobile';
import {SellerSearchBar} from '../../components/business/SellerSearchBar';
import {emptyRateData, RateData} from '../../components/business/types';
import {FooterLinks} from '../../components/generic/FooterLinks';
import {SearchHeader} from '../../components/generic/SearchHeader';
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

const getCashbackerRateData = (
  seller: Seller | null,
  cashbackerName: string
): RateData => {
  if (!seller) return emptyRateData;

  const platform = cashbackerName.trim().toLowerCase();

  const rates: Record<string, RateData> = {
    ebuyclub: {
      isRangeRate: seller.isRangeRateEbuyclub ?? false,
      rate: seller.rateEbuyclub ?? 0,
      unit: seller.unitRateEbuyclub ?? RateUnit.None,
    },
    igraal: {
      isRangeRate: seller.isRangeRateIgraal ?? false,
      rate: seller.rateIgraal ?? 0,
      unit: seller.unitRateIgraal ?? RateUnit.None,
    },
    poulpeo: {
      isRangeRate: seller.isRangeRatePoulpeo ?? false,
      rate: seller.ratePoulpeo ?? 0,
      unit: seller.unitRatePoulpeo ?? RateUnit.None,
    },
    widilo: {
      isRangeRate: seller.isRangeRateWidilo ?? false,
      rate: seller.rateWidilo ?? 0,
      unit: seller.unitRateWidilo ?? RateUnit.None,
    },
    joko: {
      isRangeRate: seller.isRangeRateJoko ?? false,
      rate: seller.rateJoko ?? 0,
      unit: seller.unitRateJoko ?? RateUnit.None,
    },
    'boursorama the corner': {
      isRangeRate: seller.isRangeRateBoursorama ?? false,
      rate: seller.rateBoursorama ?? 0,
      unit: seller.unitRateBoursorama ?? RateUnit.None,
    },
    'capital koala': {
      isRangeRate: seller.isRangeRateCapitalKoala ?? false,
      rate: seller.rateCapitalKoala ?? 0,
      unit: seller.unitRateCapitalKoala ?? RateUnit.None,
    },
    flouzy: {
      isRangeRate: seller.isRangeRateFlouzy ?? false,
      rate: seller.rateFlouzy ?? 0,
      unit: seller.unitRateFlouzy ?? RateUnit.None,
    },
  };

  return rates[platform] ?? emptyRateData;
};
const SellerPage: VFC<SellerPageProps> = ({seller, cashbackers}) => {
  const {classes} = useStyles();

  return (
    <div>
      <Head>
        <title>Cashback {seller.name} : comparatif des offres | MeilleursCashback</title>
        <link rel="icon" href="/logo.webp" />
        <meta
          name="description"
          content={`Comparez les taux de cashback ${seller.name}, les bonus de bienvenue et les avis des plateformes sur MeilleursCashback.`}
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
          content={`Comparez les taux de cashback ${seller.name}, les bonus de bienvenue et les avis des plateformes sur MeilleursCashback.`}
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
            <h1 style={{fontFamily: 'Montserrat', fontWeight: 800, marginBottom: 12}}>
              Cashback {seller.name} : comparez les meilleures offres
            </h1>
            <p style={{fontSize: '1.05rem', lineHeight: 1.7}}>
              Comparez les taux de cashback chez {seller.name}, les notes et classements des plateformes,
              ainsi que leurs éventuels bonus de bienvenue. Choisissez librement la plateforme qui vous convient.
            </p>
            <h2 style={{fontFamily: 'Montserrat', fontSize: '1.4rem', marginTop: 30}}>
              Comparatif des offres de cashback {seller.name}
            </h2>
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
                  <th>Voir l&apos;offre</th>
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
            <section style={{marginTop: 36, lineHeight: 1.8}}>
              <h2>Comment obtenir du cashback chez {seller.name} ?</h2>
              <ol style={{paddingLeft: 24}}>
                <li><strong>Comparez les offres</strong> des différentes plateformes pour vos achats chez {seller.name}.</li>
                <li><strong>Choisissez votre plateforme.</strong> Si vous n’y êtes pas encore inscrit,
                  utilisez notre lien de parrainage via le bouton « Voir l’offre » pour bénéficier,
                  sous réserve des conditions applicables, d’un éventuel bonus de bienvenue.</li>
                <li><strong>Activez votre cashback</strong> sur la plateforme choisie avant votre achat.</li>
                <li><strong>Finalisez votre commande</strong> en respectant les conditions de l’offre.</li>
              </ol>
            </section>
            {seller.topSeller && (
              <section style={{marginTop: 32, lineHeight: 1.8}}>
                <h2>Questions fréquentes sur le cashback {seller.name}</h2>
                <details><summary>Comment fonctionne le cashback chez {seller.name} ?</summary>
                  <p>Choisissez une plateforme proposant une offre pour {seller.name}, activez le cashback depuis celle-ci,
                  puis réalisez votre achat en respectant les conditions annoncées.</p></details>
                <details><summary>Peut-on cumuler cashback et code promotionnel chez {seller.name} ?</summary>
                  <p>Le cumul dépend de la plateforme, du code et des conditions de l’offre. Vérifiez-les avant de commander.</p></details>
                <details><summary>Quand le cashback {seller.name} est-il versé ?</summary>
                  <p>Les délais de suivi, de validation et de paiement varient selon la plateforme et les conditions de l’offre.</p></details>
              </section>
            )}
            <div style={{marginTop: 30}}>
              {seller.topSeller && <p><Link href="/topsellers">Découvrir les autres Top marchands</Link></p>}
              <h3>Rechercher un autre marchand</h3>
              <SellerSearchBar radius="sm" />
              <p><Link href="/sellers">Voir tous les marchands</Link></p>
            </div>
          </Card>
        </div>
      </main>
      <footer><FooterLinks data={footerData} /></footer>
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
