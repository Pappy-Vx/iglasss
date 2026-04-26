import { useEffect, useRef, useState } from 'react';
import Banner from './layout/Banner';
import FeaturedProducts from './layout/FeaturedProducts';
import NewCollections from './layout/NewCollections';
import RecentlyViewed from './layout/RecentlyViewed';
import Header from '../../components/Header';
import HomeFooter from './layout/HomeFooter';
import Footer from '../../components/Footer';
import Selfie from './layout/Selfie';
import GlassScrollAnimation from './layout/GlassScrollAnimation';

const Home = () => {
  const [glassStep, setGlassStep] = useState(0);

  const bannerRef = useRef<HTMLDivElement>(null);
  const collectionsRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const selfieRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateStep = () => {
      const vh = window.innerHeight;
      const midpoint = window.scrollY + vh * 0.55;

      const getAbsTop = (ref: { current: HTMLDivElement | null }) => {
        if (!ref.current) return Infinity;
        return ref.current.getBoundingClientRect().top + window.scrollY;
      };

      const bannerY = getAbsTop(bannerRef);
      const collectionsY = getAbsTop(collectionsRef);
      const featuredY = getAbsTop(featuredRef);
      const selfieY = getAbsTop(selfieRef);

      if (midpoint >= selfieY) {
        setGlassStep(0);
      } else if (midpoint >= featuredY) {
        setGlassStep(3);
      } else if (midpoint >= collectionsY) {
        setGlassStep(2);
      } else if (midpoint >= bannerY) {
        setGlassStep(1);
      } else {
        setGlassStep(0);
      }
    };

    window.addEventListener('scroll', calculateStep, { passive: true });
    calculateStep();
    return () => window.removeEventListener('scroll', calculateStep);
  }, []);

  return (
    <>
      <Header />

      {glassStep > 0 && <GlassScrollAnimation step={glassStep} />}

      <main className="overflow-x-hidden">
        {/* Hero Banner */}
        <div ref={bannerRef}>
          <Banner />
        </div>

        <div className="container mx-auto px-4 max-w-[1280px]">
          {/* New Collections */}
          <div ref={collectionsRef} className="py-16">
            <NewCollections />
          </div>

          {/* Featured Products */}
          <div ref={featuredRef} className="py-8">
            <FeaturedProducts />
          </div>

          {/* AR Try-on Section */}
          <div ref={selfieRef} className="py-16">
            <Selfie />
          </div>

          {/* Recently Viewed */}
          <div className="py-8">
            <RecentlyViewed />
          </div>

          {/* Hashtag Footer */}
          <div className="py-8">
            <HomeFooter />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Home;
