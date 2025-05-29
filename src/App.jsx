import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

// Import your pages
import Home from "./pages/Home";
import Map from "./pages/Map";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./Login/Login";
import Signup from "./Login/SignUp";
import NotFound from "./pages/NotFound";
import SubmitStory from "./pages/Story/SubmitStory";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/submit" element={<SubmitStory />} />
        <Route path="/map" element={<Map />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
