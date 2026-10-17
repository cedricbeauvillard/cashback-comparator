import {Prisma, Seller} from '@prisma/client';
import type {GetServerSideProps, NextPage} from 'next';
import HomePage, {HomePageProps} from '../components/business/HomePage';
import {prisma} from '../lib/prisma';

const Home: NextPage<HomePageProps> = ({topSellers, cashbackers}) => {
  // TODO: check ssr with index (should i load data from index to Home Page ?)
  return <HomePage topSellers={topSellers} cashbackers={cashbackers}></HomePage>;
};

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (context) => {
  // Avoid soft 404
  if (Object.keys(context.query).length !== 0) {
    return {notFound: true};
  }

  try {
    // TODO: make a good select (opti)
    const cashbackers = await prisma.cashbacker.findMany({
      orderBy: {rank: 'asc'},
    });

    const homePageTopSellers = [
      6728, 5568, 5413, 172, 7274, 4887, 2396, 4883, 6250, 2485, 2448, 817,
    ];

    const topSellers = await prisma.$queryRawUnsafe<Seller[]>(
      // DO NOT pass in or accept user input here
      `SELECT DISTINCT name,slug FROM Seller WHERE id IN (${homePageTopSellers})`
    );

    return {
      props: {
        cashbackers,
        topSellers,
      },
    };
  } catch (e) {
    // Log the underlying server-side failure instead of silently converting it to a 404.
    // Do not log connection strings, credentials, or the full error object.
    const candidateCode = e instanceof Prisma.PrismaClientInitializationError
      ? e.errorCode
      : e instanceof Prisma.PrismaClientKnownRequestError ? e.code : undefined;
    // Inspect locally; emit only fixed categories, never the raw message.
    const diagnosticMessage = e instanceof Error ? e.message : '';
    const signals = {
      network: /can't reach database server|connection refused|connection timed out|connect timeout|ETIMEDOUT|ECONNREFUSED|ENOTFOUND/i.test(diagnosticMessage),
      authentication: /authentication failed|access denied for user|authentication plugin|unknown authentication|sha256_password|caching_sha2_password/i.test(diagnosticMessage),
      tls: /TLS|SSL|certificate/i.test(diagnosticMessage),
      invalidUrl: /invalid.*(?:url|connection string)|error parsing.*(?:url|connection)|protocol.*mysql/i.test(diagnosticMessage),
      engine: /query engine|libquery_engine|openssl|shared librar|binary target/i.test(diagnosticMessage),
      missingDatabase: /unknown database|database.*does not exist/i.test(diagnosticMessage),
      connectionClosed: /server has closed|connection.*closed|connection reset|ECONNRESET/i.test(diagnosticMessage),
    };
    console.error('[SSR pages/index.tsx] Database request failed:', {
      signals,
      name: e instanceof Prisma.PrismaClientInitializationError
        ? 'PrismaClientInitializationError'
        : e instanceof Prisma.PrismaClientKnownRequestError
          ? 'PrismaClientKnownRequestError' : 'Unknown error',
      code: typeof candidateCode === 'string' && /^P\d{4}$/.test(candidateCode)
        ? candidateCode : 'UNAVAILABLE',
      databaseUrlPresent: Boolean(process.env.DATABASE_URL?.trim()),
      prismaVersion: Prisma.prismaVersion.client,
    });
    throw new Error('Server-side data loading failed');
  }
};

export default Home;
