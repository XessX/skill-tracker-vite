// src/components/SkillProgress.jsx

function SkillProgress({ total }) {
    const max = 20;
    const percent = Math.min((total / max) * 100, 100).toFixed(0);
  
    const barColor =
      percent < 30
        ? "bg-red-500"
        : percent < 60
        ? "bg-yellow-400"
        : percent < 90
        ? "bg-blue-500"
        : "bg-green-500";
  
    const level =
      total === 0
        ? "Beginner 🐣"
        : total < 5
        ? "Getting Started 🚀"
        : total < 10
        ? "Improving 📈"
        : total < 20
        ? "Skilled 💪"
        : "Expert 🧠";
  
    return (
      <div className="mb-6">
        {/* Label */}
        <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mb-1">
          <span>
            Progress: {total} / {max} skills
            <span className="ml-2 font-semibold text-green-400">{level}</span>
          </span>
          <span className="font-mono text-sm">{percent}%</span>
        </div>
  
        {/* Bar */}
        <div className="relative w-full h-3 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`absolute top-0 left-0 h-3 ${barColor} transition-all duration-500`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    );
  }
  
  export default SkillProgress;
  