import type {GetServerSideProps, NextPage} from 'next';
import {prisma} from '../lib/prisma';
import HomePage, {HomePageProps} from '../components/HomePage';

const Home: NextPage<HomePageProps> = ({topSellers, cashbackers}) => {
  // TODO: check ssr with index (should i load data from index to Home Page ?)
  return <HomePage topSellers={topSellers} cashbackers={cashbackers}></HomePage>;
};

export const getServerSideProps: GetServerSideProps<HomePageProps> = async () => {
  try {
    const cashbackers = await prisma.cashbacker.findMany({
      orderBy: {rank: 'asc'},
    });

    const topSellers = await prisma.seller.findMany({
      take: 20,
    });

    return {
      props: {
        cashbackers,
        topSellers,
      },
    };
  } catch (e) {
    /*     if (e instanceof Error) {
      // ✅ TypeScript knows err is Error
      return {
        props: {
          test: `${e.stack}${e.message}${e.name}`,
          cashbackers: null,
          topSellers: null,
        },
      };
    } else {
      return {
        props: {
          test: `unexpected error: ${e}`,
          cashbackers: null,
          topSellers: null,
        },
      };
    } */ return {notFound: true};
  }
};

export default Home;
