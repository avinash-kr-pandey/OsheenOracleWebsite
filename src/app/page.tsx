import Achievements from "@/components/Home/Achievements";
import BecomeAMember from "@/components/Home/BecomeAMember";
import Blog from "@/components/Home/Blog";
import Catalogue from "@/components/Home/Catalogue";
import Discover from "@/components/Home/Discover";
import HeroSection from "@/components/Home/HeroSection";
import MediaSpotlight from "@/components/Home/MediaSpotlight";
import MEMBER from "@/components/Home/MEMBER";
import WelcomeOsheenOracle from "@/components/Home/WelcomeOsheenOracle";
import WhyChooseUs from "@/components/Home/WhyChooseUs";

export default function Home() {
  return (
    <>
       <header className="w-full">
        <HeroSection />
      </header>
      <WelcomeOsheenOracle />
      <Discover />
      <Achievements />
      <MediaSpotlight />
      <Catalogue />
      <MEMBER />
      <Blog />
      <WhyChooseUs />
      <BecomeAMember />
    </>
  );
}
