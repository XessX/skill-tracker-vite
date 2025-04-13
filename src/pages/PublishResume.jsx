import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {
  doc,
  setDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { toast } from "react-hot-toast";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Sortable wrapper
function SortableCard({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative mb-8">
      <div
        {...attributes}
        {...listeners}
        className="absolute right-2 top-2 text-gray-500 hover:text-blue-500 cursor-grab text-lg"
      >
        ⠿
      </div>
      {children}
      <hr className="mt-6 border-t border-gray-300 dark:border-gray-700" />
    </div>
  );
}

function PublishResume({ user }) {
  const navigate = useNavigate();
  const defaultUsername = user?.email?.split("@")[0] || "";

  const [username] = useState(defaultUsername);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState("Full Stack Developer");
  const [tagline, setTagline] = useState("");
  const [summary, setSummary] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([{ role: "", company: "", year: "" }]);
  const [education, setEducation] = useState([{ institution: "", degree: "", year: "" }]);
  const [projects, setProjects] = useState([{ title: "", description: "", url: "" }]);

  const [sectionOrder, setSectionOrder] = useState([
    "summary",
    "skills",
    "experience",
    "education",
    "projects",
  ]);

  const sectionLabels = {
    summary: "📝 Summary",
    skills: "🛠 Skills",
    experience: "💼 Experience",
    education: "🎓 Education",
    projects: "🚀 Projects",
  };

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = sectionOrder.indexOf(active.id);
      const newIndex = sectionOrder.indexOf(over.id);
      setSectionOrder((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  // Fetch skills from Firestore tracker
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const snapshot = await getDocs(collection(db, `users/${user.uid}/skills`));
        const userSkills = snapshot.docs.map((doc) => doc.data());
        setSkills(userSkills);
      } catch (err) {
        console.error("Error fetching skills:", err);
        toast.error("⚠️ Failed to load skills.");
      }
    };

    if (user?.uid) fetchSkills();
  }, [user]);

  const handlePublish = async () => {
    if (!username || !fullName || !email) {
      toast.error("⚠️ Please complete all required fields.");
      return;
    }

    try {
      await setDoc(doc(db, "public_resumes", username), {
        fullName,
        email,
        role,
        tagline,
        summary,
        linkedin,
        github,
        skills,
        experience,
        education,
        projects,
        sectionOrder,
      });

      await setDoc(doc(db, `users/${user.uid}/profile/info`), {
        username,
        fullName,
        email,
      });

      toast.success("✅ Resume published!");
      navigate(`/resume/${username}`);
    } catch (err) {
      toast.error("❌ Publish failed: " + err.message);
    }
  };

  const cardStyle =
    "bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow-md";
  const inputClass =
    "text-base w-full p-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white mb-2";

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white px-4 py-10 text-[17px]">
      <div className="max-w-3xl mx-auto space-y-6">
        <h2 className="text-4xl font-bold text-center text-blue-500 mb-8">
          📤 Publish Resume
        </h2>

        {/* 👤 Basic Info */}
        <div className={cardStyle}>
          <h3 className="text-xl font-semibold mb-4">👤 Basic Info</h3>
          <input readOnly value={username} className={inputClass + " cursor-not-allowed"} />
          <input placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputClass} />
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" className={inputClass} />
          <input placeholder="Role / Title" value={role} onChange={(e) => setRole(e.target.value)} className={inputClass} />
          <input placeholder="Tagline" value={tagline} onChange={(e) => setTagline(e.target.value)} className={inputClass} />
          <input placeholder="LinkedIn URL" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className={inputClass} />
          <input placeholder="GitHub URL" value={github} onChange={(e) => setGithub(e.target.value)} className={inputClass} />
        </div>

        {/* 📦 Reorderable Sections */}
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={sectionOrder} strategy={verticalListSortingStrategy}>
            {sectionOrder.map((sectionKey) => (
              <SortableCard key={sectionKey} id={sectionKey}>
                <div className={cardStyle}>
                  <h3 className="text-xl font-semibold mb-3">{sectionLabels[sectionKey]}</h3>

                  {/* Summary */}
                  {sectionKey === "summary" && (
                    <textarea
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      placeholder="Write a short summary..."
                      className={inputClass + " resize-y"}
                      rows={3}
                    />
                  )}

                  {/* Skills */}
                  {sectionKey === "skills" && (
                    <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {(skills || []).length > 0 ? (
                        skills.map((s, i) => (
                          <li key={i} className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded text-sm">
                            {s.name} <span className="text-xs text-gray-500">({s.category})</span>
                          </li>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">No skills from tracker.</p>
                      )}
                    </ul>
                  )}

                  {/* Experience */}
                  {sectionKey === "experience" && (
                    <>
                      {experience.map((item, i) => (
                        <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-2 relative">
                          <input placeholder="Role" value={item.role} onChange={(e) => {
                            const copy = [...experience]; copy[i].role = e.target.value; setExperience(copy);
                          }} className={inputClass} />
                          <input placeholder="Company" value={item.company} onChange={(e) => {
                            const copy = [...experience]; copy[i].company = e.target.value; setExperience(copy);
                          }} className={inputClass} />
                          <input placeholder="Year" value={item.year} onChange={(e) => {
                            const copy = [...experience]; copy[i].year = e.target.value; setExperience(copy);
                          }} className={inputClass} />
                          <button onClick={() => {
                            const copy = [...experience]; copy.splice(i, 1); setExperience(copy);
                          }} className="absolute top-0 right-0 text-red-500">🗑️</button>
                        </div>
                      ))}
                      <button onClick={() => setExperience([...experience, { role: "", company: "", year: "" }])} className="text-blue-500 mt-2 text-sm">
                        ➕ Add Experience
                      </button>
                    </>
                  )}

                  {/* Education */}
                  {sectionKey === "education" && (
                    <>
                      {education.map((item, i) => (
                        <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-2 relative">
                          <input placeholder="Institution" value={item.institution} onChange={(e) => {
                            const copy = [...education]; copy[i].institution = e.target.value; setEducation(copy);
                          }} className={inputClass} />
                          <input placeholder="Degree" value={item.degree} onChange={(e) => {
                            const copy = [...education]; copy[i].degree = e.target.value; setEducation(copy);
                          }} className={inputClass} />
                          <input placeholder="Year" value={item.year} onChange={(e) => {
                            const copy = [...education]; copy[i].year = e.target.value; setEducation(copy);
                          }} className={inputClass} />
                          <button onClick={() => {
                            const copy = [...education]; copy.splice(i, 1); setEducation(copy);
                          }} className="absolute top-0 right-0 text-red-500">🗑️</button>
                        </div>
                      ))}
                      <button onClick={() => setEducation([...education, { institution: "", degree: "", year: "" }])} className="text-blue-500 mt-2 text-sm">
                        ➕ Add Education
                      </button>
                    </>
                  )}

                  {/* Projects */}
                  {sectionKey === "projects" && (
                    <>
                      {projects.map((item, i) => (
                        <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-2 relative">
                          <input placeholder="Title" value={item.title} onChange={(e) => {
                            const copy = [...projects]; copy[i].title = e.target.value; setProjects(copy);
                          }} className={inputClass} />
                          <input placeholder="Description" value={item.description} onChange={(e) => {
                            const copy = [...projects]; copy[i].description = e.target.value; setProjects(copy);
                          }} className={inputClass} />
                          <input placeholder="URL" value={item.url} onChange={(e) => {
                            const copy = [...projects]; copy[i].url = e.target.value; setProjects(copy);
                          }} className={inputClass} />
                          <button onClick={() => {
                            const copy = [...projects]; copy.splice(i, 1); setProjects(copy);
                          }} className="absolute top-0 right-0 text-red-500">🗑️</button>
                        </div>
                      ))}
                      <button onClick={() => setProjects([...projects, { title: "", description: "", url: "" }])} className="text-blue-500 mt-2 text-sm">
                        ➕ Add Project
                      </button>
                    </>
                  )}
                </div>
              </SortableCard>
            ))}
          </SortableContext>
        </DndContext>

        {/* 🚀 Publish Button */}
        <div className="text-center mt-10">
          <button onClick={handlePublish} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded text-lg">
            🚀 Publish Now
          </button>
        </div>

        <div className="text-xs text-center text-gray-400 mt-10">
          © {new Date().getFullYear()} Al Jubair Hossain
        </div>
      </div>
    </div>
  );
}

export default PublishResume;
