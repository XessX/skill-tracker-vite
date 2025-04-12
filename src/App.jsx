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
        <nav className="flex gap-4 p-4 bg-gray-100 dark:bg-gray-800 text-black dark:text-white justify-between shadow-md">
          <div className="flex gap-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/projects" className="hover:underline">Projects</Link>
            <Link to="/resume" className="hover:underline">Resume</Link>
            <Link to="/contact" className="hover:underline">Contact</Link>
            <Link to="/about" className="hover:underline">About</Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-3 py-2 rounded"
            >
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
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
              <Link to="/auth" className="text-blue-500 dark:text-blue-400 underline">
                Login
              </Link>
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
