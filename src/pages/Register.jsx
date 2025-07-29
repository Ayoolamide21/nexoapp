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

export default function Signup() {

  const [form, setForm] = useState({
    username: "", email: "", password: "", accountType: "personal",
    businessName: "", businessEmail: "", referralSource: "",
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => { e.preventDefault(); console.log("Submitted:", form); };

  const showBiz = ["business", "professional"].includes(form.accountType);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-indigo-900 px-4 py-12 relative">
      {/* Language/Currency dropdown */}
      <div ref={dropdownRef} className="absolute top-4 right-6 lg:right-12 text-white">
        <button
          onClick={() => setDropdownOpen(prev => !prev)}
          className="flex items-center gap-1 hover:text-blue-300 py-1 px-2 rounded"
        >
          <FaGlobe className="w-4 h-4" />
          <span className="text-sm">{selectedLanguage.code.toUpperCase()} / {selectedCurrency.code}</span>
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-72 bg-black/90 backdrop-blur-md rounded-xl shadow-2xl text-white z-20 flex divide-x divide-gray-700">
            <div className="flex-1 p-3 overflow-auto max-h-48">
              <p className="text-xs uppercase font-semibold tracking-wide mb-2">Language</p>
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => { setSelectedLanguage(lang); setDropdownOpen(false); }}
                  className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded hover:bg-blue-600 transition-colors ${
                    lang.code === selectedLanguage.code ? "bg-blue-700" : ""
                  }`}
                >
                  <img src={`/flags/${lang.code}.svg`} alt={lang.label} className="w-4 h-4 rounded-sm"/>
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
            <div className="flex-1 p-3 overflow-auto max-h-48">
              <p className="text-xs uppercase font-semibold tracking-wide mb-2">Currency</p>
              {currencies.map(cur => (
                <button
                  key={cur.code}
                  onClick={() => { setSelectedCurrency(cur); setDropdownOpen(false); }}
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

      {/* Flex container */}
      <div className="w-full max-w-6xl md:grid md:grid-cols-2 bg-transparent rounded-lg overflow-hidden">
        {/* Left: image */}
        <div
          className="hidden md:block bg-cover bg-center"
          style={{ backgroundImage: "url('/images/signup-side.png')" }}
        />

        {/* Right: form */}
        <div className="bg-gray-900 bg-opacity-95 p-8 sm:p-10 text-white rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Sign up and get started</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4 mb-4">
              {["personal", "business"].map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setForm(prev => ({ ...prev, accountType: type }))}
                  className={`flex-1 py-2 rounded-md ${
                    form.accountType === type ? "bg-blue-600" : "bg-gray-800 hover:bg-blue-600"
                  }`}
                >
                  {type === "personal" ? "Personal account" : "Corporate account"}
                </button>
              ))}
            </div>

            {showBiz && (
              <>
                <div>
                  <label>Business Name</label>
                  <input name="businessName" onChange={handleChange} className="w-full px-3 py-2 bg-gray-800 rounded-md focus:ring focus:ring-blue-500"/>
                </div>
                <div>
                  <label>Business Email</label>
                  <input name="businessEmail" type="email" onChange={handleChange} className="w-full px-3 py-2 bg-gray-800 rounded-md focus:ring focus:ring-blue-500"/>
                </div>
              </>
            )}

            <div>
              <label>Username</label>
              <input name="username" required onChange={handleChange} className="w-full px-3 py-2 bg-gray-800 rounded-md focus:ring focus:ring-blue-500"/>
            </div>
            <div>
              <label>Email</label>
              <input name="email" type="email" required onChange={handleChange} className="w-full px-3 py-2 bg-gray-800 rounded-md focus:ring focus:ring-blue-500"/>
            </div>
            <div>
              <label>Password</label>
              <input name="password" type="password" required onChange={handleChange} className="w-full px-3 py-2 bg-gray-800 rounded-md focus:ring focus:ring-blue-500"/>
            </div>
            <div>
              <label>How did you hear about us?</label>
              <input name="referralSource" onChange={handleChange} className="w-full px-3 py-2 bg-gray-800 rounded-md focus:ring focus:ring-blue-500"/>
            </div>

            <p className="text-xs text-gray-400 mt-2">
              By continuing, you accept our{" "}
              <a href="/terms" className="underline hover:text-white">Terms and Conditions</a> and{" "}
              <a href="/privacy" className="underline hover:text-white">Privacy Policy</a>.
            </p>

            <button type="submit" className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 transition font-semibold rounded-md">
              Continue
            </button>
          </form>

          <div className="mt-6 text-center text-gray-400">OR</div>
          <div className="mt-4 space-y-3">
            <button className="w-full py-3 bg-gray-800 hover:bg-gray-700 rounded-md">Continue with Google</button>
            <button className="w-full py-3 bg-gray-800 hover:bg-gray-700 rounded-md">Continue with Apple</button>
          </div>

          <p className="mt-6 text-center text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="underline hover:text-white">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
}
