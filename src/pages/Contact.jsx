import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function HelpCenter() {
  const topArticles = [
    { title: 'Account Statement', summary: 'Overview your transaction history and downloads.' },
    { title: 'Recover Your Account', summary: 'Lost access? Learn how to recover your account.' },
    { title: 'What is KYC?', summary: 'How to complete Know Your Customer verification.' },
    { title: 'Missing Crypto Transaction', summary: 'Steps to resolve missing funds issues.' },
  ];

  const faqs = [
    {
      question: 'How can I withdraw my earnings?',
      answer: 'You can request withdrawal from your dashboard any time. It is processed in 24–48 hours.',
    },
    {
      question: 'Is my capital safe?',
      answer: 'Yes. We use diversified portfolios, risk management tools, and industry-grade security to protect your funds.',
    },
    {
      question: 'What’s the minimum amount to start?',
      answer: '$100',
    },
    {
      question: 'Can I invest from any country?',
      answer: 'Yes. We are a global company with digital operations.',
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {topArticles.map((a, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">{a.title}</h3>
              <p className="text-gray-600">{a.summary}</p>
            </div>
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
        {/* Submit Request */}
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow mb-16">
          <h2 className="text-2xl font-semibold mb-4">Need more help?</h2>
          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition">
            Submit a Request
          </button>
          <div className="mt-6 text-gray-700 text-center">
            <p><strong>Email:</strong> support@yourdomain.com</p>
            <p><strong>Phone:</strong> +123‑456‑7890</p>
          </div>
        </div>

       
      </main>
      <Footer />
    </>
  );
}
