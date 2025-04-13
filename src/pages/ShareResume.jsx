// src/pages/ShareResume.jsx

import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const ShareResume = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-8 max-w-4xl mx-auto print:bg-white print:text-black">
        <header className="text-center mb-8 relative">
        <h1 className="text-4xl font-bold text-blue-500">Al Jubair Hossain</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
            Software Engineer | Data Scientist | Full-Stack Developer
        </p>

        <div className="mt-3 flex justify-center gap-4 text-sm">
            <a href="mailto:aljubair707@gmail.com" className="flex items-center gap-1 text-blue-500">
            <FaEnvelope /> aljubair707@gmail.com
            </a>
            <a href="https://github.com/XessX" className="flex items-center gap-1 text-blue-500">
            <FaGithub /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/al-jubair-hossain-2ab89011b/" className="flex items-center gap-1 text-blue-500">
            <FaLinkedin /> LinkedIn
            </a>
        </div>

        {/* 🔘 Print Button */}
        <button
            onClick={() => window.print()}
            className="absolute right-0 top-0 text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded print:hidden"
        >
            🖨️ Print / Save PDF
        </button>
        </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-600 pb-1 mb-2">Summary</h2>
        <p>
          Passionate full-stack engineer with a focus on clean design, interactive systems, and scalable architectures. Experienced in building full-stack apps, data dashboards, machine learning models, and gamified UIs.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-600 pb-1 mb-2">Skills</h2>
        <ul className="list-disc pl-5 space-y-1 text-md">
          <li><strong>Languages:</strong> Python, JavaScript, C++, C#, HTML/CSS</li>
          <li><strong>Frontend:</strong> React, Tailwind CSS, Framer Motion</li>
          <li><strong>Backend:</strong> Node.js, Firebase</li>
          <li><strong>Databases:</strong> MongoDB, PostgreSQL, Firestore</li>
          <li><strong>ML / AI:</strong> PyTorch, scikit-learn, OpenCV, XGBoost</li>
          <li><strong>Tools:</strong> Git, GitHub, Docker, Jupyter, Excel, Power BI</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold border-b pb-1 mb-2">Experience</h2>
        <div className="mb-4">
          <h3 className="font-bold">📊 Data Analyst Intern – Shelby’s, McMaster (2024)</h3>
          <ul className="list-disc list-inside text-sm ml-3">
            <li>Automated workflows using Python, SQL, Google Sheets API</li>
            <li>Created dashboards with Power BI for marketing KPIs</li>
            <li>Enabled 20% better acquisition decisions</li>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="font-bold">🎮 Software Developer Intern – Berger Paints (2022)</h3>
          <ul className="list-disc list-inside text-sm ml-3">
            <li>Built Unity-based gamified marketing app with 100K+ users</li>
            <li>Integrated React & WebdriverIO for QA testing</li>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="font-bold">🧠 Creative Intern – Asiatic JWT (2020)</h3>
          <ul className="list-disc list-inside text-sm ml-3">
            <li>Built 5+ immersive AR/VR demos for top brands</li>
            <li>Delivered client-facing prototypes that won pitches</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold border-b pb-1 mb-2">Projects</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>3D Hand Reconstruction</strong> – PyTorch, MediaPipe
            <br /><a href="https://macsphere.mcmaster.ca/handle/11375/30207" className="text-blue-400 underline">Thesis Link</a>
          </li>
          <li>
            <strong>Income Prediction App</strong> – XGBoost, EDA, Random Forest
            <br /><a href="https://github.com/XessX/Comprehensive-Data-Analysis-and-Model-Development-for-Income-Prediction-Using-Random-Forest" className="text-blue-400 underline">GitHub</a>
          </li>
          <li>
            <strong>Angry Bird Physics Engine</strong> – C++, SFML
            <br /><a href="https://github.com/XessX/Angry_Bird_Alike" className="text-blue-400 underline">Source Code</a>
          </li>
          <li>
            <strong>SkillTracker (This Site)</strong> – React, Firebase, Tailwind
            <br /><a href="https://skill-tracker-vite.vercel.app" className="text-blue-400 underline">Live</a> | <a href="https://github.com/XessX/skill-tracker-vite" className="text-blue-400 underline">Repo</a>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold border-b pb-1 mb-2">Education</h2>
        <p className="mb-2"><strong>🎓 McMaster University</strong> – M.Eng. in Computing & Software (2023–2024)</p>
        <p><strong>🎓 AIUB</strong> – B.Sc. in Computer Engineering (2015–2020)</p>
      </section>
    </div>
  );
};

export default ShareResume;
