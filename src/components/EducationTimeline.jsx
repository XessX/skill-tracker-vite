// src/components/EducationTimeline.jsx

import { FaGraduationCap } from "react-icons/fa";

const education = [
  {
    title: "M.Eng. in Computing & Software",
    institution: "McMaster University",
    year: "(2023 – 2024)",
    icon: <FaGraduationCap className="text-indigo-500 text-xl" />,
    details: [
      "Focus on machine learning, software systems, and data engineering",
      "Completed a capstone thesis on 3D hand shape reconstruction",
      "Courses in ML, Project Management, Software Models, data science, and web applications",
    ],
  },
  {
    title: "B.Sc. in Computer Engineering",
    institution: "American International University-Bangladesh (AIUB)",
    year: "(2015 – 2020)",
    icon: <FaGraduationCap className="text-purple-500 text-xl" />,
    details: [
      "Graduated with distinction and a strong academic track",
      "Focused on software development, algorithms, and systems",
      "Built multiple academic projects in C++, JavaScript, Java, and Python",
    ],
  },
];

export default function EducationTimeline() {
  return (
    <div className="p-6 md:p-10 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border dark:border-gray-700">
      <h2 className="text-3xl font-bold mb-8 text-purple-600 dark:text-purple-400">🎓 Education Timeline</h2>

      <ol className="relative border-l-2 border-gray-300 dark:border-gray-600">
        {education.map((edu, idx) => (
          <li key={idx} className="mb-10 ml-6">
            {/* Icon */}
            <span className="absolute flex items-center justify-center w-9 h-9 bg-white dark:bg-gray-900 border-2 border-purple-400 rounded-full -left-4 shadow">
              {edu.icon}
            </span>

            {/* Content */}
            <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-300">{edu.title}</h3>
            <p className="text-md font-medium text-gray-700 dark:text-gray-400">{edu.institution} — {edu.year}</p>
            <ul className="list-disc list-inside text-[15px] text-gray-700 dark:text-gray-300 mt-2 space-y-1">
              {edu.details.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
