import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { Title, Meta } from 'react-head';

const quotes = [
  "Transforming ideas into code 💡",
  "Engineer by mind, artist by execution 🎨",
  "Bringing joy through software 🌟",
];

function Resume() {
  const [tab, setTab] = useState("summary");
  const [quoteIndex, setQuoteIndex] = useState(0);

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
          <p className="text-lg">
            I'm <strong>Al Jubair</strong>, a result-driven developer blending engineering precision with creative solutions. I specialize in full-stack web development, machine learning, and gamified UX — always aiming to build things that make a difference.
          </p>
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
                { label: "PostgreSQL", level: 65, color: "bg-green-500" },
                { label: "Firestore", level: 70, color: "bg-green-400" },
                { label: "PyTorch", level: 85, color: "bg-green-400" },
                { label: "scikit-learn", level: 80, color: "bg-green-400" },
                { label: "OpenCV", level: 70, color: "bg-green-400" },
                { label: "XGBoost", level: 80, color: "bg-green-500" },
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

        {tab === "experience" && (
          <div className="space-y-6 text-md">
            <div>
              <h3 className="font-bold text-lg">📊 Data Analyst Intern – Shelby’s, McMaster | 2024</h3>
              <ul className="list-disc list-inside ml-4 text-gray-300 dark:text-gray-400">
                <li>Automated data analysis workflows using Python & SQL</li>
                <li>Built interactive dashboards with Power BI for stakeholders</li>
                <li>Boosted acquisition decision accuracy by 20% via insights</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg">🎮 Software Developer – Berger Paints | 2022</h3>
              <ul className="list-disc list-inside ml-4 text-gray-300 dark:text-gray-400">
                <li>Developed Unity-based gamified marketing app with 100K+ users</li>
                <li>Integrated React & WebDriverIO for testing and automation</li>
                <li>Contributed to modernizing dealer network efficiency</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg">🧠 Creative Intern – Asiatic JWT | 2020</h3>
              <ul className="list-disc list-inside ml-4 text-gray-300 dark:text-gray-400">
                <li>Created AR/VR demos for Nestlé, Unilever using web 3D</li>
                <li>Enhanced pitch success rates with immersive mockups</li>
              </ul>
            </div>
          </div>
        )}

        {tab === "education" && (
          <div className="space-y-2 text-lg">
            <p><strong>🎓 McMaster University</strong> – M.Eng. in Computing & Software (2023–2024)</p>
            <p><strong>🎓 AIUB</strong> – B.Sc. in Computer Engineering (2015–2020)</p>
          </div>
        )}

        {tab === "projects" && (
          <ul className="space-y-4 text-md">
            <li>
              <strong>🖐 3D Hand Reconstruction</strong> – Machine Learning, Deep Learning, PyTorch, MediaPipe<br />
              <a href="https://macsphere.mcmaster.ca/handle/11375/30207" className="text-blue-400 underline" target="_blank">MacSphere Thesis</a>
            </li>
            <li>
              <strong>💰 Income Prediction App</strong> – Pandas, XGBoost, EDA, Random Forest<br />
              <a href="https://github.com/XessX/Comprehensive-Data-Analysis-and-Model-Development-for-Income-Prediction-Using-Random-Forest" className="text-blue-400 underline" target="_blank">GitHub Repo</a>
            </li>
            <li>
              <strong>🎮 Angry Bird Physics Engine</strong> – C++, SFML<br />
              <a href="https://github.com/XessX/Angry_Bird_Alike" className="text-blue-400 underline" target="_blank">Source Code</a>
            </li>
            <li>
              <strong>🍱 Food Classification CNN</strong> – PyTorch, OpenCV, CNN<br />
              <a href="https://github.com/XessX/cnn_based_food_classification" className="text-blue-400 underline" target="_blank">Model Code</a>
            </li>
          </ul>
        )}

        {tab === "playground" && (
          <div className="text-center">
            <p className="text-xl font-semibold mb-3">🎮 React Mini Playground: Click Counter</p>
            <PlaygroundCounter />
            <FunActivityQuote />
          </div>
        )}

        {tab === "links" && (
        <ul className="space-y-2 text-md">
            <li className="flex items-center gap-2"><FaEnvelope /> aljubair707@gmail.com</li>
            <li className="flex items-center gap-2"><FaGithub /><a href="https://github.com/XessX" className="text-blue-400 underline">github.com/XessX</a></li>
            <li className="flex items-center gap-2"><FaLinkedin /><a href="https://www.linkedin.com/in/al-jubair-hossain-2ab89011b/" className="text-blue-400 underline">LinkedIn Profile</a></li>
            <li className="flex items-center gap-2"><MdDownload /><a href="/Al_Jubair_Hossain_Resume.pdf" className="text-green-400 underline" download>Download PDF Resume</a></li>
            <li className="flex items-center gap-2"><MdDownload /><a href="/AlJubair.vcf" className="text-purple-400 underline" download>Save Contact (vCard)</a></li>
            <div className="mt-6 text-center">
            <h3 className="font-bold text-md mb-2">📊 My GitHub Activity</h3>
            <img
                src="https://github-readme-stats.vercel.app/api?username=XessX&show_icons=true&theme=react"
                alt="GitHub Stats"
                className="mx-auto rounded-lg shadow-md w-full max-w-md"
            />
            </div>
        </ul>
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
