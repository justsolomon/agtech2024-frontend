import { SEO } from 'components/global';
import { HomeContainer } from 'containers';

const HomePage = () => {
  return (
    <>
      <SEO prefix="Home" />
      <HomeContainer />
    </>
  );
};

export default HomePage;
