import { motion } from "framer-motion";

function SkillItem({ skill, onRemove }) {
  const formattedTime = skill.createdAt
    ? new Date(skill.createdAt.seconds * 1000).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "⏳ Unknown";

  const categoryColors = {
    Frontend: "bg-blue-500",
    Backend: "bg-green-500",
    DevOps: "bg-purple-500",
    Mobile: "bg-yellow-500",
    Cloud: "bg-cyan-500",
    Database: "bg-pink-500",
    "Machine Learning": "bg-orange-500",
    Other: "bg-gray-500",
  };

  return (
    <motion.li
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -10, position: "absolute" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      layout
      className="flex justify-between items-start bg-gray-200 dark:bg-gray-700 px-4 py-3 rounded-md shadow-sm text-black dark:text-white"
    >
      <div>
        <div className="font-semibold flex items-center flex-wrap gap-2">
          {skill.name}
          <span
            className={`px-2 py-1 rounded text-xs text-white ${categoryColors[skill.category] || "bg-gray-500"}`}
          >
            {skill.category}
          </span>
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
          {formattedTime}
        </div>
      </div>

      <button
        onClick={onRemove}
        className="text-red-500 hover:text-red-700 transition mt-1"
        title="Remove skill"
      >
        ❌
      </button>
    </motion.li>
  );
}

export default SkillItem;
