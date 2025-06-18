import HowItWorks from "../pages/HowItWorks";
import StoryList from "../pages/Story/StoryLIst";
import CTASection from "../pages/CTASections";
import SearchPage from "../pages/Story/SearchPage";

const Home = () => {
  return (
    <div>
      <SearchPage></SearchPage>
      <StoryList></StoryList>
      <CTASection></CTASection>
      <HowItWorks></HowItWorks>
    </div>
  );
};
export default Home;