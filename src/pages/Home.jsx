// import CTASection from "./Home/CTASections";
import CTASection from "../Home/CTASections";
import HeroSection from "../Home/HeroSections";
import HowItWorks from "../Home/HowItWorks";
import StoryList from "./Story/StoryLIst";

const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <StoryList></StoryList>
      <CTASection></CTASection>
      <HowItWorks></HowItWorks>
    </div>
  );
};
export default Home;