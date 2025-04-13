import { Routes, Route, NavLink, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

import Home from "./pages/Home";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Projects from "./pages/Projects";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";
import ShareResume from "./pages/ShareResume";
import PublishResume from "./pages/PublishResume";
import PublicResume from "./pages/PublicResume";

import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { Title, Meta } from "react-head";
import { BsSun, BsMoonStarsFill } from "react-icons/bs";
import { HiOutlineMenu, HiX } from "react-icons/hi";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 🔐 Logout handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("guestSkills"); // ✅ always clear
      setUser(null);
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // 🔁 Monitor Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        localStorage.removeItem("guestSkills"); // ✅ remove guest data on login
      }
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 💡 Sync theme
  useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", theme);
  }, [darkMode]);

  return (
    <>
      <Title>Al Jubair Hossain – Portfolio & Skill Tracker</Title>
      <Meta name="description" content="Track your skills and explore projects by Al Jubair Hossain" />
      <link rel="icon" type="image/png" href="/favicon.png" />

      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
        {/* 🔹 Navbar */}
        <nav className="sticky top-0 z-50 bg-gray-100 dark:bg-gray-800 shadow-md p-4">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <NavLink to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
              SkillTracker
            </NavLink>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              {[
                { path: "/", name: "Home" },
                { path: "/projects", name: "Projects" },
                { path: "/resume", name: "Resume" },
                { path: "/contact", name: "Contact" },
                { path: "/about", name: "About" },
                { path: "/share-resume", name: "📄 Share Resume" },
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
              {/* Theme Toggle */}
              <button
                onClick={() => setDarkMode((prev) => !prev)}
                className="p-2 bg-gray-300 dark:bg-gray-700 rounded-full"
              >
                {darkMode ? <BsSun className="text-yellow-500" /> : <BsMoonStarsFill className="text-blue-600" />}
              </button>

              {/* Auth */}
              {user ? (
                <>
                  <span className="hidden sm:inline text-sm text-gray-700 dark:text-gray-300">{user.email}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <NavLink
                    to="/auth?mode=login"
                    className="text-blue-500 dark:text-blue-400 underline text-sm hover:text-blue-600"
                  >
                    Login
                  </NavLink>
                  <span className="text-gray-400 dark:text-gray-500">|</span>
                  <NavLink
                    to="/auth?mode=register"
                    className="text-blue-500 dark:text-blue-400 underline text-sm hover:text-blue-600"
                  >
                    Register
                  </NavLink>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden text-2xl p-2"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <HiX /> : <HiOutlineMenu />}
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          {menuOpen && (
            <div className="md:hidden mt-4 flex flex-col gap-3 px-4">
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
                  className="text-sm text-gray-800 dark:text-gray-200"
                  onClick={() => setMenuOpen(false)}
                >
                  {name}
                </NavLink>
              ))}

              {!user && (
                <div className="flex flex-col gap-2 mt-2">
                  <NavLink
                    to="/auth?mode=login"
                    onClick={() => setMenuOpen(false)}
                    className="text-blue-500 underline text-sm"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/auth?mode=register"
                    onClick={() => setMenuOpen(false)}
                    className="text-blue-500 underline text-sm"
                  >
                    Register
                  </NavLink>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Page Routing */}
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
            <Route path="/share-resume" element={<ShareResume />} />
            <Route path="/resume/:username" element={<PublicResume />} />
            <Route
              path="/publish"
              element={
                user ? (
                  <PublishResume user={user} />
                ) : (
                  <Navigate to="/auth" replace />
                )
              }
            />
          </Routes>
        )}

        <Analytics />
        <Footer />
      </div>
    </>
  );
}

export default App;
