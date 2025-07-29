import React, { useState, useRef, useEffect } from "react";
import { FaGlobe } from "react-icons/fa";

const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
];
const currencies = [
  { code: "USD", label: "USD $" },
  { code: "EUR", label: "Euro €" },
  { code: "JPY", label: "Yen ¥" },
];

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submission:", form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-indigo-900 px-4 py-12 relative">
      {/* Language / Currency */}
      <div ref={dropdownRef} className="absolute top-4 right-6 lg:right-12 text-white">
        <button
          onClick={() => setDropdownOpen((p) => !p)}
          className="flex items-center gap-1 hover:text-blue-300 py-1 px-2 rounded"
        >
          <FaGlobe className="w-4 h-4" />
          <span className="text-sm">{selectedLanguage.code.toUpperCase()} / {selectedCurrency.code}</span>
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-72 bg-black/90 backdrop-blur-md rounded-xl shadow-2xl text-white z-20 flex divide-x divide-gray-700">
            <div className="flex-1 p-3 overflow-auto max-h-48">
              <p className="text-xs uppercase font-semibold tracking-wide mb-2">Language</p>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setSelectedLanguage(lang);
                    setDropdownOpen(false);
                  }}
                  className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded hover:bg-blue-600 transition-colors ${
                    lang.code === selectedLanguage.code ? "bg-blue-700" : ""
                  }`}
                >
                  <img
                    src={`/flags/${lang.code}.svg`}
                    alt={lang.label}
                    className="w-4 h-4 rounded-sm"
                  />
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
            <div className="flex-1 p-3 overflow-auto max-h-48">
              <p className="text-xs uppercase font-semibold tracking-wide mb-2">Currency</p>
              {currencies.map((cur) => (
                <button
                  key={cur.code}
                  onClick={() => {
                    setSelectedCurrency(cur);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded hover:bg-blue-600 transition-colors ${
                    cur.code === selectedCurrency.code ? "bg-blue-700" : ""
                  }`}
                >
                  {cur.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="w-full max-w-6xl md:grid md:grid-cols-2 bg-transparent rounded-lg overflow-hidden">
        {/* Left Image */}
        <div
          className="hidden md:block bg-cover bg-center"
          style={{ backgroundImage: "url('/images/signup-side.png')" }}
        />

        {/* Right Login Form */}
        <div className="bg-gray-900 bg-opacity-95 p-8 sm:p-10 text-white rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Sign in to your account</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-1">Email</label>
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1">Password</label>
              <input
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition font-semibold rounded-md"
            >
              Log In
            </button>
          </form>

          <div className="mt-6 text-center text-gray-400">OR</div>
          <div className="mt-4 space-y-3">
            <button className="w-full py-3 bg-gray-800 hover:bg-gray-700 rounded-md">
              Continue with Google
            </button>
            <button className="w-full py-3 bg-gray-800 hover:bg-gray-700 rounded-md">
              Continue with Apple
            </button>
          </div>

          <p className="mt-6 text-center text-gray-500">
            Don’t have an account?{" "}
            <a href="/signup" className="underline hover:text-white">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
