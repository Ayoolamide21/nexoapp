// src/api/apiClient.js

let csrfInitialized = false;
const apiUrl = import.meta.env.VITE_API_URL || "";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

const ensureCsrf = async () => {
  if (!csrfInitialized) {
    await fetch(`${apiUrl}/sanctum/csrf-cookie`, {
      method: "GET",
      credentials: "include",
    });
    csrfInitialized = true;
  }
};

/**
 * Universal API fetcher.
 *
 * @param {string} endpoint - API endpoint path starting with `/`
 * @param {object} options - Fetch options, e.g., method, body, headers
 * @returns {Promise<object>} - Parsed JSON response or throws error
 */
export const apiFetch = async (endpoint, options = {}) => {
  const method = (options.method || "GET").toUpperCase();
  const token = localStorage.getItem("auth_token");

  // Ensure CSRF token for state-changing requests
  if (method !== "GET" && method !== "HEAD") {
    await ensureCsrf();
  }

  const csrfToken = getCookie("XSRF-TOKEN");

  // Default headers
  const defaultHeaders = {
    Accept: "application/json",
    ...(method !== "GET" && { "Content-Type": "application/json" }),
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(csrfToken && { "X-XSRF-TOKEN": decodeURIComponent(csrfToken) }),
  };

  const mergedHeaders = {
    ...defaultHeaders,
    ...(options.headers || {}),
  };

  const fetchOptions = {
    ...options,
    method,
    headers: mergedHeaders,
    credentials: "include", // needed for cookie-based auth
  };

  // If body is an object and content-type is JSON, stringify it
  if (
    fetchOptions.body &&
    typeof fetchOptions.body === "object" &&
    mergedHeaders["Content-Type"]?.includes("application/json")
  ) {
    fetchOptions.body = JSON.stringify(fetchOptions.body);
  }

  const response = await fetch(`${apiUrl}${endpoint}`, fetchOptions);

  // Try parsing JSON response
  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  let data;
  if (isJson) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    // Throw a meaningful error
    const errorMessage = (data && data.message) || response.statusText || "API Error";
    throw new Error(errorMessage);
  }

  return data;
};
