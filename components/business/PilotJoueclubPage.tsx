import {Card, createStyles} from '@mantine/core';
import Head from 'next/head';
import {VFC} from 'react';
import {SearchHeader} from '../generic/SearchHeader';
import {FooterLinks} from '../generic/FooterLinks';
import {footerData} from '../_static';

export type PilotOffer = {
  id: number;
  type: 'WEB' | 'GIFT_CARD' | 'AUTOMATIC';
  rate: number;
  unit: 'EURO' | 'PERCENT' | 'NONE';
  isRangeRate: boolean;
  description: string | null;
  cashbacker: {
    id: number; name: string; logoUrl: string; rank: number;
    score: number; signupBonus: number; sponsorshipUrl: string; reviewsUrl: string;
  };
};

type Props = {name: string; slug: string; offers: PilotOffer[]};
const useStyles = createStyles((theme) => ({
  content: {maxWidth: 1180, width: '100%', margin: '1rem', padding: '1.5rem', borderRadius: 16,
    [theme.fn.smallerThan('sm')]: {padding: '1rem', margin: '0.5rem'}},
  columns: {display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 16,
    [theme.fn.smallerThan('sm')]: {gridTemplateColumns: '1fr'}},
}));
const formatRate = (offer: PilotOffer) =>
  `${offer.isRangeRate ? 'Jusqu’à ' : ''}${offer.rate.toLocaleString('fr-FR')} ${offer.unit === 'PERCENT' ? '%' : '€'}`;

