import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { toast, ToastContainer } from "react-toastify";
import { resetPassword } from "/src/api/authApi";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !token) {
      toast.error("Invalid or missing reset link. Please try again.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
       await resetPassword(token, password, email, confirmPassword);

      toast.success("Password reset successful!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error(error.message || "Invalid or expired token");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <Navbar />
      <section className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-12">
        <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-md text-white">
          <h2 className="text-2xl font-bold mb-4 text-center">Set New Password</h2>
          <p className="text-gray-400 text-sm text-center mb-6">
            Enter your new password below to regain access to your account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded font-semibold transition ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <p className="mt-4 text-center text-gray-400 text-sm">
            Remember your password?{" "}
            <a href="/login" className="text-blue-400 hover:text-blue-600 underline">
              Log in
            </a>
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
