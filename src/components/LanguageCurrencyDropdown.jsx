import React, { useState, useRef, useEffect } from "react";
import { FaGlobe } from "react-icons/fa";

export default function LanguageCurrencyDropdown({
  languages = [],
  currencies = [],
  selectedLanguage,
  selectedCurrency,
  onLanguageChange,
  onCurrencyChange,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative text-white">
      <button
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="flex items-center gap-1 hover:text-blue-300 py-1 px-2 rounded"
        aria-haspopup="true"
        aria-expanded={dropdownOpen}
      >
        <FaGlobe className="w-4 h-4" />
        <span className="text-sm">
          {selectedLanguage?.code?.toUpperCase() || "LANG"} / {selectedCurrency?.code || "CUR"}
        </span>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-black/90 backdrop-blur-md rounded-xl shadow-2xl text-white z-20 flex divide-x divide-gray-700">
          {/* Languages */}
          <div className="flex-1 p-3">
            <p className="text-xs uppercase font-semibold mb-2">Language</p>
            {languages.length === 0 && <p className="text-xs text-gray-400">No languages available</p>}
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  onLanguageChange(lang);
                  setDropdownOpen(false);
                }}
                className={`flex items-center gap-2 w-full px-3 py-2 rounded hover:bg-blue-600 ${
                  lang.code === selectedLanguage?.code ? "bg-blue-700" : ""
                }`}
              >
                <img
                  src={`/images/flags/${lang.code}.svg`}
                  alt={lang.label}
                  className="w-4 h-4"
                  loading="lazy"
                />
                {lang.label}
              </button>
            ))}
          </div>

          {/* Currencies */}
          <div className="flex-1 p-3">
            <p className="text-xs uppercase font-semibold mb-2">Currency</p>
            {currencies.length === 0 && <p className="text-xs text-gray-400">No currencies available</p>}
            {currencies.map((cur) => (
              <button
                key={cur.code}
                onClick={() => {
                  onCurrencyChange(cur);
                  setDropdownOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded hover:bg-blue-600 ${
                  cur.code === selectedCurrency?.code ? "bg-blue-700" : ""
                }`}
              >
                {cur.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
