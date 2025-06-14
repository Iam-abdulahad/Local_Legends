import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout
import MainLayout from "./layout/MainLayout";

// Components
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Map from "./pages/Map";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./Login/Login";
import Signup from "./Login/SignUp";
import NotFound from "./pages/NotFound";
import SubmitStory from "./pages/Story/SubmitStory";
import StoryDetails from "./pages/Story/StoryDetails";

function App() {
  return (
    <Router>
      <Routes>
        {/* Pages using the social layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/submit" element={<SubmitStory />} />
          <Route path="/map" element={<Map />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/stories/:id" element={<StoryDetails />} />
        </Route>

        {/* Auth & Standalone pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Optional Footer for all pages */}
      <Footer />
    </Router>
  );
}

export default App;