const PilotJoueclubPage: VFC<Props> = ({name, slug, offers}) => {
  const {classes} = useStyles();
  const active = offers.filter((o) => o.rate > 0 && o.unit !== 'NONE');
  const groups: Array<{type: PilotOffer['type']; title: string; explanation: string}> = [
    {type: 'WEB', title: 'Cashback sur les achats en ligne', explanation: 'Activez le cashback sur la plateforme avant de commander.'},
    {type: 'GIFT_CARD', title: 'Cashback sur les bons d’achat', explanation: 'Vérifiez les conditions d’utilisation du bon avant de l’acheter.'},
    {type: 'AUTOMATIC', title: 'Cashback automatique', explanation: 'Vérifiez les modalités d’activation et les conditions propres à la plateforme.'},
  ];
  const byType = (type: PilotOffer['type']) => active.filter((o) => o.type === type)
    .sort((a, b) => a.unit === b.unit ? b.rate - a.rate || a.cashbacker.rank - b.cashbacker.rank : a.unit === 'PERCENT' ? -1 : 1);
  const web = byType('WEB');
  const gifts = byType('GIFT_CARD');
  const canonical = `https://meilleurscashback.com/seller/meilleur-cashback-${encodeURIComponent(slug)}`;
  const renderOffer = (o: PilotOffer) => (
    <div key={o.id} style={{border: '1px solid #e2e8f0', borderRadius: 14, padding: 18, marginTop: 12, background: '#fff'}}>
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16}}>
        <div>
          <strong style={{fontSize: 18}}>{o.cashbacker.name}</strong>
          {o.cashbacker.signupBonus > 0 && <div style={{display: 'inline-block', marginTop: 7, padding: '6px 10px', borderRadius: 8, background: '#fff7ed', border: '1px solid #fed7aa', color: '#9a3412', fontSize: 13, fontWeight: 800}}>+ {o.cashbacker.signupBonus} € de bienvenue*</div>}
          <div style={{display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 9}}>
            <span style={{display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 9px', borderRadius: 7, background: '#eff6ff', color: '#1e40af', fontSize: 13, fontWeight: 800}}>🏅 N° {o.cashbacker.rank} au classement</span>
            <span style={{display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 9px', borderRadius: 7, background: '#fffbeb', color: '#92400e', fontSize: 13, fontWeight: 800}}>★ {o.cashbacker.score}/5</span>
          </div>
        </div>
        <strong style={{fontSize: 27, color: '#0f766e'}}>{formatRate(o)}</strong>
        <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
          <a href={o.cashbacker.sponsorshipUrl} target="_blank" rel="noopener noreferrer sponsored"
            style={{background: '#2563eb', color: '#fff', padding: '11px 15px', borderRadius: 9, textAlign: 'center', textDecoration: 'none', fontWeight: 700}}>Profiter du cashback</a>
          <a href={o.cashbacker.reviewsUrl} target="_blank" rel="noopener noreferrer" style={{textAlign: 'center'}}>Lire notre avis</a>
        </div>
      </div>
      {o.description && <p style={{fontSize: 13, color: '#475569', marginBottom: 0, whiteSpace: 'pre-line'}}>Conditions indiquées : {o.description}</p>}
    </div>
  );
  return <div>
    <Head>
      <title>Cashback {name} : comparez les offres | MeilleursCashback</title>
      <meta name="description" content={`Comparez le cashback ${name} sur les achats en ligne et les bons d’achat. Découvrez les taux et les conditions des plateformes.`} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={`Cashback ${name} : comparatif des offres`} />
      <meta property="og:url" content={canonical} />
    </Head>
    <main>
      <SearchHeader />
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Card withBorder className={classes.content}>
          <p style={{color: '#64748b', fontSize: 13}}>Comparateur de cashback / {name}</p>
          <h1 style={{fontSize: 'clamp(1.7rem, 3vw, 2.5rem)', marginTop: 8}}>Cashback {name} : comparez les offres</h1>
          <p>Comparez les offres de cashback web et de bons d’achat chez {name}. Les taux sont indicatifs et soumis aux conditions des plateformes.</p>
          <div className={classes.columns} style={{margin: '22px 0'}}>
            <div style={{background: '#eff6ff', borderRadius: 14, padding: 20}}>
              <strong>Meilleur cashback web affiché</strong>
              <div style={{fontSize: 30, fontWeight: 800, marginTop: 10}}>{web[0] ? formatRate(web[0]) : 'Aucune offre'}</div>
              <div>{web.length ? web.filter((o) => o.rate === web[0].rate && o.unit === web[0].unit).map((o) => o.cashbacker.name).join(' et ') : 'Aucun taux positif renseigné'}</div>
            </div>
            <div style={{background: '#f0fdf4', borderRadius: 14, padding: 20}}>
              <strong>Meilleur cashback sur bon d’achat</strong>
              <div style={{fontSize: 30, fontWeight: 800, marginTop: 10}}>{gifts[0] ? formatRate(gifts[0]) : 'Aucune offre'}</div>
              <div>{gifts[0]?.cashbacker.name ?? 'Aucun taux positif renseigné'}</div>
            </div>
          </div>
          {groups.map((group) => {
            const items = byType(group.type);
            if (!items.length) return null;
            return <section key={group.type} style={{marginTop: 30}}>
              <h2 style={{fontSize: 23}}>{group.title}</h2>
              <p style={{color: '#475569'}}>{group.explanation}</p>
              {items.map(renderOffer)}
            </section>;
          })}
          <section style={{marginTop: 36, lineHeight: 1.7}}>
            <h2>Présentation de {name}</h2>
            {slug.normalize('NFC').toLowerCase() === 'jouéclub' ? <p>JouéClub est une enseigne française spécialisée dans les jeux et jouets : jeux de société, jeux de construction, poupées, figurines et jeux éducatifs. Les achats peuvent être effectués en ligne ou en magasin selon les modalités proposées.</p> : <p>Retrouvez et comparez les offres de cashback disponibles chez {name}, selon les plateformes et les conditions indiquées pour chaque offre.</p>}
            <h2>Questions fréquentes sur le cashback {name}</h2>
            <details><summary>Peut-on cumuler cashback web et bon d’achat ?</summary><p>Le cumul dépend des conditions de chaque offre et ne doit pas être considéré comme acquis.</p></details>
            <details><summary>Le taux est-il identique pour tous les clients ?</summary><p>Non. Certaines offres distinguent les nouveaux clients des clients existants. Consultez les conditions de chaque plateforme.</p></details>
            <p style={{fontSize: 13, color: '#64748b'}}>* Bonus de bienvenue réservés aux personnes éligibles. Vérifiez les taux, exclusions et conditions avant votre achat. Les offres en euros et en pourcentage ne sont pas directement comparables.</p>
          </section>
        </Card>
      </div>
    </main>
    <footer><FooterLinks data={footerData} /></footer>
  </div>;
};
export default PilotJoueclubPage;
