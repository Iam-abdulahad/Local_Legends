import HowItWorks from "../pages/HowItWorks";
import StoryList from "../pages/Story/StoryLIst";
import CTASection from "../pages/CTASections";

const Home = () => {
  return (
    <div>
      <StoryList></StoryList>
      <CTASection></CTASection>
      <HowItWorks></HowItWorks>
    </div>
  );
};
export default Home;