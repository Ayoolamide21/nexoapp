// // src/api/investmentApi.js
import { apiFetch } from "/src/api/client";

export const investInPlan = async (planId, amount) => {
  return await apiFetch("/api/invest", {
    method: "POST",
    body: JSON.stringify({ plan_id: planId, amount }),
  });
};
