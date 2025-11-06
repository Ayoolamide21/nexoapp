import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { apiEnable2FA, apiVerify2FA, apiDisable2FA, apiGetUser } from "/src/api/twoFactorApi.js";

export default function SecuritySettings() {
  const [qrCode, setQrCode] = useState(null);
  const [_secret, setSecret] = useState(null);
  const [token, setToken] = useState("");
  const [enabled, setEnabled] = useState(false); 
  const [success, setSuccess] = useState(false);

  // Fetch 2FA status on load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await apiGetUser();
        setEnabled(user.two_factor_enabled); // Set based on backend response
      } catch  {
        // silently ignore errors
      }
    };
    fetchUser();
  }, []);


  const handleEnable2FA = async () => {
    try {
      const data = await apiEnable2FA();
      setQrCode(`data:image/png;base64,${data.qr_code}`);
      setSecret(data.secret);
      //setError("");
    } catch {
      toast.error("Unable to enable 2FA");
    }
  };

  const handleVerify = async () => {
    try {
      const data = await apiVerify2FA(token);
      if (data.success) {
        setSuccess(true);
        setEnabled(true);
        setQrCode(null);
        toast.success("2FA has been successfully enabled for your account!");
      } else {
        toast.error(data.message || "Verification failed");
      }
    } catch {
    toast.error("Verification error");
    }
  };

  const handleDisable2FA = async () => {
    try {
      const data = await apiDisable2FA();
      if (data.success) {
        setEnabled(false);
        setQrCode(null);
        setToken("");
        setSuccess(false);
        toast.success("2FA has been disabled");
      }
    } catch {
    toast.error("Unable to disable 2FA");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Two-Factor Authentication</h2>

      {!qrCode && !success && !enabled && (
        <button
          onClick={handleEnable2FA}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Enable 2FA
        </button>
      )}

      {enabled && !qrCode && (
        <button
          onClick={handleDisable2FA}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Disable 2FA
        </button>
      )}

      {qrCode && !success && (
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            Scan the QR code below with your Google Authenticator app.
          </p>
          <img src={qrCode} alt="2FA QR Code" className="w-40 h-40" />
          <input
            type="text"
            placeholder="Enter 6-digit code"
            className="w-full border px-3 py-2 rounded"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <button
            onClick={handleVerify}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Verify Token
          </button>
        </div>
      )}
      
      
    </div>
  );
}