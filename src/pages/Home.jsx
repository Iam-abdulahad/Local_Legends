import CTASection from "./Home/CTASections";
import HeroSection from "./Home/HeroSections";
import HowItWorks from "./Home/HowItWorks";
import ImageGenerator from "./generateImage";
import StoryCard from "./Story/StoryCard";
import StoryList from "./Story/StoryLIst";

const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <ImageGenerator></ImageGenerator>
      <StoryList></StoryList>
      <StoryCard></StoryCard>
      <CTASection></CTASection>
      <HowItWorks></HowItWorks>
    </div>
  );
};
export default Home;
