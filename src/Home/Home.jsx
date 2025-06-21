import HowItWorks from "../pages/HowItWorks";
import CTASection from "../pages/CTASections";
import SearchPage from "../pages/Story/SearchPage";
import LatestStories from "../pages/Story/LatestStories";
import Contact from "../pages/Contact";

const Home = () => {
  return (
    <div>
      <SearchPage></SearchPage>
      <LatestStories></LatestStories>
      <CTASection></CTASection>
      <HowItWorks></HowItWorks>
      <Contact></Contact>
    </div>
  );
};
export default Home;
