import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function OtpVerification({ email, onVerified }) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const submitOtp = async () => {
  if (otp.length !== 6) {
    setError("OTP must be 6 digits");
    return;
  }

  setLoading(true);
  setError("");

  try {
    await fetch(`${apiUrl}/sanctum/csrf-cookie`, { credentials: "include" });

    const csrfToken = getCookie("XSRF-TOKEN");
    const res = await fetch(`${apiUrl}/api/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": decodeURIComponent(csrfToken || ""),
      },
      credentials: "include",
      body: JSON.stringify({ email, otp }),
    });

    if (!res.ok) {
  let errorMessage = "OTP verification failed";

  try {
    
    const errorData = await res.json();
    errorMessage = errorData.message || errorMessage;
  } catch {
    try {
      const fallbackText = await res.text();
      errorMessage = fallbackText || errorMessage;
    } catch {
       // silently ignore errors
    }
  }

  setError(errorMessage);
  toast.error(errorMessage);
  setLoading(false);
  return;
}


    toast.success("OTP verified successfully!");
    onVerified();
  } catch {
    toast.error("Network error during OTP verification Failed");
    setLoading(false);
  }
};


  return (
    <div className="otp-verification max-w-md mx-auto p-6 bg-gray-900 rounded-lg text-white">
      <ToastContainer />
      <p className="mb-4">
        Enter the 6-digit OTP sent to <strong>{email}</strong>:
      </p>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        maxLength={6}
        className="w-full px-3 py-2 mb-3 bg-gray-800 rounded-md focus:ring focus:ring-blue-500 text-white"
        placeholder="Enter OTP"
      />
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <button
        onClick={submitOtp}
        disabled={loading}
        className="w-full py-2 bg-blue-600 rounded-md hover:bg-blue-700"
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
    </div>
  );
}
