// src/components/JobTimeline.jsx

import { FaPaintBrush, FaBrain, FaChartLine } from "react-icons/fa";
import { MdWork } from "react-icons/md";

const jobs = [
  {
    title: "Data Analyst Intern",
    company: "Shelby’s McMaster",
    year: "2024",
    icon: <FaChartLine className="text-blue-500 text-xl" />,
    details: [
      "Automated data collection using Python & SQL (40% faster)",
      "Built dashboards and insights using Power BI & Pandas",
      "Boosted customer acquisition insights by 20%",
      "Analyzed SEO & engagement data to support growth strategy",
    ],
  },
  {
    title: "Software Developer Intern",
    company: "Berger Paints LTD",
    year: "2022",
    icon: <MdWork className="text-green-500 text-xl" />,
    details: [
      "Implemented ‘Somporko App’ in Unity (100K+ downloads)",
      "Integrated React & WebDriverIO automation testing",
      "Improved profit & inventory management pipeline",
      "Closed 5+ business deals worth over $50K each",
    ],
  },
  {
    title: "Creative Specialist Intern",
    company: "Asiatic JWT",
    year: "2020",
    icon: <FaPaintBrush className="text-pink-500 text-xl" />,
    details: [
      "Developed 5+ AR apps for Nestlé, Unilever, and IDLC",
      "Built interactive prototypes using Unity + OpenCV",
      "Helped secure campaigns with $30K+ per deal",
    ],
  },
];

export default function JobTimeline() {
  return (
    <div className="p-6 md:p-10 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border dark:border-gray-700">
      <h2 className="text-3xl font-bold mb-8 text-blue-600 dark:text-blue-400">💼 Experience Timeline</h2>

      <ol className="relative border-l-2 border-gray-300 dark:border-gray-600">
        {jobs.map((job, idx) => (
          <li key={idx} className="mb-10 ml-6">
            {/* Icon */}
            <span className="absolute flex items-center justify-center w-9 h-9 bg-white dark:bg-gray-900 border-2 border-blue-500 rounded-full -left-4 shadow">
              {job.icon}
            </span>

            {/* Content */}
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-300">{job.title}</h3>
            <p className="text-md font-medium text-gray-700 dark:text-gray-400">{job.company} — {job.year}</p>
            <ul className="list-disc list-inside text-[15px] text-gray-700 dark:text-gray-300 mt-2 space-y-1">
              {job.details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
