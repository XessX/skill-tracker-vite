import { useEffect, useState } from "react";
import SkillInput from "../components/SkillInput";
import SkillList from "../components/SkillList";
import ClearButton from "../components/ClearButton";
import SkillProgress from "../components/SkillProgress";
import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  doc,
  onSnapshot,
  query,
  orderBy
} from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-hot-toast";

function Home({ user }) {
  const [skills, setSkills] = useState([]);
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("Frontend");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");

  const userSkillsRef = collection(db, "users", user.uid, "skills");

  // 🔁 Real-time sync
  useEffect(() => {
    const q = query(userSkillsRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setSkills(data);
    });

    return () => unsubscribe();
  }, []);

  // ➕ Add skill
  const addSkill = async () => {
    if (!input.trim()) {
      toast.error("❌ Skill cannot be empty");
      return;
    }

    const exists = skills.some(
      (s) => s.name.toLowerCase() === input.trim().toLowerCase()
    );
    if (exists) {
      toast.error("⚠️ Skill already exists");
      return;
    }

    await addDoc(userSkillsRef, {
      name: input.trim(),
      category,
      createdAt: new Date()
    });

    toast.success("✅ Skill added");
    setInput("");
  };

  // ❌ Remove one
  const removeSkill = async (id) => {
    await deleteDoc(doc(db, "users", user.uid, "skills", id));
    toast("🗑️ Skill removed");
  };

  // 🧹 Clear all
  const clearSkills = async () => {
    const confirmDelete = confirm("Delete ALL your skills?");
    if (!confirmDelete) return;

    const snapshot = await getDocs(userSkillsRef);
    const deletes = snapshot.docs.map((docSnap) =>
      deleteDoc(doc(db, "users", user.uid, "skills", docSnap.id))
    );

    await toast.promise(Promise.all(deletes), {
      loading: "Deleting...",
      success: "✅ All skills cleared!",
      error: "❌ Something went wrong",
    });
  };

  // 🔎 Filter logic
  const filteredSkills = skills.filter((skill) => {
    const matchesSearch = skill.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || skill.category === selectedCategory;

    const matchesActiveCategory =
      activeCategory === "All" || skill.category === activeCategory;

    return matchesSearch && matchesCategory && matchesActiveCategory;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white py-10 px-4 transition-colors duration-300">
      <div className="max-w-xl mx-auto bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg p-6">
        {/* 👤 User */}
        <div className="mb-6">
          <h2 className="text-xl text-blue-500 dark:text-blue-400 font-semibold">
            👋 Welcome, {user?.email}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            You're logged in. Add and manage your skills.
          </p>
        </div>

        {skills.length > 0 && <ClearButton onClear={clearSkills} />}

        <SkillProgress total={skills.length} />

        <SkillInput
          input={input}
          setInput={setInput}
          category={category}
          setCategory={setCategory}
          onAddSkill={addSkill}
        />

        {/* 🔍 Search + Category */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search skills..."
            className="flex-1 px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded px-3 py-2"
          >
            <option value="All">All</option>
            <option>Frontend</option>
            <option>Backend</option>
            <option>DevOps</option>
            <option>Mobile</option>
            <option>Cloud</option>
            <option>Database</option>
            <option>Machine Learning</option>
            <option>Other</option>
          </select>
        </div>

        {/* 🎛 Filter buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            "All",
            "Frontend",
            "Backend",
            "DevOps",
            "Cloud",
            "Mobile",
            "Database",
            "Machine Learning",
            "Other"
          ].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded text-sm transition-all ${
                activeCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 📦 Skills */}
        <h3 className="text-xl font-semibold mb-2">Your Skills:</h3>
        {filteredSkills.length > 0 ? (
          <SkillList skills={filteredSkills} onRemoveSkill={removeSkill} />
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">🔍 No matching skills found.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
