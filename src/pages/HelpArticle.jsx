import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getHelpArticleBySlug } from "/src/api/helpApi";

export default function HelpArticle() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
  const fetchArticle = async () => {
    try {
      const data = await getHelpArticleBySlug(slug);
      setArticle(data);
    } catch {
      setArticle(null);
    }
  };
  fetchArticle();
}, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading article...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen py-16 px-6 md:px-12">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
          <Link to="/help-center" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            ← Back to Help Center
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-6 break-words">
            {article.title}
          </h1>

          <div className="text-gray-700 leading-relaxed whitespace-pre-line break-words text-justify">
            {article.content}
          </div>

          {article.updated_at && (
            <p className="text-gray-500 text-sm mt-8">
              Last updated: {new Date(article.updated_at).toLocaleDateString()}
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
