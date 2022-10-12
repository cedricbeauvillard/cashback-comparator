import {Seller} from '@prisma/client';
import type {GetServerSideProps, NextPage} from 'next';
import HomePage, {HomePageProps} from '../components/business/HomePage';
import {prisma} from '../lib/prisma';

const Home: NextPage<HomePageProps> = ({topSellers, cashbackers}) => {
  // TODO: check ssr with index (should i load data from index to Home Page ?)
  return <HomePage topSellers={topSellers} cashbackers={cashbackers}></HomePage>;
};

export const getServerSideProps: GetServerSideProps<HomePageProps> = async () => {
  try {
    const cashbackers = await prisma.cashbacker.findMany({
      orderBy: {rank: 'asc'},
    });

    const homePageTopSellers = [6728, 5568, 5413, 172, 7274, 4887, 2396, 4883, 6250, 2485];

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
    return {notFound: true};
  }
};

export default Home;
