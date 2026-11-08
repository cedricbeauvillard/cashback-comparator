import {Card, createStyles, SimpleGrid} from '@mantine/core';
import {Cashbacker, RateUnit, Seller} from '@prisma/client';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {VFC} from 'react';
import {SellerSearchBar} from './SellerSearchBar';
import {FooterLinks} from '../generic/FooterLinks';
import {SearchHeader} from '../generic/SearchHeader';
import {footerData} from '../_static';

const useStyles = createStyles((theme) => ({
  content: {
    margin: '1rem',
    padding: '1.5rem',
    maxWidth: 1180,
    width: '100%',
    borderRadius: 16,
    [theme.fn.smallerThan('sm')]: {padding: '1rem', margin: '0.5rem'},
  },
  highlights: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: 16,
    margin: '20px 0 28px',
    [theme.fn.smallerThan('sm')]: {gridTemplateColumns: '1fr'},
  },
  offerRow: {
    display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto auto', alignItems: 'center', gap: 16,
    [theme.fn.smallerThan('sm')]: {gridTemplateColumns: '1fr', gap: 12},
  },
  offer: {
    border: '1px solid #e2e8f0',
    borderRadius: 14,
    padding: 18,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    background: '#fff',
  },
}));

type Props = {seller: Seller; cashbackers: Cashbacker[] | null; relatedSellers?: {id: number; name: string; slug: string | null}[]; categoryNames?: string[]};
type Offer = {cashbacker: Cashbacker; rate: number; unit: RateUnit; range: boolean};

const formatRate = (rate: number, unit: RateUnit, range = false) =>
  `${range ? 'Jusqu’à ' : ''}${rate.toLocaleString('fr-FR')} ${unit === RateUnit.Percent ? '%' : '€'}`;

const getRate = (seller: Seller, name: string) => {
  switch (name.trim().toLowerCase()) {
    case 'igraal': return {rate: seller.rateIgraal, unit: seller.unitRateIgraal, range: seller.isRangeRateIgraal};
    case 'ebuyclub': return {rate: seller.rateEbuyclub, unit: seller.unitRateEbuyclub, range: seller.isRangeRateEbuyclub};
    case 'poulpeo': return {rate: seller.ratePoulpeo, unit: seller.unitRatePoulpeo, range: seller.isRangeRatePoulpeo};
    case 'widilo': return {rate: seller.rateWidilo, unit: seller.unitRateWidilo, range: seller.isRangeRateWidilo};
    case 'joko': return {rate: seller.rateJoko, unit: seller.unitRateJoko, range: seller.isRangeRateJoko};
    case 'boursorama the corner': return {rate: seller.rateBoursorama, unit: seller.unitRateBoursorama, range: seller.isRangeRateBoursorama};
    case 'capital koala': return {rate: seller.rateCapitalKoala, unit: seller.unitRateCapitalKoala, range: seller.isRangeRateCapitalKoala};
    case 'flouzy': return {rate: seller.rateFlouzy, unit: seller.unitRateFlouzy, range: seller.isRangeRateFlouzy};
    default: return null;
  }
};

