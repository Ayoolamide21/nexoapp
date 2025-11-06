import React, { useState, useRef, useEffect } from "react";
import { FaGlobe } from "react-icons/fa";
import { handle2FAVerify } from "/src/api/twoFactorApi.js";
import { loginUser } from "/src/api/authApi";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LanguageCurrencyDropdown from "/src/components/LanguageCurrencyDropdown";
import { fetchFrontSettings } from "/src/api/frontApi";

const updateFavicon = (faviconUrl) => {
  const head = document.getElementsByTagName("head")[0];
  
  // Remove all existing favicon tags
  const existingFavicons = head.querySelectorAll("link[rel*='icon']");
  existingFavicons.forEach(icon => head.removeChild(icon));

  // Create and append new favicon
  const link = document.createElement("link");
  link.type = "image/x-icon";
  link.rel = "shortcut icon";
  link.href = faviconUrl;
  head.appendChild(link);
};

export default function Login() {
  const [show2FA, setShow2FA] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [token, setToken] = useState("");
  const [setDropdownOpen] = useState(false);
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState({ code: "USD", label: "USD $" });
  const [selectedLanguage, setSelectedLanguage] = useState({ code: 'en', label: 'English', direction: 'ltr' });
  const [languages, setLanguages] = useState([]);
  
  const dropdownRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();

useEffect(() => {
  const loadFrontSettings = async () => {
    try {
      const data = await fetchFrontSettings();

      if (data.currency) {
        setSelectedCurrency({
          code: data.currency.code,
          label: `${data.currency.code} ${data.currency.symbol}`
        });
      }

      if (data.favicon) {
  updateFavicon(data.favicon);
    
}
      if (Array.isArray(data.available_currencies)) {
        setCurrencies(data.available_currencies.map(cur => ({
          code: cur.code,
          label: `${cur.code} ${cur.symbol}`
        })));
      }
      // Set selected language
      if (data.language) {
        setSelectedLanguage({
          code: data.language.code,
          label: `${data.language.code} ${data.language.symbol}`,
          direction: data.language.direction,
        });
      }

      // Set available languages
      if (Array.isArray(data.available_languages)) {
        setLanguages(data.available_languages.map(lang => ({
          code: lang.code,
          label: lang.label,          
          direction: lang.direction,
        })));
      }
    } catch {
       // silently ignore errors
       }
  };

  loadFrontSettings();
}, []);

  useEffect(() => {
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  useEffect(() => {
    if (location.state?.loggedOut) {
      toast.success("Logged out successfully!");
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const data = await loginUser(form);

    if (data.two_factor_required) {
      setShow2FA(true);
      toast.info("Two-factor authentication required.");
      return;
    }

    localStorage.setItem("auth_token", data.token);
    toast.success("Login successful!");
    navigate("/dashboard");

  } catch (error) {
    toast.error(error.message || "Login failed");
  }
};

  const handleVerify2FAToken = async () => {
    try {
      const data = await handle2FAVerify(token);
      toast.success("2FA Verified! Logged in.");
      
      localStorage.setItem("auth_token", data.token);

      navigate("/dashboard", { state: data });
    } catch (error) {
      toast.error(error.message || "Invalid 2FA token");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-indigo-900 px-4 py-12 relative">
       {/* Language/Currency dropdown */}
             <div ref={dropdownRef} className="absolute top-4 right-6 lg:right-12 text-white">
               <LanguageCurrencyDropdown
        languages={languages}
        currencies={currencies}
        selectedLanguage={selectedLanguage}
        selectedCurrency={selectedCurrency}
        onLanguageChange={setSelectedLanguage}
        onCurrencyChange={setSelectedCurrency}
      />
             </div>
        

        {/* Login Box */}
        <div className="w-full max-w-6xl md:grid md:grid-cols-2 bg-transparent rounded-lg overflow-hidden">
          {/* Image */}
          <div
            className="hidden md:block bg-cover bg-center"
            style={{ backgroundImage: "url('/images/login-signup.jpg')" }}
          />

          {/* Form */}
          <div className="bg-gray-900 bg-opacity-95 p-8 sm:p-10 text-white rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-center">Sign in to your account</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!show2FA && (
                <>
                  <div>
                    <label className="block mb-1">Email</label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-800 rounded-md"
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
                      className="w-full px-3 py-2 bg-gray-800 rounded-md"
                    />
                  </div>
<div className="mt-2 text-right">
  <a
    href="/forgot-password"
    className="text-blue-400 hover:text-blue-600 text-sm"
  >
    Forgot Password?
  </a>
</div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 font-semibold rounded-md"
                  >
                    Log In
                  </button>
                </>
              )}
            </form>

            {/* 2FA input */}
            {show2FA && (
              <div className="mt-6 bg-gray-800 p-4 rounded">
                <label className="block mb-2 text-sm">Enter 2FA Token</label>
                <input
                  type="text"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 rounded-md"
                  placeholder="123456"
                />
                <button
                  onClick={handleVerify2FAToken}
                  className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
                >
                  Verify Token
                </button>
              </div>
            )}

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
    </>
  );
}
