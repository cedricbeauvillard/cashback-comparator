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

    const topSellers = await prisma.$queryRawUnsafe<Seller[]>(
      // DO NOT pass in or accept user input here
      `SELECT DISTINCT name,logoUrl FROM Seller WHERE topSeller = 1 OR top40=1 OR coupon=1 ORDER BY RAND() LIMIT 20;`
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
