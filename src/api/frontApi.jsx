// src/api/frontApi.jsx
import { apiFetch } from "./client";

export const fetchFrontSettings = async (params = {}) => {
  try {
    const query = new URLSearchParams(params).toString();
    const endpoint = `/api/front${query ? `?${query}` : ""}`;
    const data = await apiFetch(endpoint);
    return data;
  } catch {
     // silently ignore errors
  }
};

export const plansFront = async (category = "all") => {
  let endpoint = "/api/front-plan";
  if (category !== "all") endpoint += `?category=${category}`;

  // apiFetch throws on error, so no need for manual check here
  const data = await apiFetch(endpoint);
  return data;
};