import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Layout
import MainLayout from "./layout/MainLayout";

// Components
import Footer from "./components/Footer";

// Pages
import Map from "./pages/Map.jsx";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./Login/Login";
import Signup from "./Login/SignUp";
import NotFound from "./pages/NotFound";
import SubmitStory from "./pages/Story/SubmitStory";
import StoryDetails from "./pages/Story/StoryDetails";
import Home from "./pages/Home";
import Profile from "./User/userProfile";
import ProfileUpdatePage from "./User/ProfileUpdatePage";
import SavedStories from "./User/SavedStories";
import MyStories from "./User/MyStories";
import ExploreMap from "./pages/ExploreMap";

const Intro = () => (
  <motion.div
    className="w-screen h-screen flex flex-col justify-center items-center bg-[#7D0A0A] text-[#EAD196]"
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

function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 2500);
    return () => clearTimeout(timer);
  }, []);

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
          <Router>
            <Routes>
              {/* Pages using the social layout */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/submit" element={<SubmitStory />} />
                <Route path="/map" element={<Map />} />
                <Route path="/explore-map" element={<ExploreMap />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/stories/:id" element={<StoryDetails />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/update-profile" element={<ProfileUpdatePage />} />
                <Route path="/saved-stories" element={<SavedStories />} />
                <Route path="/my-stories" element={<MyStories/>} />

              </Route>

              {/* Auth & Standalone pages */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<NotFound />} />
            </Routes>

            <Footer />
          </Router>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
