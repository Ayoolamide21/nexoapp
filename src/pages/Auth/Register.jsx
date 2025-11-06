import React, { useState, useRef, useEffect } from "react";
import { FaGlobe } from "react-icons/fa";
import OtpVerification from "../../components/OtpVerify";
import { useSearchParams } from "react-router-dom";
import LanguageCurrencyDropdown from "/src/components/LanguageCurrencyDropdown";
import { fetchFrontSettings } from "/src/api/frontApi";
import { registerUser } from "/src/api/authApi";

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

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    accountType: "personal",
    businessName: "",
    businessEmail: "",
    referralSource: "",
    referralCode: "",
  });
const [searchParams] = useSearchParams();
const [referralCode, setReferralCode] = useState("");
const [setDropdownOpen] = useState(false);

  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState({ code: "USD", label: "USD $" });
  const [selectedLanguage, setSelectedLanguage] = useState({ code: 'en', label: 'English', direction: 'ltr' });
  const [languages, setLanguages] = useState([]);
  
  const dropdownRef = useRef();

useEffect(() => {
  const refCode = searchParams.get("ref");
  if (refCode) {
    setReferralCode(refCode);
    localStorage.setItem("referralCode", refCode);
  } else {
    const savedRef = localStorage.getItem("referralCode");
    if (savedRef) {
      setReferralCode(savedRef);
    }
  }
}, []);


  const [sessionMessage, setSessionMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState("signup"); // "signup" | "otp"
  const [registeredEmail, setRegisteredEmail] = useState("");
  // Clear session messages after 5 seconds
  const clearSessionMessage = () => {
    setTimeout(() => {
      setSessionMessage("");
    }, 5000);
  };

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
    setForm((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setSessionMessage("");

  try {
    // Collect data
    const payload = {
      username: form.username,
      email: form.email,
      password: form.password,
      account_type: form.accountType,
      business_name: form.businessName,
      business_email: form.businessEmail,
      referral_source: form.referralSource,
      referral_code: referralCode,
      language: selectedLanguage.code,
      currency: selectedCurrency.code,
    };

    // ✅ Use API wrapper
    await registerUser(payload);

    // ✅ Success handling
    setRegisteredEmail(form.email);
    setStep("otp");
    setSessionMessage("Registration successful! Please enter the OTP sent to your email.");
    clearSessionMessage();
  } catch (error) {
    setSessionMessage(error.message || "Registration failed.");
    clearSessionMessage();
  } finally {
    setIsLoading(false);
  }
};

useEffect(() => {
  const loadFrontSettings = async () => {
    try {
      const data = await fetchFrontSettings();
      if (data.favicon) {
  updateFavicon(data.favicon);
    
}
      if (data.currency) {
        setSelectedCurrency({
          code: data.currency.code,
          label: `${data.currency.code} ${data.currency.symbol}`
        });
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
    } catch{
       // silently ignore errors
    }
  };
  loadFrontSettings();
}, []);
  // Show business fields conditionally
  const showBiz = ["business", "professional"].includes(form.accountType);

  // If step is OTP, render OTP verification component only
  if (step === "otp") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-12">
        <OtpVerification
          email={registeredEmail}
          onVerified={() => {
            alert("Email verified! Redirecting to login...");
            setTimeout(() => (window.location.href = "/login"), 2000);
          }}
        />
      </div>
    );
  }
  // Else render signup form
  return (
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

      {/* Flex container */}
      <div className="w-full max-w-6xl md:grid md:grid-cols-2 bg-transparent rounded-lg overflow-hidden">
        {/* Left: image */}
        <div
          className="hidden md:block bg-cover bg-center"
          style={{ backgroundImage: "url('/images/login-signup.jpg')" }}
        />

        {/* Right: form */}
        <div className="bg-gray-900 bg-opacity-95 p-8 sm:p-10 text-white rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Sign up and get started</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4 mb-4">
              {["personal", "business"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, accountType: type }))}
                  className={`flex-1 py-2 rounded-md ${
                    form.accountType === type ? "bg-blue-600" : "bg-gray-800 hover:bg-blue-600"
                  }`}
                >
                  {type === "personal" ? "Personal account" : "Corporate account"}
                </button>
              ))}
            </div>

            {sessionMessage && (
              <div className="mb-4 p-3 text-sm rounded bg-red-600 text-white">
                {sessionMessage}
              </div>
            )}

            {showBiz && (
              <>
                <div>
                  <label>Business Name</label>
                  <input
                    name="businessName"
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-800 rounded-md focus:ring focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label>Business Email</label>
                  <input
                    name="businessEmail"
                    type="email"
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-800 rounded-md focus:ring focus:ring-blue-500"
                  />
                </div>
              </>
            )}

            <div>
              <label>Username</label>
              <input
                name="username"
                required
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 rounded-md focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <label>Email</label>
              <input
                name="email"
                type="email"
                required
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 rounded-md focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <label>Password</label>
              <input
                name="password"
                type="password"
                required
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 rounded-md focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
  <label>Referred by ID:</label>
  <input
    name="referralCode"
    value={referralCode}
    onChange={(e) => setReferralCode(e.target.value)}
    className="w-full px-3 py-2 bg-gray-800 rounded-md focus:ring focus:ring-blue-500"
  />
</div>


            <div>
              <label>How did you hear about us?</label>
              <input
                name="referralSource"
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 rounded-md focus:ring focus:ring-blue-500"
              />
            </div>

            <p className="text-xs text-gray-400 mt-2">
              By continuing, you accept our{" "}
              <a href="/terms" className="underline hover:text-white">
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a href="/privacy" className="underline hover:text-white">
                Privacy Policy
              </a>
              .
            </p>

            <button
              type="submit"
              className={`w-full py-3 mt-4 ${
                isLoading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              } transition font-semibold rounded-md`}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Continue"}
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
            Already have an account?{" "}
            <a href="/login" className="underline hover:text-white">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
