import type {NextPage} from 'next';
import HomePage from './HomePage';

const Home: NextPage = () => {
  // TODO: check ssr with index (should i load data from index to Home Page ?)
  return <HomePage></HomePage>;
};

export default Home;
