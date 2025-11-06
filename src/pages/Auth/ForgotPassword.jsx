import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { toast, ToastContainer } from "react-toastify";
import { requestPasswordReset } from "/src/api/authApi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await requestPasswordReset(email);
      toast.success("If this email exists, a reset link has been sent.");
      setEmail(""); // clear the form
    } catch (error) {
      toast.error(error.message || "Failed to send reset link. Try again.");
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
          <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
          <p className="text-gray-400 text-sm text-center mb-6">
            Enter your email address, and we’ll send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <p className="mt-4 text-center text-gray-400 text-sm">
            Remembered your password?{" "}
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
