import Head from 'next/head';
import {VFC} from 'react';
import {footerData} from '../components/business/_static';
import {FooterLinks} from '../components/generic/FooterLinks';
import {SearchHeader} from '../components/generic/SearchHeader';

export interface ContactPageProps {}

const ContactPage: VFC<ContactPageProps> = () => {
  return (
    <div>
      <Head>
        <title>Contact - MeilleursCashback - Comparez plus de 8000 marchands</title>
        <meta name="description" content="Description" />
        <link rel="icon" href="/logo.webp" />
        <meta
          property="og:title"
          content={
            'Contact - MeilleursCashback - Comparez les taux de cashback de plus de 8000 marchands'
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
        <h1 style={{zIndex: 0, fontSize: '1.5rem', textAlign: 'center'}}>
          Page d'accueil comparateur cashback
        </h1>
      </main>
      <footer>
        <footer>
          <FooterLinks data={footerData}></FooterLinks>
        </footer>
      </footer>
    </div>
  );
};

export default ContactPage;
