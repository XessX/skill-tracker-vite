// src/components/CategoryChart.jsx

import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { CATEGORY_LIST, CATEGORY_COLORS_HEX } from "../constants/categories";

ChartJS.register(ArcElement, Tooltip, Legend);

function CategoryChart({ skills }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const dark = document.documentElement.classList.contains("dark");
    setIsDark(dark);
  }, [skills]);

  // ✅ Prepare data per category
  const categoryData = CATEGORY_LIST.map((category) => {
    const count = skills.filter((s) => s.category === category).length;
    return { category, count };
  }).filter((item) => item.count > 0);

  if (categoryData.length === 0) return null;

  // ✅ Chart.js data object
  const data = {
    labels: categoryData.map((item) => item.category),
    datasets: [
      {
        data: categoryData.map((item) => item.count),
        backgroundColor: categoryData.map(
          (item) => CATEGORY_COLORS_HEX[item.category] || "#999"
        ),
        borderColor: "#1f2937",
        borderWidth: 2,
      },
    ],
  };

  // ✅ Chart.js options
  const options = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: isDark ? "#ccc" : "#333",
        },
      },
    },
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
        📊 Category Distribution
      </h3>

      <Pie data={data} options={options} />
    </div>
  );
}

export default CategoryChart;
