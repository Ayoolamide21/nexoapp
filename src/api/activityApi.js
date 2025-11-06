// src/api/activityApi.js
import { apiFetch } from "./client";

export const apiGetUserTransactions = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const url = `/api/activity${query ? `?${query}` : ""}`;

  // apiFetch returns parsed JSON or throws error on failure
  return await apiFetch(url);
};
