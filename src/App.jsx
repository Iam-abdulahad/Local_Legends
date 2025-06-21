import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Layout
import MainLayout from "./layout/MainLayout.jsx";

// Components
import Footer from "./components/Footer.jsx";

// Pages
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./Login/Login.jsx";
import Signup from "./Login/SignUp.jsx";
import NotFound from "./pages/NotFound.jsx";
import SubmitStory from "./pages/Story/SubmitStory.jsx";
import StoryDetails from "./pages/Story/StoryDetails.jsx";
import Profile from "./User/userProfile.jsx";
import ProfileUpdatePage from "./User/ProfileUpdatePage.jsx";
import SavedStories from "./User/SavedStories.jsx";
import MyStories from "./User/MyStories.jsx";
import ExploreMap from "./pages/ExploreMap.jsx";
import Home from "./Home/Home.jsx";
import CommunityPage from "./pages/CommunityPage.jsx";
import SubmitReviewPage from "./User/SubmitReviewPage.jsx";
import SearchPage from "./pages/Story/SearchPage.jsx";
import StoriesList from "./pages/Story/StoryLIst.jsx";
import TagFilteredStories from "./pages/Story/TagFilteredStories.jsx";
import RequireAuth from "./context/RequireAuth.jsx";

// Intro animation component
const Intro = () => (
  <motion.div
    className="w-screen h-screen flex flex-col justify-center items-center bg-[#F2EFE7] text-[#0ABAB5]"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1 }}
  >
    <motion.h1
      className="text-4xl md:text-6xl font-bold tracking-wide mb-4"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      Local Legend
    </motion.h1>
    <motion.p
      className="text-lg md:text-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      Discover stories from your community ✨
    </motion.p>
  </motion.div>
);

const AppContent = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const introShown = sessionStorage.getItem("introShown");

    if (isHome && !introShown) {
      setShowIntro(true);
      const timer = setTimeout(() => {
        setShowIntro(false);
        sessionStorage.setItem("introShown", "true");
      }, 2500);

      return () => clearTimeout(timer);
    } else {
      setShowIntro(false);
    }
  }, [isHome]);

  return (
    <AnimatePresence mode="wait">
      {showIntro ? (
        <Intro key="intro" />
      ) : (
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen flex flex-col"
        >
          <Routes>
            {/* Main layout routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/explore-map" element={<ExploreMap />} />
              <Route path="/stories" element={<StoriesList />} />
              <Route path="/about" element={<About />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/stories/:id" element={<StoryDetails />} />
              <Route path="/tags/:tagName" element={<TagFilteredStories />} />

              {/* Protected routes outside layout */}
              <Route
                path="/submit"
                element={
                  <RequireAuth>
                    <SubmitStory />
                  </RequireAuth>
                }
              />
              <Route
                path="/submit-review"
                element={
                  <RequireAuth>
                    <SubmitReviewPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/profile"
                element={
                  <RequireAuth>
                    <Profile />
                  </RequireAuth>
                }
              />
              <Route
                path="/update-profile"
                element={
                  <RequireAuth>
                    <ProfileUpdatePage />
                  </RequireAuth>
                }
              />
              <Route
                path="/saved-stories"
                element={
                  <RequireAuth>
                    <SavedStories />
                  </RequireAuth>
                }
              />
              <Route
                path="/my-stories"
                element={
                  <RequireAuth>
                    <MyStories />
                  </RequireAuth>
                }
              />
            </Route>

            {/* Auth & error pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
