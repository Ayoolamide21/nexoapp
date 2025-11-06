import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { fetchFrontSettings } from "/src/api/frontApi";
import { submitHelpRequest,  getHelpArticles, getHelpFAQs } from "/src/api/helpApi";

export default function HelpCenter() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      await submitHelpRequest(formData);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" }); // Reset form
    } catch (error) {
      toast.error(error.message || "Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

const [topArticles, setTopArticles] = useState([]);
const [faqs, setFaqs] = useState([]);
const [openIndex, setOpenIndex] = useState(null);
const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

useEffect(() => {
  const fetchContent = async () => {
    try {
      const [articles, faqs] = await Promise.all([
        getHelpArticles(),
        getHelpFAQs()
      ]);
      setTopArticles(articles);
      setFaqs(faqs);
    } catch {
 // silently ignore errors
     }
  };

  fetchContent();
}, []);
 useEffect(() => {
    const loadFrontSettings = async () => {
      try {
        const data = await fetchFrontSettings();
        if (data.company_email) setCompanyEmail(data.company_email);
        if (data.company_phone) setCompanyPhone(data.company_phone);
      } catch{
         // silently ignore errors
      }
    };

    loadFrontSettings();
  }, []);
  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen py-16 px-6 md:px-12">
        {/* Search Hero */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Help Center</h1>
          <input
            type="search"
            placeholder="What are you looking for?"
            className="w-full px-4 py-3 border rounded-lg focus:ring-indigo-300 text-lg"
          />
        </div>

     

{/* Top Articles Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
  {topArticles.map((a, i) => (
    <Link
      key={i}
      to={`/help/${a.slug}`} // unique slug from your DB (e.g. "recover-your-account")
      className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition flex flex-col h-full group"
    >
      {/* Title */}
      <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-indigo-600 transition break-words line-clamp-2">
        {a.title}
      </h3>

      {/* Summary */}
      <p className="text-gray-700 text-sm leading-relaxed flex-1 overflow-hidden whitespace-pre-line break-words text-justify">
        {a.summary?.length > 400 ? a.summary.slice(0, 400) + "..." : a.summary}
      </p>

      {/* Footer */}
      <div className="mt-4 text-right">
        <span className="text-indigo-600 text-sm font-medium">Read More →</span>
      </div>
    </Link>
  ))}
</div>



        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div key={i} className="mb-4 border-b pb-4">
              <button
                onClick={() => toggleFAQ(i)}
                className="flex justify-between items-center w-full text-left text-lg font-medium text-gray-800"
              >
                {faq.question}
                <span>{openIndex === i ? '−' : '+'}</span>
              </button>
              {openIndex === i && (
                <p className="mt-2 text-gray-600 text-base">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>

        {/* Submit Request Form */}
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow mb-16">
          <h2 className="text-2xl font-semibold mb-4">Need more help?</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              className="w-full border px-4 py-3 rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              className="w-full border px-4 py-3 rounded"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              className="w-full border px-4 py-3 rounded"
              rows={4}
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Sending..." : "Send Request"}
            </button>
          </form>

          <div className="mt-6 text-gray-700 text-center">
            <p><strong>Email:</strong> {companyEmail} </p>
            <p><strong>Phone:</strong> {companyPhone}</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
