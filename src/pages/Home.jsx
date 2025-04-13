import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
import ClearButton from "../components/ClearButton";
import SkillProgress from "../components/SkillProgress";
import CategoryStats from "../components/CategoryStats";
import CategoryChart from "../components/CategoryChart";
import SkillInput from "../components/SkillInput";
import SkillList from "../components/SkillList";
import { CATEGORY_LIST } from "../constants/categories";
import { Title, Meta } from "react-head";

function Home({ user, loading }) {
  const isGuest = !user || !user.uid;
  const [skills, setSkills] = useState([]);
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("Frontend");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");

  const userSkillsRef = user
    ? collection(db, "users", user.uid, "skills")
    : null;

  // 🔁 Load guest skills
  useEffect(() => {
    if (!loading && isGuest) {
      const saved = localStorage.getItem("guestSkills");
      if (saved) setSkills(JSON.parse(saved));
    }
  }, [loading, isGuest]);

  // 💾 Save guest skills
  useEffect(() => {
    if (isGuest) {
      localStorage.setItem("guestSkills", JSON.stringify(skills));
    }
  }, [skills, isGuest]);

  // 🔁 Real-time sync for logged-in
  useEffect(() => {
    if (isGuest || !userSkillsRef) return;

    const q = query(userSkillsRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSkills(data);
      localStorage.setItem("userSkills", JSON.stringify(data)); // cache
    });

    return () => unsubscribe();
  }, [userSkillsRef]);

  // ➕ Add skill
  const addSkill = async () => {
    if (!input.trim()) return toast.error("❌ Skill cannot be empty");

    const exists = skills.some(
      (s) => s.name.toLowerCase() === input.trim().toLowerCase()
    );
    if (exists) return toast.error("⚠️ Skill already exists");

    const newSkill = {
      name: input.trim(),
      category,
      createdAt: new Date(),
    };

    if (isGuest) {
      setSkills((prev) => [{ id: Date.now(), ...newSkill }, ...prev]);
      toast.success("✨ Skill added (not saved)");
    } else {
      await addDoc(userSkillsRef, newSkill);
      toast.success("✅ Skill saved");
    }

    setInput("");
  };

  // ❌ Remove skill
  const removeSkill = async (id) => {
    if (isGuest) {
      setSkills((prev) => prev.filter((skill) => skill.id !== id));
      toast("🗑️ Skill removed");
    } else {
      await deleteDoc(doc(db, "users", user.uid, "skills", id));
      toast("🗑️ Skill removed");
    }
  };

  // 🧹 Clear all
  const clearSkills = async () => {
    const confirmDelete = window.confirm("🧨 Delete ALL your skills?");
    if (!confirmDelete) return;

    if (isGuest) {
      setSkills([]);
      localStorage.removeItem("guestSkills");
      toast.success("🧹 Guest skills cleared!");
    } else {
      const snapshot = await getDocs(userSkillsRef);
      const deletes = snapshot.docs.map((docSnap) =>
        deleteDoc(doc(db, "users", user.uid, "skills", docSnap.id))
      );
      await toast.promise(Promise.all(deletes), {
        loading: "Deleting...",
        success: "✅ All skills cleared!",
        error: "❌ Failed to delete",
      });
    }
  };

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
    <>
      <Title>Skill Tracker | Al Jubair</Title>
      <Meta name="description" content="Track and showcase your skills!" />

      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white py-10 px-4 transition-colors duration-300">
        {/* 🌟 Header */}
        <div className="flex justify-between items-center mb-6 max-w-3xl mx-auto">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-500">
            🚀 Skill Tracker
          </h1>
          <p className="text-md text-gray-500 dark:text-gray-400">
            {isGuest
              ? "You're using guest mode. Log in to save progress and build a nice resume inside!"
              : `Welcome back, ${user?.email}`}
          </p>
        </div>

        {!isGuest && (
          <div className="flex gap-2 mb-6 justify-end">
            <Link to="/publish" className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
              📤 Publish Resume
            </Link>
            <Link to={`/resume/${user.email.split("@")[0]}`} className="bg-green-600 text-white px-4 py-2 rounded text-sm">
              🌍 View Resume
            </Link>
          </div>
        )}

      </div>

        <div className="max-w-xl mx-auto bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg p-6">
          {skills.length > 0 && <ClearButton onClear={clearSkills} />}

          <SkillProgress total={skills.length} />
          <CategoryStats skills={skills} />
          {skills.length > 0 && <CategoryChart skills={skills} />}

          <SkillInput
            input={input}
            setInput={setInput}
            category={category}
            setCategory={setCategory}
            onAddSkill={addSkill}
          />

          {/* 🔍 Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-4 my-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search skills..."
              className="flex-1 px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-3 py-2 rounded"
            >
              <option value="All">All</option>
              {CATEGORY_LIST.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* 🎛 Filter by Category */}
          <div className="flex flex-wrap gap-2 mb-4">
            {["All", ...CATEGORY_LIST].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded text-sm transition-all ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 📦 Skill List */}
          <h3 className="text-xl font-semibold mb-2">Your Skills</h3>
          {filteredSkills.length > 0 ? (
            <SkillList skills={filteredSkills} onRemoveSkill={removeSkill} />
          ) : (
            <p className="text-center text-gray-400">No skills found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
