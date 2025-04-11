// src/pages/AuthForm.jsx

import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResetSent(false);
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate("/");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  const handleReset = async () => {
    if (!email) return setError("Please enter your email above first.");
    setError("");
    setResetSent(false);

    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-black dark:text-white">
      <h2 className="text-2xl font-bold mb-4">
        {isLogin ? "Login" : "Register"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required={!resetSent}
          className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {resetSent && (
          <p className="text-green-400 text-sm">
            ✅ Password reset email sent!
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
        >
          {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
        </button>
      </form>

      {isLogin && (
        <div className="text-right mt-2">
          <button
            onClick={handleReset}
            className="text-blue-400 text-sm underline"
          >
            Forgot password?
          </button>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setResetSent(false);
            setError("");
          }}
          className="ml-2 text-blue-400 underline"
        >
          {isLogin ? "Register" : "Login"}
        </button>
      </div>
    </div>
  );
}

export default AuthForm;
