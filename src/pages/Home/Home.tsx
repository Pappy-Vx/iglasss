import Banner from './layout/Banner';
import FeaturedProducts from './layout/FeaturedProducts';
import NewCollections from './layout/NewCollections';
import RecentlyViewed from './layout/RecentlyViewed';
import Header from '../../components/Header';
import HomeFooter from './layout/HomeFooter';
import Footer from '../../components/Footer';
import Selfie from './layout/Selfie';

const Home = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 space-y-12  ">
        {/* Hero Banner */}
        <Banner />

        
        {/* New Collections Section */}
        <NewCollections />

        {/* Categories Section */}


        {/* Featured Products Section */}
        <FeaturedProducts />

        {/* Recently Viewed Section */}
        <Selfie />

        {/* Recently Viewed Section */}
        <RecentlyViewed />

        <HomeFooter />
      </div>
      <Footer />
    </>
  );
};

export default Home;
