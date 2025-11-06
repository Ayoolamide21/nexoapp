import React, { useState } from "react";
import { toast } from "react-toastify";
import { apiChangePassword } from "/src/api/twoFactorApi.js";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill all password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    setPasswordLoading(true);

    try {
      await apiChangePassword({
        old_password: oldPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword,
      });

      toast.success("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err.message || "Error changing password.");
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Change Password</h2>

      <input
        type="password"
        placeholder="Old Password"
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="New Password"
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button
        onClick={handleChangePassword}
        disabled={passwordLoading}
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 disabled:opacity-50"
      >
        {passwordLoading ? "Changing..." : "Change Password"}
      </button>
    </div>
  );
};

export default ChangePassword;
