import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Auth from "./pages/Auth";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const handleLogout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 🌙 Apply/remove dark mode class
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
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
      {/* 🔹 Navbar */}
      <nav className="flex gap-4 p-4 bg-gray-100 dark:bg-gray-800 text-black dark:text-white justify-between shadow-md">
        <div className="flex gap-4">
          <Link to="/" className="hover:underline">Home</Link>
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
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/"
          element={
            loading ? (
              <div className="p-10 text-center text-gray-800 dark:text-white">Loading...</div>
            ) : user ? (
              <Home user={user} />
            ) : (
              <div className="p-10 text-center bg-white dark:bg-gray-900 text-gray-800 dark:text-white min-h-screen">
                <h2 className="text-2xl font-semibold mb-4">🚫 You must be logged in.</h2>

                <Link
                  to="/auth"
                  className="text-blue-500 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300 block mb-2"
                >
                  Go to Login
                </Link>

                <Link
                  to="/auth"
                  className="text-green-500 dark:text-green-400 underline hover:text-green-700 dark:hover:text-green-300"
                >
                  Or Register here
                </Link>
              </div>
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
