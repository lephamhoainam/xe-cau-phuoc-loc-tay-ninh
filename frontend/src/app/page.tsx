import HeroSection from "../components/home/HeroSection";
import AboutSection from "../components/home/AboutSection";
import ServicesSection from "../components/home/ServicesSection";
import VehiclesSection from "../components/home/VehiclesSection";
import NewsSection from "../components/home/NewsSection";
import ContactSection from "../components/home/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <VehiclesSection />
      <NewsSection />
      <ContactSection />
    </>
  );
}