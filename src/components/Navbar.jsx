import React, { useState, useEffect, useRef } from "react";
import { FaGlobe, FaBars } from "react-icons/fa";

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

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

  const dropdownRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    // Close dropdown on outside click
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={`sticky top-0 z-[9999] w-full px-6 lg:px-12 py-3 flex items-center justify-between font-inter transition duration-300 text-white ${
        scrolled ? "bg-black/40 backdrop-blur-md shadow-md" : "bg-black/20 backdrop-blur-sm"
      }`}
    >
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="Logo" className="h-5 w-auto" />
        <span className="text-base font-semibold tracking-wide">CryptoStand</span>
      </div>

      {/* Toggle button for mobile */}
      <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">
        <FaBars />
      </button>

      {/* Center: Desktop Nav */}
      <ul className="hidden lg:flex gap-8 text-sm font-medium">
        <li>
          <a href="#personal" className="hover:text-blue-300">
            Personal
          </a>
        </li>
        <li>
          <a href="#business" className="hover:text-blue-300">
            Business
          </a>
        </li>
        <li>
          <a href="#markets" className="hover:text-blue-300">
            Markets
          </a>
        </li>
        <li>
          <a href="#company" className="hover:text-blue-300">
            Company
          </a>
        </li>
      </ul>

      {/* Right: Auth Buttons + Globe with dropdown */}
      <div className="hidden lg:flex items-center gap-3 relative" ref={dropdownRef}>
        <button className="px-3 py-1 border border-gray-300 rounded hover:border-white hover:text-blue-300 text-sm">
          Log In
        </button>
        <button className="px-3 py-1 bg-blue-500 text-white rounded font-medium hover:bg-blue-600 transition duration-200 text-sm">
          Sign Up
        </button>

        {/* Globe + Dropdown Trigger */}
        <div className="relative inline-block">
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="flex items-center gap-1 text-white hover:text-blue-300 cursor-pointer border border-transparent hover:border-white rounded px-2 py-1"
          aria-haspopup="true"
          aria-expanded={dropdownOpen}
          aria-label="Select language and currency"
          type="button"
        >
          <FaGlobe className="h-4 w-4" />
          <span className="text-sm">
            {selectedLanguage.code.toUpperCase()} / {selectedCurrency.code}
          </span>
        </button>

       {/* Modern Dropdown Menu */}
{dropdownOpen && (
  <div className="absolute right-0 mt-2 w-80 bg-black/90 backdrop-blur-md rounded-xl shadow-2xl text-white z-20 flex divide-x divide-gray-700 overflow-hidden transition-all duration-300 ease-in-out">
    
    {/* Language Section */}
    <div className="flex-1 p-3 overflow-auto max-h-48">
      <p className="text-xs uppercase font-semibold tracking-wide mb-2">Language</p>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => {
            setSelectedLanguage(lang);
            setDropdownOpen(false);
          }}
          className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded hover:bg-blue-600 transition-colors duration-200 ${
            lang.code === selectedLanguage.code ? "bg-blue-700" : ""
          }`}
        >
          <img
            src={`/flags/${lang.code}.svg`}
            alt={`${lang.label} flag`}
            className="w-4 h-4 rounded-sm"
          />
          <span>{lang.label}</span>
        </button>
      ))}
    </div>

    {/* Currency Section */}
    <div className="flex-1 p-3 overflow-auto max-h-48">
      <p className="text-xs uppercase font-semibold tracking-wide mb-2">Currency</p>
      {currencies.map((cur) => (
        <button
          key={cur.code}
          onClick={() => {
            setSelectedCurrency(cur);
            setDropdownOpen(false);
          }}
          className={`block w-full text-left px-3 py-2 rounded hover:bg-blue-600 transition-colors duration-200 ${
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
</div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="absolute top-full left-0 w-full bg-black/80 text-white flex flex-col gap-4 p-4 lg:hidden">
          <li>
            <a href="#personal">Personal</a>
          </li>
          <li>
            <a href="#business">Business</a>
          </li>
          <li>
            <a href="#markets">Markets</a>
          </li>
          <li>
            <a href="#company">Company</a>
          </li>
          <li>
            <button className="border border-gray-300 rounded px-3 py-1 text-sm">Log In</button>
          </li>
          <li>
            <button className="bg-blue-500 rounded px-3 py-1 text-sm">Sign Up</button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
