// import { apiFetch } from "./client";

import { apiFetch } from "./client";

export const apiEnable2FA = async () => {
  // apiFetch throws if error, else returns parsed data
  return await apiFetch("/api/enable-2fa", { method: "POST" });
};

export const apiVerify2FA = async (token) => {
  return await apiFetch("/api/verify-2fa", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });
};

export const apiDisable2FA = async () => {
  return await apiFetch("/api/disable-2fa", { method: "POST" });
};

export const apiGetUser = async () => {
  return await apiFetch("/api/me");
};

export const handle2FAVerify = async (token) => {
  return await apiFetch("/api/2fa/verify", {
    method: "POST",
    body: { token },
  });
};

export const apiChangePassword = async ({ old_password, new_password, new_password_confirmation }) => {
  return await apiFetch("/api/change-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ old_password, new_password, new_password_confirmation }),
  });
};
