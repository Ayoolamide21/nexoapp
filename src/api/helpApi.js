// src/api/helpApi.js
import { apiFetch } from "/src/api/client";

export const submitHelpRequest = async ({ name, email, message }) => {
  try {
    const data = await apiFetch("/api/help/submit", {
      method: "POST",
      body: { name, email, message }, 
    });

    return data; // Return parsed response JSON if needed
  } catch{
     // silently ignore errors
  }
};

// Fetch a single help article by slug
export const getHelpArticleBySlug = (slug) => {
  if (!slug) throw new Error("Slug is required");
  return apiFetch(`/api/help/articles/${slug}`);
};

export const getHelpArticles = () => apiFetch("/api/help/articles");

export const getHelpFAQs = () => apiFetch("/api/help/faqs");
