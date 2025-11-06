// src/api/planApi.js

import { apiFetch } from "/src/api/client";

export const getPlans = async (category = "all") => {
  let endpoint = "/api/plans";
  if (category !== "all") endpoint += `?category=${category}`;

  // apiFetch throws on error, so no need for manual check here
  const data = await apiFetch(endpoint);
  return data;
};

export const getCategories = async () => {
  const data = await apiFetch("/api/plans");
  const uniqueCategories = Array.from(
    new Set(data.map((plan) => plan.category).filter(Boolean))
  );
  return ["all", ...uniqueCategories];
};

export const getUserPlans = async () => {
  const data = await apiFetch("/api/pp");
  return data;
};

export const lockUserPlan = async (planId) => {
  const data = await apiFetch(`/api/pp/${planId}/lock`, {
    method: "POST",
  });
  return data;
};

export const applyForLoan = async ({ plan_id, amount_requested, term }) => {
  const data = await apiFetch('/api/loans/apply', {
    method: 'POST',
    body: { plan_id, amount_requested, term }, // apiFetch auto stringifies if JSON
  });
  return data;
};

export const getLoanHistory = async () => {
  const data = await apiFetch("/api/loan-applications");
  return data;
};

