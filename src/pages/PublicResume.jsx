import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaTrash } from "react-icons/fa";
import { Title, Meta } from "react-head";
import html2pdf from "html2pdf.js";
import { auth } from "../firebase";

export default function PublicResume() {
  const { username } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const resumeRef = useRef();

  useEffect(() => {
    const fetchResume = async () => {
      const snapshot = await getDoc(doc(db, "public_resumes", username));
      if (snapshot.exists()) {
        const resume = snapshot.data();
        setData({
          skills: [],
          experience: [],
          education: [],
          projects: [],
          sectionOrder: ["summary", "skills", "experience", "education", "projects"],
          ...resume,
        });
      }
      setLoading(false);
    };

    fetchResume();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, [username]);

  const isOwner = currentUser?.email === data?.email;
  const initials = data?.fullName?.split(" ").map((n) => n[0]).join("").toUpperCase();

  const handleDownloadPDF = () => {
    html2pdf().from(resumeRef.current).set({
      margin: 0.5,
      filename: `${username}-resume.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    }).save();
  };

  const handleDelete = async () => {
    if (!confirm("⚠️ Are you sure you want to delete this public resume?")) return;
    try {
      await deleteDoc(doc(db, "public_resumes", username));
      alert("✅ Resume deleted.");
      window.location.href = "/";
    } catch (error) {
      alert("❌ Failed to delete: " + error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500 dark:text-gray-400">
        🔄 Loading resume...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-20 text-gray-500 dark:text-gray-300">
        <h2 className="text-2xl font-bold mb-2">❌ Resume Not Found</h2>
        <p>Please check the link or try again later.</p>
      </div>
    );
  }

  const sectionLabels = {
    summary: "📝 Summary",
    skills: "🛠 Skills",
    experience: "💼 Experience",
    education: "🎓 Education",
    projects: "🚀 Projects",
  };

  const SectionWrapper = ({ label, children }) => (
    <div className="mb-10">
      <h2 className="text-xl font-bold mb-2">{label}</h2>
      <hr className="border-t border-gray-300 dark:border-gray-700 mb-4" />
      {children}
    </div>
  );

  const sectionRenderers = {
    summary: () =>
      data.summary && (
        <SectionWrapper label={sectionLabels.summary}>
          <p className="text-gray-700 dark:text-gray-300 text-[15px] leading-relaxed">{data.summary}</p>
        </SectionWrapper>
      ),

    skills: () =>
      <SectionWrapper label={sectionLabels.skills}>
        {data.skills?.length ? (
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-[14px]">
            {data.skills.map((s, i) => (
              <li key={i} className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded shadow-sm">
                {s.name} <span className="text-xs text-gray-500">({s.category})</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-400">No skills found.</p>
        )}
      </SectionWrapper>,

    experience: () =>
      data.experience?.length > 0 && (
        <SectionWrapper label={sectionLabels.experience}>
          <ul className="space-y-2 text-[14px]">
            {data.experience.map((exp, i) => (
              <li key={i}>
                <strong>{exp.role}</strong> – {exp.company} ({exp.year})
                {Array.isArray(exp.details) && exp.details.length > 0 && (
                  <ul className="list-disc ml-5 mt-1">
                    {exp.details.map((d, idx) => (
                      <li key={idx}>{d}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </SectionWrapper>
      ),

    education: () =>
      data.education?.length > 0 && (
        <SectionWrapper label={sectionLabels.education}>
          <ul className="space-y-2 text-[14px]">
            {data.education.map((edu, i) => (
              <li key={i}>
                <strong>{edu.institution}</strong> – {edu.degree} ({edu.year})
              </li>
            ))}
          </ul>
        </SectionWrapper>
      ),

    projects: () =>
      data.projects?.length > 0 && (
        <SectionWrapper label={sectionLabels.projects}>
          <ul className="space-y-3 text-[14px]">
            {data.projects.map((proj, i) => (
              <li key={i}>
                <strong>{proj.title}</strong>: {proj.description}
                {proj.url && (
                  <div>
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline text-xs"
                    >
                      🔗 {proj.url}
                    </a>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </SectionWrapper>
      ),
  };

  return (
    <>
      <Title>{data.fullName} | Resume</Title>
      <Meta name="description" content={`Resume of ${data.fullName}`} />

      <div className="max-w-4xl mx-auto my-10 px-6">
        <div ref={resumeRef} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow">
                {initials}
              </div>
              <div>
                <h1 className="text-3xl font-bold">{data.fullName}</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">{data.email}</p>
                <p className="text-lg font-semibold text-blue-600 mt-1">{data.role}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={handleDownloadPDF} className="text-blue-600 hover:text-blue-800 text-xl" title="Download PDF">
                <FaDownload />
              </button>
              {isOwner && (
                <button onClick={handleDelete} className="text-red-600 hover:text-red-800 text-xl" title="Delete Resume">
                  <FaTrash />
                </button>
              )}
            </div>
          </div>

          {/* Tagline */}
          {data.tagline && (
            <blockquote className="italic text-gray-600 dark:text-gray-400 mb-6 border-l-4 border-blue-400 pl-4 text-[15px]">
              “{data.tagline}”
            </blockquote>
          )}

          {/* Social Links */}
          <div className="flex gap-4 text-xl mb-6">
            {data.github && (
              <a href={data.github} target="_blank" rel="noreferrer" className="hover:text-gray-900 dark:hover:text-white">
                <FaGithub />
              </a>
            )}
            {data.linkedin && (
              <a href={data.linkedin} target="_blank" rel="noreferrer" className="hover:text-blue-600">
                <FaLinkedin />
              </a>
            )}
            <a href={`mailto:${data.email}`} className="hover:text-red-500">
              <FaEnvelope />
            </a>
          </div>

          {/* Ordered Dynamic Sections */}
          {(data.sectionOrder || ["summary", "skills", "experience", "education", "projects"]).map((sectionKey) =>
            sectionRenderers[sectionKey]?.()
          )}

          {/* Footer */}
          <div className="pt-6 mt-8 border-t border-gray-300 dark:border-gray-600 text-sm text-gray-500 dark:text-gray-400 text-center">
            © {new Date().getFullYear()} Al Jubair Hossain
          </div>
        </div>
      </div>
    </>
  );
}
