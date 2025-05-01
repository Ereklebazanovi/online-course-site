import { FC } from "react";
import HeroSection from "../components/homeComponents/HeroSection";
import FeaturedCourses from "../components/homeComponents/FeaturedCourses";
import WhyChooseUs from "../components/homeComponents/WhyChooseUs";
import Testimonials from "../components/homeComponents/Testimonials";
import Footer from "../components/homeComponents/Footer";

const Home: FC = () => {
  return (
    <div className="bg-gray-50 text-gray-900">
      <HeroSection />
      <FeaturedCourses />
      <WhyChooseUs />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
