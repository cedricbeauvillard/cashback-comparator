import {Button, Card, createStyles, List, SimpleGrid, Table} from '@mantine/core';
import {Cashbacker} from '@prisma/client';
import {GetServerSideProps} from 'next';
import Head from 'next/head';
import {VFC} from 'react';
import {ItemCashbackerDesktop} from '../components/business/ItemCashbackerDesktop';
import {ItemCashbackerMobile} from '../components/business/ItemCashbackerMobile';
import {footerData} from '../components/_static';
import {FooterLinks} from '../components/generic/FooterLinks';
import {SearchHeader} from '../components/generic/SearchHeader';
import {prisma} from '../lib/prisma';
import PlusSvg from '../components/svg/PlusSvg';
import ArrowSvg from '../components/svg/ArrowSvg';
import Link from 'next/link';

/*
 * Cashbackers ranking
 */

const useStyles = createStyles((theme) => ({
  mobileTable: {
    marginTop: '2rem',
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },
  desktopTable: {
    marginTop: '2rem',
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },
}));

export interface CashbackerPageProps {
  cashbackers: Cashbacker[] | null;
}

const CashbackerPage: VFC<CashbackerPageProps> = ({cashbackers}) => {
  const {classes} = useStyles();

  return (
    <div>
      <Head>
        <title>Sites de cashback - MeilleursCashback - Comparez plus de 8000 marchands</title>
        <meta name="description" content="Description" />
        <link rel="icon" href="/logo.webp" />
        <meta
          property="og:title"
          content={
            'Sites de cashback - MeilleursCashback - Comparez les taux de casback de plus de 8000 marchands'
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
        <div className="flex items-center justify-center">
          <Card
            className="mx-4 mb-2 mt-4 sm:w-2/3 sm:mt-4 sm:bg-white sm:rounded-md sm:shadow-lg sm:p-4"
            withBorder
          >
            <h1 className="m-0">Classement des meilleurs sites de cashback</h1>
            <p className="m-0">
              Le cashback, c’est le meilleur plan pour gagner de l’argent en économisant sur ses
              achats de la décennie. Vous voulez acheter des vêtements à décathlon, réserver une
              nuit d’hotel sur booking ou encore acheter une enceinte chez fnac ou darty, et bien
              grâce au cashback vous obtiendrez un remboursement de 1 à 10 % de vos achats sans
              effort, juste en passant par le site de cashback avant de vous rendre sur le site du
              marchand. Cela fonctionne également en boutique / magasin chez une centaine
              d’enseignes telles que Carrefour, Primark ou encore Ikea. Si jamais vous voulez en
              savoir plus sur le fonctionnement du cashback nous vous invitons à lire
              <a className="text-hyperlink" href="https://sitescashback.com/le-cashback-explique/">
                {' '}
                cet article.
                <br />
              </a>
              Nous avons réalisé pour vous un comparatif des meilleurs sites de cashback et avons
              retenu les plus sérieux pour notre comparateur de taux, que nous vous présentons sous
              forme de classement. Dans le tableau ci-dessous nous avons mentionné pour chaque site
              le bonus de bienvenue (<a className="font-bold">inscriptions gratuites</a>) dont vous
              bénéficierez lors de votre inscription par notre lien de parrainage, ainsi que le
              seuil et mode de paiement pour récupérer votre cagnotte. Si l’on prend l’exemple d’
              <a
                className="text-hyperlink"
                href="https://www.ebuyclub.com/inscription?h=1&parrain=contact934&affilie=comparateur-sites-cb"
              >
                ebuyclub
              </a>
              , après votre inscription vous aurez directement 7 € dans votre cagnotte donc il ne
              vous reste plus qu’à collecter 3 € de cashback pour demander un paiement de 10 € sur
              votre compte bancaire ou par bon cadeau. Pour faire partie du classement et assurer de
              leur sérieux nous avons déjà obtenu à minima 3 paiements sur chacun d’entre eux.
              Toutefois les sites qui ont les meilleurs notes sont les plus sérieux car ils existent
              depuis de nombreuses années et comptent plusieurs millions de membres.
            </p>
            <div className="flex items-center justify-center my-10">
              <Link href={`#siteopinion`}>
                <Button
                  className="sm:w-1/4 m-auto"
                  rightIcon={<ArrowSvg width={'1rem'}></ArrowSvg>}
                >
                  Voir nos avis plus bas
                </Button>
              </Link>
            </div>
            {/* Mobile table */}
            <SimpleGrid cols={1} spacing="lg" className={classes.mobileTable}>
              {cashbackers?.map((cashbacker, index) => (
                <ItemCashbackerMobile
                  displayRate={false}
                  key={`cashbacker-${index}`}
                  cashbacker={cashbacker}
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
                  <th>Plus d'infos</th>
                </tr>
              </thead>
              <tbody>
                {cashbackers?.map((cashbacker, index) => (
                  <ItemCashbackerDesktop
                    displayRate={false}
                    key={`cashbacker-${index}`}
                    cashbacker={cashbacker}
                  ></ItemCashbackerDesktop>
                ))}
              </tbody>
            </Table>
            <p className="mt-8">
              Voici une présentation plus en détail de chacun des sites. Si vous souhaitez avoir de
              plus amples renseignements ou consulter des preuves de paiement, nous vous invitons à
              lire l’article complet du
              <a
                className="text-hyperlink"
                href="https://sitescashback.com/classement-des-meilleurs-sites-de-cashback/"
              >
                {' '}
                blog expert sitescashback.
              </a>
            </p>

            {/* EbuyClub */}
            <div className="mt-6 flex flex-col sm:mt-4" id={`siteopinion`}>
              <div className="w-full">
                <h4 className="underline m-0">Notre avis sur le site Ebuyclub</h4>
              </div>
              <p>
                Ebuyclub est un des sites pionniers du cashback depuis 1999, qui dispose d’une très
                bonne offre de sites marchands (+ de 2000) et propose des taux très compétitifs. De
                plus ebuyclub n’a cessé d’inventer au fil du temps en étant le premier à proposer du
                cashback sur les achats en magasin (en prenant une photo du ticket de caisse) et
                même sur bon d’achat.
                <br />
                <br />
                Les points forts d’ebuyclub:
              </p>
              <List
                spacing="md"
                size="md"
                center
                className="mb-8"
                icon={<PlusSvg width={'1rem'}></PlusSvg>}
              >
                <List.Item>
                  Propose du cashback sur bons d’achats sur +100 enseignes (Ikea, Decathlon,
                  Primark, Airbnb, Carrefour, Intermarché…)
                </List.Item>
                <List.Item>
                  Un seuil de paiement très bas à 10 €, ce qui permet d’encaisser sa cagnotte avec
                  seulement 3€ de cashback grâce au bonus de bienvenue de 7 €. En plus, possibilité
                  d’avoir 2% à 4% de cashback en plus lors de votre paiement si vous choisissez
                  d’être réglé en chèque cadeau amazon (valable 10 ans) ou en carte cadeau Ebuyclub
                  (pour acheter n’importe quel bon d’achat parmi la centaine d’enseignes présente
                  sur le site)
                </List.Item>
                <List.Item>
                  Des offres canons cashbackissimes (20% sur de grandes enseignes) pour votre
                  premier cashback ebuyclub
                </List.Item>
              </List>
              <Button variant="outline" className="w-full h-12 sm:w-1/3" style={{margin: 'auto'}}>
                Je m'inscris à Ebuyclub avec
                <br />
                un bonus de bienvenue de 7 €
              </Button>
            </div>

            {/* Igraal */}
            <div className="mt-6 flex flex-col sm:mt-10">
              <div className="w-full">
                <h4 className="underline m-0">Notre avis sur le site Igraal</h4>
              </div>
              <p>
                Igraal est le site de référence dans l’univers du cashback, leader depuis plus de 20
                ans. Détenu par le groupe de média M6 et par un grand groupe marketing allemand,
                c’est un site très sérieux qui offre des conditions très compétitives.
                <br />
                <br />
                Les points forts d’Igraal :
              </p>
              <List
                spacing="md"
                size="md"
                center
                className="mb-8"
                icon={<PlusSvg width={'1rem'}></PlusSvg>}
              >
                <List.Item>
                  Le plus gros bonus de bienvenue avec 10 € dans votre cagnotte à votre inscription
                  par notre lien de parrainage ambassadeur
                </List.Item>
                <List.Item>
                  Un taux boosté chaque jour sur une grande enseigne (par exemple 20% sur lapeyre
                  aujourd’hui, 10% sur L’oreal cette semaine…) et chaque mois des journées canons
                  avec des taux bétons sur une dizaine d’enseignes
                </List.Item>
                <List.Item>
                  Un service client de qualité, qui n’hésite pas à faire des gestes si le cashback
                  n’a pas marché
                </List.Item>
              </List>
              <Button variant="outline" className="w-full h-12 sm:w-1/3" style={{margin: 'auto'}}>
                Je m'inscris à Igraal avec
                <br />
                un bonus de bienvenue de 10 €
              </Button>
            </div>

            {/* Poulpeo */}
            <div className="mt-6 flex flex-col sm:mt-10">
              <div className="w-full">
                <h4 className="underline m-0">Notre avis sur le site Poulpeo</h4>
              </div>
              <p>
                Poulpeo est l’un des premiers sites de cashback du net, présent en France mais aussi
                en Belgique. Son offre n’est pas la plus développée mais ses taux sont vraiment
                compétitifs.
                <br />
                <br />
                Les points forts de Poulpeo :
              </p>
              <List
                spacing="md"
                size="md"
                center
                className="mb-8"
                icon={<PlusSvg width={'1rem'}></PlusSvg>}
              >
                <List.Item>
                  Un statut Poulpeo + à partir du 4ème cashback qui offre des avantages
                  supplémentaires
                </List.Item>
                <List.Item>
                  Une offre de cashback automatique sur vos achats magasins dans certaines enseignes
                  (Starbucks, Subway, Burger King…)
                </List.Item>
                <List.Item>
                  Une offre de cashback automatique sur vos achats magasins dans certaines enseignes
                  (Starbucks, Subway, Burger King…)
                </List.Item>
              </List>
              <Button variant="outline" className="w-full h-12 sm:w-1/3" style={{margin: 'auto'}}>
                Je m'inscris à Poulpeo avec
                <br />
                un bonus de bienvenue de 10 €
              </Button>
            </div>

            {/* Widilo */}
            <div className="mt-6 flex flex-col sm:mt-10">
              <div className="w-full">
                <h4 className="underline m-0">Notre avis sur le site Widilo</h4>
              </div>
              <p>
                Widilo est arrivé plus tard sur le marché français (2019) mais derrière Widilo il y
                a AFILIZA, une société pionnière du codes promo en France, Espagne, Royaume-Uni et
                en Belgique depuis 2012. Widilo a donc directement débarqué avec une offre très
                sérieuse et compétitive.
                <br />
                <br />
                Les points forts de Widilo
              </p>
              <List
                spacing="md"
                size="md"
                center
                className="mb-8"
                icon={<PlusSvg width={'1rem'}></PlusSvg>}
              >
                <List.Item>Les taux de cashback les plus élevés du marché</List.Item>
                <List.Item>
                  Le lien widilove qui vous permet d’envoyer un lien à vos proches et d’obtenir le
                  cashback lié à l’achat (idéal pour les cadeaux de noël avec les grands parents)
                </List.Item>
                <List.Item>
                  Le lien widilove qui vous permet d’envoyer un lien à vos proches et d’obtenir le
                  cashback lié à l’achat (idéal pour les cadeaux de noël avec les grands parents)
                </List.Item>
              </List>
              <Button variant="outline" className="w-full h-12 sm:w-1/3" style={{margin: 'auto'}}>
                Je m'inscris à Widilo avec
                <br />
                un bonus de bienvenue de 3 €
              </Button>
            </div>

            {/* Joko */}
            <div className="mt-6 flex flex-col sm:mt-10">
              <div className="w-full">
                <h4 className="underline m-0">Notre avis sur le site Joko</h4>
              </div>
              <p>
                Joko est une appli qui a été créé au début des années 2020 et qui concentre
                l’ensemble des offres cashback sur une même appli avec une volonté d’extrême
                simplicité. Vous renseignez vos coordonnées bancaires et ainsi Joko va récupérer
                automatiquement le cashback grâce à la lecture de votre relevé de compte en banque.
                <br />
                <br />
                Les points forts de Joko :
              </p>
              <List
                spacing="md"
                size="md"
                center
                className="mb-8"
                icon={<PlusSvg width={'1rem'}></PlusSvg>}
              >
                <List.Item>
                  Le seul qui permet d’avoir du cashback sur vos courses dans toutes les enseignes
                  (Leclerc, Aldi, Carrefour, Intermarché, Lidl, Super U, Cora, Franprix, Cora…)
                </List.Item>
                <List.Item>Des marchands exclusifs tels que manomano</List.Item>
              </List>
              <Button variant="outline" className="w-full h-12 sm:w-1/3" style={{margin: 'auto'}}>
                Je m'inscris à Joko avec
                <br />
                un bonus de bienvenue de 3 €
              </Button>
            </div>

            {/* Capital Koala */}
            <div className="mt-6 flex flex-col sm:mt-10">
              <div className="w-full">
                <h4 className="underline m-0">Notre avis sur le site Capital Koala</h4>
              </div>
              <p>
                Capital Koala est un site vraiment original puisque le cashback que vous réalisez ne
                vous profite pas directement mais vient faire fructifier les livrets d’épargne de
                vos enfants (ou d’enfants de votre famille ou amis si vous n’avez pas de bambins).
                <br />
                <br />
                Les points forts de Capital Koala :
              </p>
              <List
                spacing="md"
                size="md"
                center
                className="mb-8"
                icon={<PlusSvg width={'1rem'}></PlusSvg>}
              >
                <List.Item>
                  Un positionnement « famille » permettant d’avoir accès à des commerçants exclusifs
                  que vous ne trouverez pas autre part tels que Maisons du Monde, Vertbaudet ou
                  Becquet
                </List.Item>
                <List.Item>
                  Une offre de cashback magasin directement via notre carte bancaire mais aussi bons
                  d’achats
                </List.Item>
              </List>
              <Button variant="outline" className="w-full h-12 sm:w-1/3" style={{margin: 'auto'}}>
                Je m'inscris à Capital Koala avec
                <br />
                un bonus de bienvenue de 3 €
              </Button>
            </div>

            {/* Capital Boursorama */}
            <div className="mt-6 flex flex-col sm:mt-10">
              <div className="w-full">
                <h4 className="underline m-0">Notre avis sur le site The Corner de Boursorama</h4>
              </div>
              <p>
                Au-delà d’être la banque en ligne la plus complète et la moins chère du marché,
                Boursorama propose également une offre de cashback de très bon niveau.
                <br />
                <br />
                Les points forts de The corner - Boursorama :
              </p>
              <List
                spacing="md"
                size="md"
                center
                className="mb-8"
                icon={<PlusSvg width={'1rem'}></PlusSvg>}
              >
                <List.Item>Du cashback sur l’achat de chèques cadeaux amazon</List.Item>
                <List.Item>
                  Des taux supérieurs aux autres sur les bons d’achat des grandes enseignes
                </List.Item>
                <List.Item>
                  Un parcours d’achat très simple car on peut débiter directement son compte
                  boursorama pour le paiement des bons d’achat
                </List.Item>
              </List>
              <Button variant="outline" className="w-full h-12 sm:w-1/3" style={{margin: 'auto'}}>
                Je m'inscris à Boursorama Banque avec
                <br />
                le code CEBE1272 pour avoir 80 € de bonus
              </Button>
            </div>
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

export const getServerSideProps: GetServerSideProps<CashbackerPageProps> = async () => {
  try {
    const cashbackers = await prisma.cashbacker.findMany({
      orderBy: {rank: 'asc'},
    });

    return {
      props: {
        cashbackers: cashbackers,
      },
    };
  } catch (e) {
    return {notFound: true};
  }
};

export default CashbackerPage;
