import { useState } from "react";
import { CATEGORY_LIST } from "../constants/categories";

function SkillInput({ input, setInput, category, setCategory, onAddSkill }) {
  const handleAdd = () => {
    onAddSkill(); // handled in parent
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a skill"
        className="flex-1 px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="bg-gray-700 text-white rounded px-2 py-1"
      >
        {CATEGORY_LIST.map((cat) => (
          <option key={cat}>{cat}</option>
        ))}
      </select>

      <button
        onClick={handleAdd}
        disabled={!input.trim()}
        className={`${
          !input.trim()
            ? "bg-gray-400 cursor-not-allowed text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        } px-6 py-2 rounded transition-all`}
      >
        Add Skill
      </button>
    </div>
  );
}

export default SkillInput;
