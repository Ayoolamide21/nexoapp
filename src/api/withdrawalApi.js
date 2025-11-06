// // src/api/withdrawalApi.js

import { apiFetch } from "/src/api/client";

export const getWithdrawals = async (page = 1) => {
  // apiFetch returns parsed JSON or throws error on failure
  return await apiFetch(`/api/withdrawal/history?page=${page}`, {
    method: "GET",
  });
};

export const makeWithdrawal = async ({ amount, withdrawal_method, destination }) => {
  return await apiFetch("/api/withdrawal", {
    method: "POST",
    body: JSON.stringify({
      amount,
      withdrawal_method,
      destination,
    }),
  });
};
