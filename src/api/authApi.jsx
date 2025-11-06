// src/api/authApi.jsx

import { apiFetch } from "./client";


// Login user
export const loginUser = async (credentials) => {
  return await apiFetch("/api/login", {
    method: "POST",
    body: credentials,
  });
};

// Register user
export const registerUser = async (formData) => {
  return await apiFetch("/api/register", {
    method: "POST",
    body: formData,
  });
};
export const resendVerificationEmail = async (email) => {
  if (!email) throw new Error("Email is required");

  return apiFetch("/api/resend-otp", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
};

export const logoutUser = async () => {
  return apiFetch("/api/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};

export const fetchUserData = async () => {
  try {
    return await apiFetch("/api/me");
  } catch  {
    return null;
  }
};

export const updateUserProfile = async (formData) => {
  return await apiFetch("/api/profile/update", {
    method: "PATCH",
    body: formData,
  });
};

// Request password reset (user enters email)
export const requestPasswordReset = async (email) => {
  if (!email) throw new Error("Email is required");

  return await apiFetch("/api/password/forgot", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
};

// Reset password (user clicks email link and sets new password)
export const resetPassword = async (token, password, email, password_confirmation) => {
  if (!token || !password || !email) 
    throw new Error("Token, email, and password are required");

  return await apiFetch("/api/password/reset", {
    method: "POST",
    body: JSON.stringify({ token, email, password, password_confirmation }),
  });
};


