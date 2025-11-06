// import { apiFetch } from "/src/api/client";

import { apiFetch } from "/src/api/client";

export const apiGetReferralInfo = async () => {
  // apiFetch throws on errors, so no manual check needed here
  const data = await apiFetch("/api/referrals");
  return data;
};

export const apiConvertPoints = async () => {
  const data = await apiFetch("/api/convert-points", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
};
