import { useState, useEffect, useRef } from "react";

export default function HookPlayground() {
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);
  const renderCount = useRef(1);

  useEffect(() => {
    renderCount.current += 1;
  });

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl text-left text-black dark:text-white shadow-lg w-full max-w-xl mx-auto mt-6">
      <h2 className="text-xl font-bold text-blue-500 mb-4">🧪 React Hook Playground</h2>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">📝 Enter Name:</label>
        <input
          className="w-full px-4 py-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">👋 Hello, {name || "stranger"}!</p>
      </div>

      <div className="mb-4">
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded mr-3"
        >
          ➕ Click Me ({count})
        </button>
        <button
          onClick={() => setCount(0)}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
        >
          🔁 Reset
        </button>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400">🔄 Rendered: {renderCount.current} times</p>
    </div>
  );
}
