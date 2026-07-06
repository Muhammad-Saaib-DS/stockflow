import HeroSection from "../components/home/HeroSection";
import CategorySection from "../components/home/CategorySection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import PromoBanner from "../components/home/PromoBanner";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Newsletter from "../components/home/Newsletter";

function Home() {
  return (
    <>
      <HeroSection />

      <CategorySection />

      <FeaturedProducts />

      <PromoBanner />

      <WhyChooseUs />

      <Newsletter />
    </>
  );
}

export default Home;