import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { Title, Meta } from 'react-head';
import JobTimeline from "../components/JobTimeline";
import EducationTimeline from "../components/EducationTimeline";

const quotes = [
  "Transforming ideas into code 💡",
  "Engineer by mind, artist by execution 🎨",
  "Bringing joy through software 🌟",
];

function Resume() {
  const [tab, setTab] = useState("summary");
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [githubTheme, setGithubTheme] = useState("github_light");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setGithubTheme(isDark ? "react" : "github_light");
  }, []);
  
  const sections = [
    { key: "summary", label: "🧠 Summary" },
    { key: "skills", label: "🛠 Skills" },
    { key: "experience", label: "💼 Experience" },
    { key: "education", label: "🎓 Education" },
    { key: "projects", label: "🚀 Projects" },
    { key: "playground", label: "🎮 Playground" },
    { key: "links", label: "🔗 Links" },
  ];

  const tabStyle = (active) =>
    `px-4 py-2 rounded-full text-sm font-semibold transition ${
      active
        ? "bg-blue-600 text-white"
        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
    }`;

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((i) => (i + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
    <Title>Resume | Al Jubair Hossain</Title>
    <Meta name="description" content="Interactive resume of Al Jubair showcasing skills, experience, and more." />

    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-6 font-sans text-[16px] sm:text-[17px]">
      <h1 className="text-4xl font-extrabold mb-1 text-center">👨‍💻 Al Jubair Hossain</h1>
      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">
        Software Engineer | Data Scientist | Full-Stack Developer
      </p>
      <p className="text-center italic text-blue-400 dark:text-blue-300 mb-6">
        “{quotes[quoteIndex]}”
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {sections.map((sec) => (
          <button
            key={sec.key}
            onClick={() => setTab(sec.key)}
            className={tabStyle(tab === sec.key)}
          >
            {sec.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-4xl mx-auto"
      >
        {tab === "summary" && (
        <div className="space-y-4 text-lg leading-relaxed">
            <p>
            👋 Hi, I'm <strong>Al Jubair Hossain</strong> — a passionate <span className="text-blue-500">Software Engineer</span> and <span className="text-green-500">Data Scientist</span> focused on building high-impact solutions that are not only smart but also intuitive and joyful to use.
            </p>

            <p>
            With a solid foundation in <strong>full-stack web development</strong> and <strong>machine learning</strong>, I love blending creativity with code — whether it's crafting interactive dashboards, designing gamified user experiences, or scaling web apps with real-time features.
            </p>

            <p>
            I'm currently pursuing my Master’s in Computing and Software at <strong>McMaster University</strong>, and my journey has taken me through exciting internships in data analysis, software development, and creative technologies like AR/VR.
            </p>

            <p>
            I work with <span className="text-blue-400">React</span>, <span className="text-yellow-500">Python</span>, <span className="text-purple-400">Firebase</span>, and <span className="text-green-400">ML tools</span> like PyTorch and XGBoost — always with an eye on performance, scalability, and elegance.
            </p>

            <p className="italic text-sm text-gray-500 dark:text-gray-400">
            🚀 Let’s build the future — one clean line of code at a time.
            </p>
        </div>
        )}

        {tab === "skills" && (
        <div className="space-y-8">

            {/* 🌐 Overview List */}
            <div>
            <h3 className="text-xl font-bold mb-2">🛠 Tools & Technologies</h3>
            <ul className="list-disc list-inside space-y-1 text-md sm:text-lg pl-3">
                <li><strong>Languages:</strong> Python, JavaScript, C++, C#, HTML, CSS</li>
                <li><strong>Frontend:</strong> React, Tailwind CSS, Framer Motion</li>
                <li><strong>Backend:</strong> Node.js, Firebase</li>
                <li><strong>Databases:</strong> MongoDB, PostgreSQL, Firestore</li>
                <li><strong>ML / AI:</strong> PyTorch, scikit-learn, OpenCV, XGBoost</li>
                <li><strong>Testing:</strong> WebDriverIO, Katalon Studio</li>
                <li><strong>Tools:</strong> Git, GitHub, Docker, Jupyter, Excel, Power BI</li>
                <li><strong>DevOps & Cloud:</strong> CI/CD, Firebase Hosting, GCP, Netlify</li>
            </ul>
            </div>

            {/* 📊 Skill Level Bars */}
            <div>
            <h3 className="text-xl font-bold mb-3 mt-6">📈 Proficiency Level</h3>
            <div className="space-y-5">
                {[
                { label: "Python", level: 95, color: "bg-green-400" },
                { label: "JavaScript", level: 90, color: "bg-green-400" },
                { label: "C++", level: 60, color: "bg-green-500" },
                { label: "C#", level: 60, color: "bg-green-500" },
                { label: "React", level: 80, color: "bg-green-500" },
                { label: "Tailwind CSS", level: 80, color: "bg-green-400" },
                { label: "Node.js", level: 80, color: "bg-green-500" },
                { label: "Firebase", level: 80, color: "bg-green-400" },
                { label: "MongoDB", level: 80, color: "bg-green-400" },
                { label: "PostgreSQL", level: 70, color: "bg-green-500" },
                { label: "Firestore", level: 70, color: "bg-green-400" },
                { label: "PyTorch", level: 80, color: "bg-green-400" },
                { label: "scikit-learn", level: 80, color: "bg-green-400" },
                { label: "OpenCV", level: 60, color: "bg-green-400" },
                { label: "XGBoost", level: 70, color: "bg-green-500" },
                { label: "Docker", level: 50, color: "bg-green-600" },
                { label: "Git / GitHub", level: 85, color: "bg-green-400" },
                { label: "CI / CD", level: 70, color: "bg-green-600" },
                { label: "Jupyter", level: 90, color: "bg-green-300" },
                { label: "WebDriverIO", level: 75, color: "bg-green-400" },
                { label: "Katalon Studio", level: 75, color: "bg-green-400" },
                { label: "Excel", level: 88, color: "bg-green-400" },
                { label: "Power BI", level: 82, color: "bg-green-400" },
                ].map((skill, i) => (
                <div key={i}>
                    <div className="flex justify-between mb-1">
                    <span className="font-semibold">{skill.label}</span>
                    <span className="text-sm text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="relative w-full h-3 rounded bg-gray-300 dark:bg-gray-700 overflow-hidden mb-3">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                        className={`h-full ${skill.color}`}
                    />
                    </div>
                </div>
                ))}
            </div>
            </div>
        </div>
        )}

        {tab === "experience" && <JobTimeline />}

        {tab === "education" && <EducationTimeline />}

        {tab === "projects" && (
        <div className="grid md:grid-cols-2 gap-6">
            {[
            {
                title: "🖐 3D Hand Reconstruction",
                tech: "Machine Learning, Deep Learning, PyTorch, MediaPipe",
                link: "https://macsphere.mcmaster.ca/handle/11375/30207",
                label: "MacSphere Thesis",
            },
            {
                title: "💰 Income Prediction App",
                tech: "Pandas, XGBoost, EDA, Random Forest",
                link: "https://github.com/XessX/Comprehensive-Data-Analysis-and-Model-Development-for-Income-Prediction-Using-Random-Forest",
                label: "GitHub Repo",
            },
            {
                title: "🎮 Angry Bird Physics Engine",
                tech: "C++, SFML",
                link: "https://github.com/XessX/Angry_Bird_Alike",
                label: "Source Code",
            },
            {
                title: "🍱 Food Classification CNN",
                tech: "PyTorch, OpenCV, CNN",
                link: "https://github.com/XessX/cnn_based_food_classification",
                label: "Model Code",
            },
            {
                title: "📘 Skill Tracker App",
                tech: "React, Firebase, Tailwind CSS, Chart.js",
                link: "https://github.com/XessX/skill-tracker-vite",
                live: "https://skill-tracker-vite.vercel.app",
                label: "GitHub & Live",
            },
            ].map((project, idx) => (
            <div
                key={idx}
                className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg p-5 shadow hover:shadow-xl transition"
            >
                <h3 className="text-lg font-bold text-blue-500 dark:text-blue-400 mb-1">{project.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{project.tech}</p>
                <div className="space-x-3">
                {project.link && (
                    <a
                    href={project.link}
                    target="_blank"
                    className="text-blue-400 underline text-sm"
                    >
                    GitHub
                    </a>
                )}
                {project.live && (
                    <a
                    href={project.live}
                    target="_blank"
                    className="text-green-400 underline text-sm"
                    >
                    Live Site
                    </a>
                )}
                </div>
            </div>
            ))}
        </div>
        )}

        {tab === "playground" && (
          <div className="text-center">
            <p className="text-xl font-semibold mb-3">🎮 React Mini Playground: Click Counter</p>
            <PlaygroundCounter />
            <FunActivityQuote />
          </div>
        )}

        {tab === "links" && (
        <div className="space-y-6 text-md">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
            <a href="mailto:aljubair707@gmail.com" className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-200 transition">
                <FaEnvelope className="mx-auto text-2xl text-blue-500 mb-2" />
                <p className="text-sm font-semibold">aljubair707@gmail.com</p>
            </a>
            <a href="https://github.com/XessX" target="_blank" className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-200 transition">
                <FaGithub className="mx-auto text-2xl text-black dark:text-white mb-2" />
                <p className="text-sm font-semibold">GitHub</p>
            </a>
            <a href="https://www.linkedin.com/in/al-jubair-hossain-2ab89011b/" target="_blank" className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-200 transition">
                <FaLinkedin className="mx-auto text-2xl text-blue-600 mb-2" />
                <p className="text-sm font-semibold">LinkedIn</p>
            </a>
            <a href="/Al_Jubair_Hossain_Resume.pdf" download className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-200 transition">
                <MdDownload className="mx-auto text-2xl text-green-500 mb-2" />
                <p className="text-sm font-semibold">Download Resume</p>
            </a>
            <a href="/AlJubair.vcf" download className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-200 transition">
                <MdDownload className="mx-auto text-2xl text-purple-400 mb-2" />
                <p className="text-sm font-semibold">Save vCard</p>
            </a>
            </div>

            <div className="mt-6 text-center">
            <h3 className="font-bold text-lg mb-2 text-blue-500">📊 My GitHub Activity</h3>
            <img
            src={`https://github-readme-stats.vercel.app/api?username=XessX&show_icons=true&theme=${githubTheme}`}
            alt="GitHub Stats"
            className="mx-auto rounded-lg shadow-md w-full max-w-md"
            />
            </div>
        </div>
        )}
      </motion.div>
    </div>
    </>
  );
}

    function PlaygroundCounter() {
        const [count, setCount] = useState(0);
        return (
            <div className="flex flex-col items-center gap-2">
            <p className="text-2xl font-bold text-blue-500">Score: {count}</p>
            <div className="flex gap-3">
                <button onClick={() => setCount(count + 1)} className="px-4 py-2 bg-green-500 text-white rounded">➕ Add</button>
                <button onClick={() => setCount(0)} className="px-4 py-2 bg-red-500 text-white rounded">🔁 Reset</button>
            </div>
            </div>
        );
    }

    function FunActivityQuote() {
        const fallbackActivities = [
          "Build something unusual with React today ⚛️",
          "Take a break and automate a boring task 🛠️",
          "Write a new unit test for something fun 🔍",
          "Refactor a messy component for joy ✨",
        ];
      
        const [activity, setActivity] = useState("");
      
        useEffect(() => {
          fetch("https://catfact.ninja/fact")
            .then((res) => res.json())
            .then((data) => {
              setActivity(data.fact);
            })
            .catch(() => {
              setActivity(
                fallbackActivities[Math.floor(Math.random() * fallbackActivities.length)]
              );
            });
        }, []);
      
        return (
          <div className="text-sm text-blue-400 dark:text-blue-300 italic mt-6 text-center">
            💡 Tip: {activity}
          </div>
        );
      }      

export default Resume;
