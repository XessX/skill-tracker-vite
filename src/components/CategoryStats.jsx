import { CATEGORY_LIST, CATEGORY_COLORS } from "../constants/categories";

function CategoryStats({ skills }) {
  const categoryCounts = CATEGORY_LIST.map((cat) => {
    const count = skills.filter((s) => s.category === cat).length;
    return { name: cat, count };
  }).filter((c) => c.count > 0); // only show used

  const total = categoryCounts.reduce((sum, c) => sum + c.count, 0);

  if (total === 0) return null;

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">📊 Skills by Category</h3>

      <div className="space-y-2">
        {categoryCounts.map(({ name, count }) => {
          const percent = ((count / total) * 100).toFixed(0);
          return (
            <div key={name}>
              <div className="flex justify-between text-sm text-gray-300 dark:text-gray-400">
                <span>{name}</span>
                <span>{percent}%</span>
              </div>

              <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-3 ${CATEGORY_COLORS[name] || "bg-gray-500"} transition-all duration-500`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryStats;
