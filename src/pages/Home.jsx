import CTASection from "./Home/CTASections";
import HeroSection from "./Home/HeroSections";
import HowItWorks from "./Home/HowItWorks";
import StoryCard from "./Story/StoryCard";
import StoryDetails from "./Story/StoryDetails";

const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <StoryCard></StoryCard>
      <StoryDetails></StoryDetails>
      <CTASection></CTASection>
      <HowItWorks></HowItWorks>
    </div>
  );
};
export default Home;
