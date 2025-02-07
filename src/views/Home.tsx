import Contact from "@/components/Contact";
import CTA from "@/components/CTA";
import Hero from "@/components/Hero";
import HeroExtra from "@/components/HeroExtra";
import Newsletter from "@/components/Newsletter";
import OurServices from "@/components/OurServices";
import Trips from "@/components/Trips";
import WhyUs from "@/components/WhyUs";

const Home = () => {
  return (
    <div>
      <Hero />
      <HeroExtra />
      <Trips />
      <OurServices />
      <WhyUs />
      <CTA />
      <Newsletter />
      <Contact />
    </div>
  );
};

export default Home;
