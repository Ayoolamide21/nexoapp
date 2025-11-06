import React, { useEffect, useState, useCallback } from "react";
import { Navigate } from "react-router-dom";

// Simple Spinner component
const Spinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="w-8 h-8 border-4 border-t-transparent border-blue-600 rounded-full animate-spin"></div>
  </div>
);

export default function PrivateRoute({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;
  const timeout = 5000;

  const checkAuth = useCallback(() => {
    setIsLoading(true);
    setError(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    fetch(`${apiUrl}/api/me`, {
      credentials: "include",
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then(() => setAuthenticated(true))
      .catch((err) => {
  if (err.name === "AbortError") {
    setError("Request timed out");
  } else if (err.message === "Not authenticated") {
    // just don't set error; let it redirect silently
    setAuthenticated(false);
  } else {
    setError(err.message || "An error occurred");
    setAuthenticated(false);
  }
})
.finally(() => {
        setIsLoading(false);
        clearTimeout(timeoutId);
      });

    return () => clearTimeout(timeoutId);
  }, [apiUrl]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) return <Spinner />;

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-center px-4 space-y-4">
        <p className="text-red-600">{error}</p>
        <button
          onClick={checkAuth}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!authenticated) return <Navigate to="/login" replace />;

  return children;
}
