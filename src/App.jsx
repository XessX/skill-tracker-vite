import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

import Home from "./pages/Home";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Projects from "./pages/Projects";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";

import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { Title, Meta } from "react-head";
import { NavLink } from "react-router-dom";
import { BsSun, BsMoonStarsFill } from "react-icons/bs";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("guestSkills");
    setUser(null);
    window.location.href = "/";
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <>
      {/* 🔹 Meta SEO Tags */}
      <Title>Al Jubair Hossain – Portfolio & Skill Tracker</Title>
      <Meta name="description" content="Track your skills and explore projects by Al Jubair Hossain" />
      <link rel="icon" type="image/png" href="/favicon.png" />

      <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
        {/* 🔹 Navbar */}
        <nav className="sticky top-0 z-50 bg-gray-100 dark:bg-gray-800 shadow-md text-black dark:text-white p-4 flex justify-between items-center">
          {/* Brand or Logo */}
          <NavLink to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
            SkillTracker
          </NavLink>

          {/* Links */}
          <div className="flex items-center gap-6">
            {[
              { path: "/", name: "Home" },
              { path: "/projects", name: "Projects" },
              { path: "/resume", name: "Resume" },
              { path: "/contact", name: "Contact" },
              { path: "/about", name: "About" },
            ].map(({ path, name }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `text-sm font-medium hover:underline transition ${
                    isActive ? "text-blue-500 dark:text-blue-400 underline" : "text-gray-700 dark:text-gray-300"
                  }`
                }
              >
                {name}
              </NavLink>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className="p-2 bg-gray-300 dark:bg-gray-700 rounded-full"
              title="Toggle Theme"
            >
              {darkMode ? <BsSun className="text-yellow-500" /> : <BsMoonStarsFill className="text-blue-600" />}
            </button>

            {user ? (
              <>
                <span className="text-sm text-gray-700 dark:text-gray-300">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/auth" className="text-blue-500 dark:text-blue-400 underline text-sm">
                Login
              </NavLink>
            )}
          </div>
        </nav>

        {/* 🔹 Routes */}
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <p className="text-gray-600 dark:text-gray-300 text-lg animate-pulse">🔄 Loading...</p>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/about" element={<About />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        )}

        <Analytics />
        <Footer />
      </div>
    </>
  );
}

export default App;
