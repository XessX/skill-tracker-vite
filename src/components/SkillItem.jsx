import { motion } from "framer-motion";
import { CATEGORY_COLORS } from "../constants/categories";

function SkillItem({ skill, onRemove }) {
  const formattedTime = skill.createdAt
  ? new Date(skill.createdAt.seconds ? skill.createdAt.seconds * 1000 : skill.createdAt).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    })
  : "⏳ Unknown";

  

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
            className={`px-2 py-1 rounded text-xs text-white ${CATEGORY_COLORS[skill.category] || "bg-gray-500"}`}
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
