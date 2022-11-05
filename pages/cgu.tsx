import {Card, createStyles} from '@mantine/core';
import Head from 'next/head';
import {VFC} from 'react';
import {FooterLinks} from '../components/generic/FooterLinks';
import {SearchHeader} from '../components/generic/SearchHeader';
import {footerData} from '../components/_static';

export interface CGUPageProps {}

const useStyles = createStyles((theme) => ({
  // TODO: Generize that to declare only once, clean VIEWS!!! Simplify!!
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

const GCUPage: VFC<CGUPageProps> = () => {
  const {classes} = useStyles();

  return (
    <div>
      <Head>
        <title>
          CGU - MeilleursCashback - Comparez les taux de casback de plus de 8000 marchands
        </title>
        <meta name="description" content="Description" />
        <link rel="icon" href="/logo.webp" />
        <meta
          property="og:title"
          content={
            "Conditions Générales d'Utilisation - MeilleursCashback - Comparez les taux de cashback de plus de 8000 marchands"
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
          <Card className={classes.cardBody} withBorder>
            <h1 className="m-0 mb-8" style={{textAlign: 'center'}}>
              Mentions légales
            </h1>
            <h3 className="m-0">
              Directeur de la publication du blog{' '}
              <a className="text-hyperlink" target="_blank" href="https://meilleurscashback.com">
                https://meilleurscashback.com
              </a>
            </h3>
            <p className="m-0">
              L’ensemble des articles du blog sont rédigés par Cédric BEAUVILLARD – Pour le
              contacter, veuillez utiliser le formulaire de contact disponible sur le Site ou à
              l’adresse mail cedric@sitescashback.com
            </p>
            <h3 className="m-0 mt-4">Raison Sociale de l’Hébergeur:</h3>
            <p className="m-0">
              Ce blog est hébergé par IONOS – 7 PLACE DE LA GARE 57200 Sarreguemines – France Pour
              contacter cet hébergeur, rendez-vous à l’adresse{' '}
              <a className="text-hyperlink" target="_blank" href="https://www.ionos.fr/contact">
                https://www.ionos.fr/contact
              </a>
            </p>
            <h3 className="m-0 mt-4">Propriété intellectuelle :</h3>
            <p className="m-0">
              La structure générale ainsi que les logiciels, textes, images animées ou non, son
              savoir-faire et tous les autres éléments composant le site sont la propriété exclusive
              de meilleurscashback.com. Les logos et marques des sociétés citées sur le blog
              Meilleurscashback.com({' '}
              <a className="text-hyperlink" target="_blank" href="https://meilleurscashback.com">
                https://meilleurscashback.com
              </a>
              ) sont la propriété exclusive de leurs auteurs respectifs.
            </p>
            <h3 className="m-0 mt-4">Droits d’auteur :</h3>
            <p className="m-0">
              Toute représentation totale ou partielle de ce blog par quelle que personne que ce
              soit, sans l’autorisation expresse de Cédric Beauvillard est interdite et
              constituerait une contrefaçon sanctionnée par les articles L. 335-2 et suivants du
              Code de la propriété intellectuelle. L’élaboration de liens hypertextes profonds vers
              le blog Meilleurscashback.com est interdite sans l’accord exprès et préalable de
              l’éditeur du site. Par ailleurs, l’utilisation des informations contenues sur le
              présent blog relève de la seule responsabilité de l’utilisateur. Nous ne pourrions en
              aucun cas, et pour quelque cause que ce soit, en être tenus pour responsables, et ce,
              quelque en soit les conséquences. Nous ne sommes responsables d’aucune erreur ou
              omission sur le présent site.
            </p>
            <h3 className="m-0 mt-4">Avertissement général :</h3>
            <p className="m-0">
              La consultation du blog Meilleurscashback.com est proposée aux internautes à titre
              gratuit et sans aucune garantie de la part de son éditeur. Les informations
              disponibles sur le blog Meilleurscashback.com (qui proviennent de sources extérieures
              ne saurait garantir qu’elles sont exemptes d’erreurs, ni garantir leur complétude,
              leur actualité, leur exhaustivité ou autre. En conséquence, il appartient à
              l’internaute d’utiliser les informations figurant sur le site Internet à ses risques
              et de procéder à toute vérification sous sa responsabilité exclusive.
              Meilleurscashback.com ne serait être tenu responsable de l’interprétation faite par
              les internautes, quelle qu’elle soit, de tous les renseignements, informations et
              conseils proposés sur son blog, et des conséquences pouvant en découler. Les
              propriétaires des sites marchands, de service, sites persos, sites informatiques
              (etc.) consultés à partir du blog Meilleurscashback.com sont seuls responsables du
              respect par eux de l’ensemble des réglementations s’appliquant dans le cadre des
              prestations offertes aux clients finaux, et notamment, des lois et règlements relatifs
              à : <br></br>– La vente à distance<br></br>– La protection du consommateur
              <br></br>– La publicité mensongère ou trompeuse<br></br>– Les prix <br></br>– La
              conformité des produits<br></br>– Toutes les marques citées sont déposées par leurs
              propriétaires respectifs
            </p>
            <h3 className="m-0 mt-4">Utilisation de Cookies :</h3>
            <p className="m-0">
              Meilleurscashback.com vous informe qu’un ou plusieurs cookies (petits fichiers textes)
              peuvent s’installer automatiquement sur le disque dur de votre ordinateur lors de
              votre visite sur le blog. Ces cookies peuvent provenir des partenaires de
              Meilleurscashback.com, mais aussi des système de statistiques de Meilleurscashback.com
              ou de tous autres services proposés sur le blog. Vous avez la possibilité de supprimer
              les cookies installés lors de votre visite sur le blog à l’aide de la barre d’outils
              de votre navigateur. La suppression des cookies devra intervenir une fois votre
              navigation sur le blog terminée. A défaut, vous êtes informé du fait que l’usage du
              blog Meilleurscashback.com, ainsi que les services qui y sont proposés, pourront être
              perturbés, voire empêchés.
            </p>
            <h3 className="m-0 mt-4">Crédits et copyright photos:</h3>
            <p className="m-0">
              Les crédits et copyright des visuels et des photos présents sur le blog
              Meilleurscashback.com (
              <a className="text-hyperlink" target="_blank" href="https://meilleurscashback.com">
                https://meilleurscashback.com
              </a>
              ) sont signalés dans les articles lorsqu’elles proviennent d’un professionnel avec son
              accord, à défaut celles-ci sont la propriétés du site Internet Meilleurscashback.com
              ou proviennent de l’un des sites de photos libres de droit en créative commons suivant
              : Morguefile (http://www.morguefile.com) Photos Libres (http://www.photo-libre.fr)
              Flickr (http://www.flickr.com/creativecommons/)
            </p>
            <h3 className="m-0 mt-4">Parrainage et affiliation:</h3>
            <p className="m-0">
              Le blog Meilleurscashback.com (
              <a className="text-hyperlink" target="_blank" href="https://meilleurscashback.com">
                https://meilleurscashback.com
              </a>
              ) est susceptible de générer des commissions à partir des liens vers les sites de
              cashback présents sur le blog.  
            </p>
          </Card>
        </div>
      </main>
      <footer>
        <FooterLinks data={footerData}></FooterLinks>
      </footer>
    </div>
  );
};

export default GCUPage;