const OfferCard: VFC<{offer: Offer; featured?: boolean}> = ({offer, featured}) => {
  const {cashbacker, rate, unit, range} = offer;
  const {classes} = useStyles();
  return (
    <div style={{border: featured ? '2px solid #93c5fd' : '1px solid #e2e8f0', borderRadius: 14, padding: 16, background: featured ? '#f8fbff' : '#fff'}}>
      <div className={classes.offerRow}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <Image src={cashbacker.logoUrl} alt={cashbacker.name} width={92} height={54} objectFit="contain" />
          <div>
            <strong style={{fontSize: 17}}>{cashbacker.name}</strong>
            {featured && <div style={{fontSize: 12, color: '#1d4ed8', fontWeight: 700}}>Meilleur taux web affiché</div>}
            {cashbacker.signupBonus > 0 && <div style={{display: 'inline-block', marginTop: 7, padding: '6px 10px', borderRadius: 8, background: '#fff7ed', border: '1px solid #fed7aa', color: '#9a3412', fontSize: 13, fontWeight: 800}}>+ {cashbacker.signupBonus} € de bienvenue*</div>}
            <div style={{display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', marginTop: 9}}>
              <span style={{display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 9px', borderRadius: 7, background: '#eff6ff', color: '#1e40af', fontSize: 13, fontWeight: 800}}>🏅 N° {cashbacker.rank} au classement</span>
              <span style={{display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 9px', borderRadius: 7, background: '#fffbeb', color: '#92400e', fontSize: 13, fontWeight: 800}}>★ {cashbacker.score}/5</span>
            </div>
          </div>
        </div>
        <div style={{textAlign: 'center', minWidth: 105}}>
          <strong style={{fontSize: 26, color: '#0f766e'}}>{formatRate(rate, unit, range)}</strong>
          <div style={{fontSize: 12, color: '#64748b'}}>Cashback web</div>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 8, minWidth: 165}}>
          <a href={cashbacker.sponsorshipUrl} target="_blank" rel="noopener noreferrer sponsored" style={{background: '#2563eb', color: '#fff', padding: '11px 14px', borderRadius: 9, textAlign: 'center', fontWeight: 700, textDecoration: 'none'}}>Profiter de l’offre</a>
          <a href={cashbacker.reviewsUrl} target="_blank" rel="noopener noreferrer" style={{color: '#1d4ed8', textAlign: 'center', fontWeight: 600}}>Lire notre avis</a>
        </div>
      </div>
    </div>
  );
};

const SellerPage: VFC<Props> = ({seller, cashbackers, relatedSellers = [], categoryNames = []}) => {
  const {classes} = useStyles();
  const offers: Offer[] = (cashbackers ?? []).flatMap((cashbacker) => {
    const data = getRate(seller, cashbacker.name);
    if (!data || !data.rate || data.rate <= 0 || !data.unit || data.unit === RateUnit.None) return [];
    return [{cashbacker, rate: data.rate, unit: data.unit, range: !!data.range}];
  }).sort((a, b) => {
    if (a.unit !== b.unit) return a.unit === RateUnit.Percent ? -1 : 1;
    return b.rate - a.rate || a.cashbacker.rank - b.cashbacker.rank;
  });
  const unavailableCashbackers = (cashbackers ?? []).filter((cashbacker) => {
    const data = getRate(seller, cashbacker.name);
    return !data || !data.rate || data.rate <= 0 || !data.unit || data.unit === RateUnit.None;
  }).sort((a, b) => a.rank - b.rank);
  const couponRate = seller.rateEbuyclubCoupon ?? 0;
  const couponUnit = seller.unitRateEbuyclubCoupon;
  const hasCoupon = couponRate > 0 && couponUnit != null && couponUnit !== RateUnit.None;
  const couponCashbacker = (cashbackers ?? []).find((c) => c.name.trim().toLowerCase() === 'ebuyclub');
  const bestWeb = offers[0];
  const canonical = `https://meilleurscashback.com/seller/meilleur-cashback-${encodeURIComponent(seller.slug ?? '')}`;

  const bestPercent = offers.find((offer) => offer.unit === RateUnit.Percent);
  const seoRate = bestPercent ? formatRate(bestPercent.rate, bestPercent.unit, bestPercent.range) : null;
  const seoTitle = seoRate ? `Cashback ${seller.name} : ${seoRate} et bonus | MeilleursCashback` : `Cashback ${seller.name} : comparer les offres | MeilleursCashback`;
  const seoDescription = seoRate ? `Comparez les offres de cashback ${seller.name} : ${seoRate} sur ${bestPercent?.cashbacker.name}, bonus et bons d’achat. Conditions à vérifier.` : `Comparez les offres de cashback ${seller.name}, les bons d’achat et les plateformes référencées.`;
  const breadcrumbJsonLd = {'@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    {'@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://meilleurscashback.com/'},
    {'@type': 'ListItem', position: 2, name: 'Marchands', item: 'https://meilleurscashback.com/sellers'},
    {'@type': 'ListItem', position: 3, name: `Cashback ${seller.name}`, item: canonical},
  ]};
  return (
    <div>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumbJsonLd)}} />
        <meta property="og:title" content={`Cashback ${seller.name} : comparatif des offres`} />
        <meta property="og:description" content={`Comparez les taux de cashback ${seller.name} en ligne et sur les bons d’achat.`} />
        <meta property="og:url" content={canonical} />
      </Head>
      <main>
        <SearchHeader />
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Card withBorder className={classes.content}>
            <p style={{color: '#64748b', fontSize: 13, marginBottom: 8}}>Comparateur de cashback / {seller.name}</p>
            <h1 style={{fontSize: 'clamp(1.7rem, 3vw, 2.5rem)', fontWeight: 800, lineHeight: 1.2, margin: '0 0 12px'}}>Cashback {seller.name} : comparez les offres</h1>
            <p style={{fontSize: 16, color: '#475569', lineHeight: 1.7}}>Découvrez les taux de cashback disponibles pour vos achats chez {seller.name}. Comparez les achats en ligne et les bons d’achat pour choisir l’offre adaptée.</p>
            <div className={classes.highlights}>
              <div style={{borderRadius: 14, padding: 22, background: '#eff6ff', border: '1px solid #bfdbfe'}}>
                <div style={{fontWeight: 700, color: '#1e40af'}}>Meilleur cashback en ligne affiché</div>
                <div style={{fontSize: 32, fontWeight: 800, margin: '8px 0'}}>{bestWeb ? formatRate(bestWeb.rate, bestWeb.unit, bestWeb.range) : 'Aucune offre'}</div>
                <div>{bestWeb ? `Sur ${bestWeb.cashbacker.name}` : 'Pas de taux disponible actuellement'}</div>
                {bestWeb && <div style={{fontSize: 13, color: '#475569', marginTop: 7}}>🏅 N° {bestWeb.cashbacker.rank} au classement · ★ {bestWeb.cashbacker.score}/5</div>}
                {bestWeb && bestWeb.cashbacker.signupBonus > 0 && <div style={{display: 'inline-block', marginTop: 12, padding: '8px 12px', borderRadius: 9, background: '#fff7ed', border: '1px solid #fdba74', color: '#9a3412', fontWeight: 800}}>+ {bestWeb.cashbacker.signupBonus} € de bienvenue*</div>}
                <a href={bestWeb ? bestWeb.cashbacker.sponsorshipUrl : "#cashback-en-ligne"} target={bestWeb ? "_blank" : undefined} rel="noopener noreferrer sponsored" style={{display: 'inline-block', marginTop: 10, color: '#1d4ed8', fontWeight: 700}}>Profiter du meilleur taux</a>
              </div>
              <div style={{borderRadius: 14, padding: 22, background: '#f0fdf4', border: '1px solid #bbf7d0'}}>
                <div style={{fontWeight: 700, color: '#166534'}}>Cashback sur bon d’achat eBuyClub</div>
                <div style={{fontSize: 32, fontWeight: 800, margin: '8px 0'}}>{hasCoupon && couponUnit ? formatRate(couponRate, couponUnit, !!seller.isRangeRateEbuyclubCoupon) : 'Non renseigné'}</div>
                <div>{hasCoupon ? 'Offre distincte du cashback web' : 'Aucune offre de bon d’achat renseignée'}</div>
                {hasCoupon && couponCashbacker && couponCashbacker.signupBonus > 0 && <div style={{display: 'inline-block', marginTop: 12, padding: '8px 12px', borderRadius: 9, background: '#fff7ed', border: '1px solid #fdba74', color: '#9a3412', fontWeight: 800}}>+ {couponCashbacker.signupBonus} € de bienvenue*</div>}
                {hasCoupon && <a href={couponCashbacker ? couponCashbacker.sponsorshipUrl : "#bons-achat"} target={couponCashbacker ? "_blank" : undefined} rel="noopener noreferrer sponsored" style={{display: 'inline-block', marginTop: 10, color: '#166534', fontWeight: 700}}>Découvrir les bons d’achat</a>}
              </div>
            </div>

            <section id="cashback-en-ligne">
              <h2 style={{fontSize: 23, marginBottom: 8}}>Cashback {seller.name} sur les achats en ligne</h2>
              <p style={{color: '#475569'}}>Les offres sont classées par taux affiché, en privilégiant les pourcentages. Les bonus d’inscription sont indiqués séparément et soumis aux conditions de chaque plateforme.</p>
              {offers.length === 0 && <div style={{background: '#fff7ed', border: '1px solid #fed7aa', padding: 18, borderRadius: 12, marginBottom: 16}}><strong>Aucune offre de cashback web actuellement renseignée pour {seller.name}.</strong><p style={{marginBottom: 0}}>Consultez les autres plateformes comparées ci-dessous ou recherchez un autre marchand. Les offres peuvent évoluer.</p></div>}
              <SimpleGrid cols={1} spacing="md">
                {offers.map((offer, index) => <OfferCard key={offer.cashbacker.id} offer={offer} featured={index === 0} />)}
              </SimpleGrid>
            </section>

            {bestPercent && <section style={{marginTop: 30, padding: 20, border: '1px solid #e2e8f0', borderRadius: 14, background: '#f8fafc'}}>
              <h2 style={{fontSize: 22, marginTop: 0}}>Combien pouvez-vous économiser chez {seller.name} ?</h2>
              <p style={{color: '#475569'}}>Exemples indicatifs au taux de {formatRate(bestPercent.rate, bestPercent.unit, bestPercent.range)} chez {bestPercent.cashbacker.name}, sous réserve des conditions.</p>
              <div style={{overflowX: 'auto'}}><table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left'}}>
                <thead><tr><th style={{padding: 10, borderBottom: '1px solid #cbd5e1'}}>Montant de l’achat</th><th style={{padding: 10, borderBottom: '1px solid #cbd5e1'}}>Cashback théorique</th></tr></thead>
                <tbody>{[50, 100, 200].map((amount) => <tr key={amount}><td style={{padding: 10, borderBottom: '1px solid #e2e8f0'}}>{amount} €</td><td style={{padding: 10, borderBottom: '1px solid #e2e8f0', fontWeight: 700, color: '#0f766e'}}>{(amount * bestPercent.rate / 100).toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'})}</td></tr>)}</tbody>
              </table></div>
              <p style={{fontSize: 12, color: '#64748b'}}>Montants non garantis : exclusions possibles. Un taux « jusqu’à » est un maximum et les bonus d’inscription sont exclus de ce calcul.</p>
            </section>}

            {unavailableCashbackers.length > 0 && <section style={{marginTop: 26}}>
              <details style={{border: '1px solid #e2e8f0', borderRadius: 12, padding: '15px 18px', background: '#f8fafc'}} open={offers.length === 0}>
                <summary style={{cursor: 'pointer', fontWeight: 700, color: '#334155'}}>Autres sites de cashback comparés ({unavailableCashbackers.length}) — aucune offre web renseignée</summary>
                <p style={{fontSize: 13, color: '#64748b'}}>Ces plateformes figurent dans notre comparateur, mais aucun taux de cashback web positif n’est enregistré pour ce marchand. Cela ne garantit pas l’absence d’offres sur leurs sites.</p>
                <div style={{display: 'grid', gap: 10}}>
                  {unavailableCashbackers.map((cashbacker) => <div key={cashbacker.id} style={{display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', flexWrap: 'wrap', padding: '10px 0', borderTop: '1px solid #e2e8f0'}}>
                    <div><strong>{cashbacker.name}</strong><div style={{fontSize: 13, color: '#64748b'}}>N° {cashbacker.rank} au classement · ★ {cashbacker.score}/5</div></div>
                    <div style={{display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap'}}><span style={{color: '#64748b', fontSize: 13}}>Aucun taux web renseigné</span><a href={cashbacker.reviewsUrl} target="_blank" rel="noopener noreferrer" style={{fontSize: 13, color: '#1d4ed8', fontWeight: 600}}>Lire notre avis</a></div>
                  </div>)}
                </div>
              </details>
            </section>}

            {hasCoupon && couponUnit && (
              <section id="bons-achat" style={{marginTop: 36}}>
                <h2 style={{fontSize: 23}}>Cashback {seller.name} sur les bons d’achat</h2>
                <div className={classes.offer}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap'}}>
                    <div><strong style={{fontSize: 19}}>Bon d’achat via eBuyClub</strong><p style={{margin: '6px 0', color: '#475569'}}>Achetez un bon éligible sur eBuyClub, puis utilisez-le selon les conditions indiquées.</p></div>
                    <strong style={{fontSize: 29, color: '#0f766e'}}>{formatRate(couponRate, couponUnit, !!seller.isRangeRateEbuyclubCoupon)}</strong>
                  </div>
                  <p style={{margin: 0}}>Vérifiez la disponibilité du bon Jouéclub, sa durée de validité et son utilisation en ligne ou en magasin avant de payer. Le cumul avec un cashback web n’est pas garanti.</p>
                  {couponCashbacker && <a href={couponCashbacker.sponsorshipUrl} target="_blank" rel="noopener noreferrer sponsored" style={{alignSelf: 'flex-start', padding: '12px 18px', borderRadius: 8, background: '#2563eb', color: '#fff', fontWeight: 700, textDecoration: 'none'}}>Découvrir les bons d’achat sur eBuyClub</a>}
                </div>
              </section>
            )}

            <section style={{marginTop: 38, lineHeight: 1.7}}>
              <h2>Comment obtenir du cashback chez {seller.name} ?</h2>
              <ol style={{paddingLeft: 24}}>
                <li>Comparez les taux proposés par les différentes plateformes.</li>
                <li>Choisissez entre cashback sur achat en ligne et cashback sur bon d’achat, selon votre achat.</li>
                <li>Vérifiez les conditions de l’offre, puis activez le cashback avant de commander.</li>
                <li>Finalisez votre achat en respectant les exclusions et conditions de validation.</li>
              </ol>
              <h2>Questions fréquentes sur le cashback {seller.name}</h2>
              <details style={{marginBottom: 12}}><summary>Quel est le meilleur cashback {seller.name} affiché ?</summary><p>{bestWeb ? `Le taux web le plus élevé affiché est ${formatRate(bestWeb.rate, bestWeb.unit, bestWeb.range)} chez ${bestWeb.cashbacker.name}. Vérifiez les conditions avant de commander.` : 'Aucun taux web positif n’est actuellement renseigné.'}</p></details>
              <details style={{marginBottom: 12}}><summary>Existe-t-il des bons d’achat {seller.name} avec cashback ?</summary><p>{hasCoupon && couponUnit ? `Notre comparateur référence ${formatRate(couponRate, couponUnit, !!seller.isRangeRateEbuyclubCoupon)} sur les bons d’achat eBuyClub. Vérifiez leur disponibilité.` : 'Aucune offre de bon d’achat avec cashback n’est actuellement renseignée.'}</p></details>
              <details style={{marginBottom: 12}}><summary>Quelle différence entre cashback web et bon d’achat ?</summary><p>Le cashback web est associé à une commande effectuée après activation sur une plateforme. Le cashback sur bon d’achat est lié à l’achat d’un bon éligible, dont les conditions d’utilisation peuvent différer.</p></details>
              <details style={{marginBottom: 12}}><summary>Peut-on cumuler les deux offres ?</summary><p>Le cumul dépend des conditions de chaque plateforme et du marchand. Il ne faut pas le considérer comme acquis.</p></details>
              <details><summary>Les bonus de bienvenue sont-ils automatiques ?</summary><p>Non. Les bonus éventuels sont soumis aux conditions d’inscription et de validation propres à chaque plateforme.</p></details>
              <p style={{fontSize: 13, color: '#64748b', marginTop: 24}}>* Bonus de bienvenue réservés aux personnes éligibles, soumis aux conditions d’inscription et de validation des plateformes. Les taux et conditions peuvent évoluer : vérifiez-les sur la plateforme avant tout achat.</p>
            </section>
            <section style={{marginTop: 32, padding: 20, border: '1px solid #e2e8f0', borderRadius: 14}}>
              <h2 style={{marginTop: 0}}>Comparer les offres de cashback {seller.name}</h2>
              <p style={{lineHeight: 1.7, color: '#475569'}}>
                {categoryNames.length > 0 ? `${seller.name} figure dans ${categoryNames.length === 1 ? 'la catégorie' : 'les catégories'} ${categoryNames.join(', ')} de notre comparateur. ` : ''}
                {offers.length > 0 ? `${offers.length} ${offers.length === 1 ? 'offre de cashback web est renseignée' : 'offres de cashback web sont renseignées'} pour ce marchand. ` : 'Aucun taux de cashback web positif n’est actuellement renseigné pour ce marchand. '}
                {bestWeb ? `Le meilleur taux web affiché est ${formatRate(bestWeb.rate, bestWeb.unit, bestWeb.range)} chez ${bestWeb.cashbacker.name}. ` : ''}
                {hasCoupon && couponUnit ? `Une offre sur bon d’achat est également renseignée chez eBuyClub à ${formatRate(couponRate, couponUnit, !!seller.isRangeRateEbuyclubCoupon)}. ` : ''}
                Vérifiez toujours les conditions d’éligibilité avant votre achat.
              </p>
            </section>
            {relatedSellers.length > 0 && <section style={{marginTop: 30}}>
              <h2>Comparer avec des marchands similaires</h2>
              <p style={{color: '#475569'}}>Ces marchands sont référencés dans au moins une catégorie commune avec {seller.name}.</p>
              <ul style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, padding: 0, listStyle: 'none'}}>
                {relatedSellers.filter((item) => item.slug).map((item) => <li key={item.id} style={{border: '1px solid #e2e8f0', borderRadius: 10, padding: 14}}>
                  <Link href={`/seller/meilleur-cashback-${encodeURIComponent(item.slug ?? '')}`}>Cashback {item.name}</Link>
                </li>)}
              </ul>
            </section>}
            <div style={{marginTop: 30}}>
              <h3>Rechercher un autre marchand</h3>
              <SellerSearchBar radius="sm" />
              <p style={{marginTop: 14}}><Link href="/sellers">Voir tous les marchands</Link></p>
            </div>
          </Card>
        </div>
      </main>
      <footer><FooterLinks data={footerData} /></footer>
    </div>
  );
};

export default SellerPage;
