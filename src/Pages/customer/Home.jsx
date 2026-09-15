import Hero from "../../components/Hero";
import Facilities from "../../components/customer/Facilities";
import PopularDishes from "./popularDishes";
import FeaturesSection from "../../components/customer/FeaturesSection";
import WorkCulture from "./WorkCulture";
import WhyChooseUs from "./WhyChooseUs";
import OpeningHours from "./OpeningHours";

export default function Home() {
  return <div>
    <Hero />
    <PopularDishes />
    <FeaturesSection />
    <Facilities />
    <WorkCulture />
    <WhyChooseUs />
    <OpeningHours />
  </div>;
}
