// src/pages/About.jsx

function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white font-sans p-10">
      <h1 className="text-3xl font-bold mb-6">👋 Hello there!</h1>

      <p className="mb-4 text-lg">
        I’m <span className="text-blue-500 font-bold">Al Jubair Hossain</span> — a curious mind who loves building things with code. I specialize in <span className="font-semibold">web development, machine learning, and creative problem-solving</span>. Whether it’s a full-stack app or a smart ML model, I love making ideas come to life.
      </p>

      <p className="mb-6">
        I'm currently exploring how AI can reshape the way we build digital products. I thrive on learning, breaking things (on purpose 😅), and improving user experiences one line of code at a time.
      </p>

      <h2 className="text-xl font-semibold mb-2">🧰 Favorite Tools & Tech</h2>
      <ul className="list-disc list-inside mb-6 grid grid-cols-2 gap-2">
        <li>JavaScript (React, Node)</li>
        <li>Python (Scikit-learn, PyTorch)</li>
        <li>Firebase & Firestore</li>
        <li>Tailwind CSS</li>
        <li>Git & GitHub</li>
        <li>Linux & CLI</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">🎓 Education</h2>
      <p className="mb-6">
        🎓 MSc in Computing and Software @ <span className="text-blue-400">McMaster University</span><br />
        🧠 BSc in Computer Engineering @ <span className="text-blue-400">AIUB, Bangladesh</span>
      </p>

      <h2 className="text-xl font-semibold mb-2">🌐 Let’s Connect</h2>
      <ul className="list-inside list-disc text-blue-400">
        <li><a href="https://github.com/XessX" target="_blank" rel="noreferrer" className="underline">GitHub</a></li>
        <li><a href="https://www.linkedin.com/in/al-jubair-hossain-2ab89011b/" target="_blank" rel="noreferrer" className="underline">LinkedIn</a></li>
        <li><span className="text-gray-300">📫 Email:</span> <a href="mailto:aljubair707@gmail.com" className="underline">aljubair707@gmail.com</a></li>
      </ul>

      <p className="mt-8 text-gray-400 text-sm">
        P.S. I also enjoy solving algorithm problems, learning about the universe 🌌, and playing strategy games 🎮.
      </p>
    </div>
  );
}

export default About;
