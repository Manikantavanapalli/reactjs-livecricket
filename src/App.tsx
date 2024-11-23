import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Homepage from "./pages/HomePage";
import LiveMatches from "./components/LiveMatches";
import News from "./components/News";
import UpcomingMatches from "./components/UpcomingMatches";

const App: React.FC = () => {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // When scrolled down 50px or more, change the header color
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Router>
      <div className="bg-gray-50 min-h-screen">
        {/* Navbar Section */}
        <nav
          className={`${scrolling ? "bg-teal-700" : "bg-teal-900"
            } text-white p-6 shadow-md fixed w-full top-0 left-0 z-50 transition-all duration-300`}
        >

          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-3xl font-bold hover:text-gray-300 transition duration-300">
              Manikanta vanapalli
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link
                to="/live-matches"
                className="hover:text-gray-300 transition duration-300 text-lg"
              >
                Live Matches
              </Link>
              <Link
                to="/news"
                className="hover:text-gray-300 transition duration-300 text-lg"
              >
                News
              </Link>
              <Link
                to="/upcoming-matches"
                className="hover:text-gray-300 transition duration-300 text-lg"
              >
                Upcoming Matches
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="pt-20">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/live-matches" element={<LiveMatches />} />
            <Route path="/news" element={<News />} />
            <Route path="/upcoming-matches" element={<UpcomingMatches />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
