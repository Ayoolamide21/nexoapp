// src/api/goalApi.js
import { apiFetch } from "/src/api/client";

export const askAI = async (question) => {
  try {
    return await apiFetch(`/api/ai/ask`, {
      method: "POST",
      body: JSON.stringify({ question }),
    });
  } catch {
     // silently ignore errors
  }
};

export const fetchGoals = () => {
  return apiFetch("/api/goals");
};

export const createAIGoal = async (goalData) => {
  try {
    return await apiFetch("/api/ai/save-goal", {
      method: "POST",
      body: JSON.stringify(goalData),
    });
  } catch {
     // silently ignore errors
  }
};

export const previewPlans = async (goalData) => {
  try {
    return await apiFetch("/api/ai/preview-plans", {
      method: "POST",
      body: JSON.stringify(goalData),
    });
  } catch {
     // silently ignore errors
  }
};

export const calculatePlanImpact = async ({
  name,
  target_amount,
  target_frequency,
  target_date,
  plan_id,
}) => {
  const payload = {
    name,
    target_amount,
    target_frequency,
    target_date,
    plan_id,
  };

  try {
    return await apiFetch("/api/goals/calculate-plan-impact", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch {
     // silently ignore errors
  }
};

export const getUserGoals = () => apiFetch("/api/goals");

export const getGoal = (goalId) => apiFetch(`/api/goals/${goalId}`);

export const getSuggestedPlans = async ({ target_amount, target_frequency, target_date }) => {
  try {
    const data = await apiFetch("/api/goals/recommend", {
      method: "POST",
      body: JSON.stringify({ target_amount, target_frequency, target_date }),
    });
    return data.suggestions;
  } catch {
     // silently ignore errors
  }
};

export const updateGoal = (goalId, updates) =>
  apiFetch(`/api/goals/${goalId}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });

export const deleteGoal = (goalId) =>
  apiFetch(`/api/goals/${goalId}`, {
    method: "DELETE",
  });

export const assignPlansToGoal = ({ goal_id, plan_id, quantity }) =>
  apiFetch("/api/goals/assign-transactions", {
    method: "POST",
    body: JSON.stringify({ goal_id, plan_id, quantity }),
  });

