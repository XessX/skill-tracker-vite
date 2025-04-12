// src/components/ProjectCard.jsx
function ProjectCard({ title, tech, desc, codeLink, liveLink }) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 hover:shadow-xl transition-all">
        <h3 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{desc}</p>
        <p className="text-xs mb-3 text-gray-500 dark:text-gray-400 italic">{tech}</p>
        <div className="flex gap-3">
          {liveLink && (
            <a href={liveLink} target="_blank" rel="noopener noreferrer"
               className="text-sm text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700">
              🌐 View Project
            </a>
          )}
          {codeLink && (
            <a href={codeLink} target="_blank" rel="noopener noreferrer"
               className="text-sm text-white bg-gray-700 px-3 py-1 rounded hover:bg-black">
              🧠 Source Code
            </a>
          )}
        </div>
      </div>
    );
  }
  
  export default ProjectCard;
  