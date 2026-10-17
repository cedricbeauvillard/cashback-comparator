import {Seller} from '@prisma/client';
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
    console.error('[SSR pages/index.tsx] Database request failed:',
      e instanceof Error ? e.name : 'Unknown error');
    throw new Error('Server-side data loading failed');
  }
};

export default Home;
