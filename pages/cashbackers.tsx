import {Cashbacker} from '@prisma/client';
import {GetServerSideProps} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {VFC} from 'react';
import {SearchHeader} from '../components/generic/SearchHeader';
import {FooterLinks} from '../components/generic/FooterLinks';
import {footerData} from '../components/_static';
import {prisma} from '../lib/prisma';

interface Props { cashbackers: Cashbacker[]; }

const CashbackersPage: VFC<Props> = ({cashbackers}) => {
  const ordered = [...(cashbackers || [])].sort((a,b) => a.rank - b.rank);
  const podium = ordered.slice(0,3);
  const faq = [
    {q:'Quel est le meilleur site de cashback ?', a:'Le meilleur site dépend de vos achats : comparez les taux chez votre marchand, les conditions du bonus et les possibilités de retrait. Notre classement vous aide à choisir parmi plusieurs plateformes.'},
    {q:'Les sites de cashback sont-ils gratuits ?', a:'Les plateformes présentées proposent une inscription gratuite. Vérifiez toujours les conditions particulières de chaque offre avant votre achat.'},
    {q:'Peut-on utiliser plusieurs sites de cashback ?', a:'Oui. Vous pouvez posséder plusieurs comptes sur des plateformes différentes et sélectionner celle qui offre les meilleures conditions pour chaque achat. Un même achat ne donne généralement droit qu’à un cashback.'},
    {q:'Comment récupérer son cashback ?', a:'Une fois le cashback validé et le seuil de retrait atteint, vous pouvez demander le versement selon les modes de paiement proposés par la plateforme.'},
  ];
  return (
    <div className="cb-page">
      <Head>
        <title>Meilleurs sites de cashback 2026 : classement et comparatif | MeilleursCashback</title>
        <meta name="description" content="Quel est le meilleur site de cashback en 2026 ? Comparez les plateformes, bonus de bienvenue, avis et liens d'inscription pour économiser sur vos achats." />
        <link rel="canonical" href="https://meilleurscashback.com/cashbackers" />
        <meta property="og:title" content="Comparatif des meilleurs sites de cashback en 2026" />
        <meta property="og:description" content="Classement, bonus de bienvenue et avis : trouvez le site de cashback adapté à vos achats." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://meilleurscashback.com/cashbackers" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'FAQPage',mainEntity:faq.map(item=>({'@type':'Question',name:item.q,acceptedAnswer:{'@type':'Answer',text:item.a}}))})}} />
      </Head>
      <SearchHeader />
      <main>
        <section className="cb-hero">
          <div className="cb-container">
            <nav className="cb-breadcrumb" aria-label="Fil d'Ariane"><Link href="/"><a>Accueil</a></Link><span> / </span> Meilleurs sites de cashback</nav>
            <div className="cb-hero-content">
              <div>
                <span className="cb-eyebrow">Comparatif indépendant · 2026</span>
                <h1>Comparatif des <span>meilleurs sites de cashback</span> en 2026</h1>
                <p>Comparez les plateformes de cashback, leurs bonus de bienvenue et leurs avantages pour choisir celle qui vous fera économiser le plus.</p>
                <div className="cb-trust"><span>✓ Inscription gratuite</span><span>✓ Classement comparatif</span><span>✓ Liens vers les avis détaillés</span></div>
                <a className="cb-button cb-primary cb-hero-cta" href="#comparatif">Comparer les plateformes ↓</a>
              </div>
              <div className="cb-illustration" aria-hidden="true"><div className="cb-laptop"><div className="cb-screen"><span>🛍️</span><strong>Cashback</strong><em>€ € €</em></div></div><div className="cb-pig">🐷</div><div className="cb-coin">€</div></div>
            </div>
          </div>
        </section>
        <div className="cb-container">
          <section className="cb-section" aria-labelledby="podium-title">
            <h2 id="podium-title">Notre sélection des sites de cashback</h2>
            <p className="cb-intro">Découvrez les plateformes en tête de notre classement. Les bonus et les liens sont issus de notre base et peuvent évoluer.</p>
            <div className="cb-podium">
              {podium.map((site,index)=>(
                <article className={'cb-podium-card '+(index===0?'cb-featured':'')} key={site.name}>
                  {index===0 && <div className="cb-favorite">★ En tête du classement</div>}
                  <div className="cb-card-top"><span className="cb-rank">#{site.rank}</span><div className="cb-logo"><Image src={site.logoUrl} width={160} height={90} objectFit="contain" alt={'Logo '+site.name}/></div></div>
                  <h3>{site.name}</h3>
                  <div className="cb-bonus"><span>Bonus de bienvenue</span><strong>{site.signupBonus} €</strong></div>
                  <p>Consultez notre avis et comparez les offres avant de vous inscrire.</p>
                  <a className="cb-button cb-primary" href={site.sponsorshipUrl} target="_blank" rel="noopener noreferrer sponsored">Profiter de l'offre →</a>
                  <a className="cb-text-link" href={site.reviewsUrl} target="_blank" rel="noopener noreferrer">Lire notre avis détaillé</a>
                </article>
              ))}
            </div>
            <p className="cb-disclosure">Certains liens sont des liens de parrainage : une inscription peut nous apporter une rémunération, sans coût supplémentaire pour vous. Les conditions des bonus sont à vérifier auprès de chaque plateforme.</p>
          </section>
          <section className="cb-section" id="comparatif" aria-labelledby="comparison-title">
            <h2 id="comparison-title">Comparez les plateformes en un coup d'œil</h2>
            <p className="cb-intro">Classement, bonus et accès direct aux avis : retrouvez les informations essentielles dans un seul tableau.</p>
            <div className="cb-table-wrap"><table className="cb-table"><thead><tr><th>Plateforme</th><th>Classement</th><th>Bonus de bienvenue</th><th>Notre avis</th><th>Inscription</th></tr></thead><tbody>
              {ordered.map(site=><tr key={site.name}><td><div className="cb-table-name"><Image src={site.logoUrl} width={92} height={54} objectFit="contain" alt={'Logo '+site.name}/><strong>{site.name}</strong></div></td><td><span className="cb-rank-small">#{site.rank}</span></td><td><strong className="cb-bonus-small">{site.signupBonus} €</strong></td><td><a className="cb-text-link" href={site.reviewsUrl} target="_blank" rel="noopener noreferrer">Voir l'avis ↗</a></td><td><a className="cb-button cb-primary cb-table-button" href={site.sponsorshipUrl} target="_blank" rel="noopener noreferrer sponsored">S'inscrire →</a></td></tr>)}
            </tbody></table></div>
          </section>
          <section className="cb-section cb-advice"><div><span className="cb-eyebrow">Conseil pour économiser davantage</span><h2>Le meilleur taux dépend aussi du marchand</h2><p>Avant chaque achat, comparez les offres de cashback disponibles chez votre enseigne préférée. Le site offrant le meilleur bonus de bienvenue n'est pas forcément celui qui propose le meilleur taux pour chaque achat.</p><Link href="/"><a className="cb-button cb-primary">Comparer les taux par marchand →</a></Link></div></section>
          <section className="cb-section" aria-labelledby="faq-title"><h2 id="faq-title">Questions fréquentes sur les sites de cashback</h2><div className="cb-faq">{faq.map(item=><details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div></section>
        </div>
      </main>
      <FooterLinks data={footerData} />
      <style jsx global>{`
        .cb-page{background:#faf9ff;color:#17142c;min-height:100vh;font-family:Montserrat,Arial,sans-serif}
        .cb-page *{box-sizing:border-box}.cb-container{width:min(1180px,calc(100% - 40px));margin:0 auto}
        .cb-hero{background:linear-gradient(115deg,#fff 0%,#f5f0ff 58%,#e6ddff 100%);padding:20px 0 66px;overflow:hidden}
        .cb-breadcrumb{font-size:13px;color:#68617c;margin:0 0 36px}.cb-breadcrumb a{color:#6841d5;text-decoration:none}
        .cb-hero-content{display:grid;grid-template-columns:1.2fr .8fr;gap:36px;align-items:center;min-height:345px}
        .cb-eyebrow{color:#6a35d7;font-size:13px;font-weight:800;letter-spacing:.03em;text-transform:uppercase}
        .cb-hero h1{font-size:clamp(32px,4vw,54px);line-height:1.12;letter-spacing:-.045em;margin:18px 0 22px;font-weight:850}
        .cb-hero h1 span{color:#6b36df}.cb-hero p{font-size:18px;line-height:1.7;color:#4e4963;max-width:670px}
        .cb-trust{display:flex;flex-wrap:wrap;gap:12px 22px;font-size:13px;font-weight:650;color:#4a4267;margin:24px 0}
        .cb-button{display:inline-flex;align-items:center;justify-content:center;text-align:center;border-radius:100px;padding:13px 23px;font-weight:750;text-decoration:none!important;transition:transform .2s,box-shadow .2s}
        .cb-button:hover{transform:translateY(-2px);box-shadow:0 9px 22px #6631d733}
        .cb-primary{background:linear-gradient(110deg,#8735ed,#5826ce);color:white!important}
        .cb-illustration{height:300px;position:relative;display:flex;align-items:center;justify-content:center}
        .cb-laptop{width:320px;height:210px;background:#28234b;border:10px solid #28234b;border-radius:18px;box-shadow:0 30px 50px #5d3ca840;transform:rotate(-6deg)}
        .cb-screen{height:100%;background:linear-gradient(130deg,#fff,#e8ddff);border-radius:7px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:9px;color:#6931d5;font-size:27px}
        .cb-screen span{font-size:55px}.cb-screen em{font-style:normal;font-weight:900;color:#22a16c}
        .cb-pig{position:absolute;bottom:0;right:10px;font-size:95px;filter:drop-shadow(0 12px 10px #6c52a83d)}
        .cb-coin{position:absolute;bottom:10px;left:10px;background:#ffcf4e;color:#9c5b00;border:5px solid #ffb52e;border-radius:50%;width:76px;height:76px;display:grid;place-items:center;font-size:42px;font-weight:900;box-shadow:0 9px 15px #9b661b33}
        .cb-section{padding:50px 0 16px;scroll-margin-top:90px}.cb-section h2{font-size:clamp(25px,3vw,34px);line-height:1.2;letter-spacing:-.025em;margin:0 0 12px}.cb-intro{color:#68617c;font-size:16px;margin:0 0 28px}
        .cb-podium{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;align-items:stretch}
        .cb-podium-card{background:white;border:1px solid #e8e1fa;border-radius:22px;padding:25px;box-shadow:0 10px 28px #3e2b7810;position:relative;display:flex;flex-direction:column;gap:13px}
        .cb-podium-card.cb-featured{border:2px solid #7737e8;box-shadow:0 14px 32px #6935dd23}
        .cb-favorite{position:absolute;top:-18px;left:50%;transform:translateX(-50%);white-space:nowrap;background:#7134dc;color:white;border-radius:40px;padding:9px 17px;font-size:12px;font-weight:800}
        .cb-card-top{display:flex;align-items:center;gap:15px}.cb-rank{display:grid;place-items:center;width:45px;height:45px;border-radius:50%;background:#f1eaff;color:#6632d0;font-size:19px;font-weight:900;flex-shrink:0}
        .cb-logo{height:75px;display:flex;align-items:center}.cb-podium-card h3{font-size:23px;margin:0}
        .cb-bonus{background:#f4ecff;border-radius:14px;padding:14px;display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:13px}
        .cb-bonus strong{font-size:25px;color:#6c2ed7;white-space:nowrap}.cb-podium-card p{color:#645e73;line-height:1.6;flex:1;margin:0}
        .cb-podium-card .cb-button{width:100%}.cb-text-link{color:#6731d0;font-weight:700;text-decoration:none}.cb-podium-card .cb-text-link{text-align:center;font-size:13px}
        .cb-disclosure{font-size:12px;color:#716a80;line-height:1.6;margin-top:20px}
        .cb-table-wrap{overflow-x:auto;background:white;border:1px solid #e7defa;border-radius:20px;box-shadow:0 8px 22px #3e2b780b}
        .cb-table{width:100%;border-collapse:collapse;min-width:690px}.cb-table th{text-align:left;background:#f0eafe;color:#3b315a;font-size:13px;padding:17px 18px}.cb-table td{padding:13px 18px;border-top:1px solid #eee9f7;vertical-align:middle}
        .cb-table-name{display:flex;align-items:center;gap:12px}.cb-rank-small{background:#f2eaff;border-radius:30px;padding:6px 12px;font-weight:800;color:#6c34d6}.cb-bonus-small{color:#6c34d6;font-size:18px}.cb-table-button{padding:10px 17px;font-size:13px}
        .cb-advice{margin-top:38px;background:linear-gradient(120deg,#eee6ff,#faf7ff);padding:35px;border-radius:24px}.cb-advice p{color:#514a66;line-height:1.7;max-width:790px}.cb-advice .cb-button{margin-top:10px}
        .cb-faq details{background:white;border:1px solid #e8e1f6;border-radius:14px;margin:10px 0;padding:18px 22px}.cb-faq summary{cursor:pointer;font-weight:750}.cb-faq p{color:#5d566f;line-height:1.7}
        @media(max-width:800px){.cb-hero{padding-bottom:35px}.cb-hero-content{grid-template-columns:1fr}.cb-illustration{display:none}.cb-podium{grid-template-columns:1fr;gap:27px}.cb-section{padding-top:38px}.cb-hero h1{font-size:36px}.cb-hero p{font-size:16px}.cb-container{width:min(100% - 28px,1180px)}.cb-podium-card{padding:23px}.cb-advice{padding:25px}.cb-table th,.cb-table td{padding:12px}}
      `}</style>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  if (Object.keys(context.query).length !== 0) return {notFound:true};
  try {
    const cashbackers = await prisma.cashbacker.findMany({orderBy:{rank:'asc'}});
    return {props:{cashbackers}};
  } catch(e) { return {notFound:true}; }
};
export default CashbackersPage;
