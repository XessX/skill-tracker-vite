import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useEffect, useState } from "react";

function Footer() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    fetch("https://api.quotable.io/random?tags=technology|inspirational")
      .then((res) => res.json())
      .then((data) => setQuote(data.content))
      .catch(() =>
        setQuote("Code is like humor. When you have to explain it, it’s bad.")
      );
  }, []);

  return (
    <footer className="bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-300 mt-16 pt-8 pb-6 px-6 border-t dark:border-gray-700 text-sm">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
        {/* Left - Quote and Name */}
        <div className="space-y-3">
          <p className="font-semibold text-lg text-blue-500 dark:text-blue-400">
            Al Jubair Hossain
          </p>
          <p className="italic text-gray-500 dark:text-gray-400">"{quote}"</p>
          <p className="text-xs text-gray-400 dark:text-gray-600">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Right - Links */}
        <div className="md:justify-end flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/XessX"
              className="hover:text-blue-500 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="inline" /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/al-jubair-hossain-2ab89011b/"
              className="hover:text-blue-500 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="inline" /> LinkedIn
            </a>
            <a
              href="mailto:aljubair707@gmail.com"
              className="hover:text-blue-500 transition"
            >
              <FaEnvelope className="inline" /> Email
            </a>
          </div>

          <div className="flex gap-4 mt-2">
            <a href="/resume" className="underline text-blue-400">
              Resume
            </a>
            <a href="/projects" className="underline text-blue-400">
              Projects
            </a>
            <a href="/playground" className="underline text-blue-400">
              Playground
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
