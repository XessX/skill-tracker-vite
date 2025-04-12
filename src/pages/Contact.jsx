import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your Formspree URL or EmailJS logic
      await fetch("https://formspree.io/f/xpwpbzjp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-10">
      <h1 className="text-3xl font-bold text-center mb-6">📩 Contact Me</h1>
      
      {submitted ? (
        <div className="text-center text-green-500 text-lg">✅ Message Sent! Thank you 🙏</div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto bg-gray-100 dark:bg-gray-800 p-6 rounded-lg space-y-4 shadow"
        >
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full px-4 py-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full px-4 py-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
            rows="4"
            className="w-full px-4 py-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}

export default Contact;
