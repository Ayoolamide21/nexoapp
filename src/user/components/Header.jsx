import React, { useState, useRef, useEffect } from "react";
import {
  FiBell,
  FiUser,
  FiMenu,
  FiX,
  FiHelpCircle,
  FiLogOut,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { BsGlobe, BsGift, BsShield } from "react-icons/bs";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { makeDeposit, fetchPaymentGateways } from "/src/api/depositApi";
import { logoutUser } from "/src/api/authApi";
import { fetchFrontSettings } from "/src/api/frontApi";
import NotificationsDropdown from "./NotificationsDropdown";
import { useBalanceVisibility } from "/src/context/BalanceVisibilityContext";

// 🧩 Helper to update favicon dynamically
const updateFavicon = (faviconUrl) => {
  const head = document.getElementsByTagName("head")[0];
  head.querySelectorAll("link[rel*='icon']").forEach((icon) => icon.remove());
  const link = document.createElement("link");
  link.type = "image/x-icon";
  link.rel = "shortcut icon";
  link.href = faviconUrl;
  head.appendChild(link);
};

// Small component for dropdown menu items
const MenuItem = ({ icon, label, rightArrow = false, className = "", onClick }) => (
  <div
    onClick={onClick}
    className={`flex justify-between items-center px-3 py-2 rounded hover:bg-gray-100 cursor-pointer ${className}`}
  >
    <span className="flex items-center gap-2">
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </span>
    {rightArrow && <span className="text-gray-400">&gt;</span>}
  </div>
);

const Header = () => {
  // === Core States ===
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const userMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // === Deposit & Payment States ===
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [loadingDeposit, setLoadingDeposit] = useState(false);
  const [bankTransferDetails, setBankTransferDetails] = useState(null);
  const [showBankDetailsModal, setShowBankDetailsModal] = useState(false);

  // === Language & Site Settings ===
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState({ code: "en", label: "English" });
  const [openLanguageMenu, setOpenLanguageMenu] = useState(null);
  const [logoUrl, setLogoUrl] = useState("");
  const [siteName, setSiteName] = useState("");

  const { showBalance, toggleBalanceVisibility } = useBalanceVisibility();

  // === Fetch Site Settings ===
  useEffect(() => {
    const loadFrontSettings = async () => {
      try {
        const data = await fetchFrontSettings();
        if (data.logo) setLogoUrl(data.logo);
        if (data.favicon) updateFavicon(data.favicon);
        if (data.language) {
          const defaultLanguage = {
            code: data.language.code,
            label: data.language.label,
            direction: data.language.direction,
          };
          setSelectedLanguage(defaultLanguage);
          localStorage.setItem("selectedLanguage", JSON.stringify(defaultLanguage));
        }
        if (data.available_languages) setLanguages(data.available_languages);
        if (data.sitename) setSiteName(data.sitename);
      } catch {
   // silently ignore errors
      }
    };
    loadFrontSettings();
  }, []);

  // === Restore saved language from localStorage ===
  useEffect(() => {
    const savedLang = localStorage.getItem("selectedLanguage");
    if (savedLang) setSelectedLanguage(JSON.parse(savedLang));
  }, []);

  // === Fetch Payment Gateways ===
  useEffect(() => {
    const loadGateways = async () => {
      try {
        const res = await fetchPaymentGateways();
        if (res && res.gateways) {
          const formatted = res.gateways.map((g) => ({
            value: g.name.toLowerCase(),
            label: g.name.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
          }));
          setPaymentMethods(formatted);
          if (formatted.length > 0) setSelectedMethod(formatted[0].value);
        }
      } catch {
        // silently ignore errors
      }
    };
    loadGateways();
  }, []);

  // === Utility Effects ===
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setDepositModalOpen(false);
        setShowBankDetailsModal(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // === Deposit Form Submit ===
  const handleDepositSubmit = async (e) => {
    e.preventDefault();
    if (!depositAmount || depositAmount <= 0) {
      toast.error("Please enter a valid deposit amount.");
      return;
    }

    setLoadingDeposit(true);
    try {
      const result = await makeDeposit(parseFloat(depositAmount), selectedMethod);
      if (
        (selectedMethod === "nowpayment" || selectedMethod === "coinpayment") &&
        result.payment_url
      ) {
        window.location.href = result.payment_url;
      } else if (selectedMethod === "bank_transfer") {
        setBankTransferDetails(result.bank_details);
        setShowBankDetailsModal(true);
        setDepositModalOpen(false);
      } else {
        toast.success(result.message || "Deposit successful!");
        setDepositModalOpen(false);
        setDepositAmount("");
      }
    } catch (err) {
      toast.error(err.message || "Deposit failed. Please try again.");
    } finally {
      setLoadingDeposit(false);
    }
  };

  // === Language Handlers ===
  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    localStorage.setItem("selectedLanguage", JSON.stringify(lang));
    setOpenLanguageMenu(null);
  };
  const toggleLanguageMenu = (code) =>
    setOpenLanguageMenu(openLanguageMenu === code ? null : code);

  // === Navigation Links ===
  const navLinks = [
    { name: "Overview", href: "/dashboard" },
    { name: "My Goals", href: "/my-goals" },
    { name: "My Portfolio", href: "/my-portfolio" },
    { name: "Explore", href: "/explore" },
    { name: "Activity", href: "/activity" },
  ];

  // === Render ===
  return (
    <nav className="bg-white border-b shadow-sm">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center">
          {logoUrl ? (
            <img src={logoUrl} alt={siteName} className="h-8" />
          ) : (
            <span className="text-lg font-bold">{siteName}</span>
          )}
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map(({ name, href }) => (
            <Link
              key={name}
              to={href}
              className={`text-sm font-medium ${
                location.pathname === href
                  ? "text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {name}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          {/* Deposit Button */}
          <button
            className="hidden md:inline-block px-3 py-1 bg-black text-white rounded-lg text-sm"
            onClick={() => setDepositModalOpen(true)}
          >
            Make Deposit
          </button>

          {/* Deposit Modal */}
          {depositModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
                <button
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-900"
                  onClick={() => setDepositModalOpen(false)}
                >
                  ✕
                </button>
                <h2 className="text-xl font-semibold mb-4">Make a Deposit</h2>

                <form onSubmit={handleDepositSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-1 font-medium">Amount ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="1"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-medium">Payment Method</label>
                    <select
                      value={selectedMethod}
                      onChange={(e) => setSelectedMethod(e.target.value)}
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                      {paymentMethods.map((method) => (
                        <option key={method.value} value={method.value}>
                          {method.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={loadingDeposit}
                    className="w-full bg-black text-white py-2 rounded hover:bg-gray-900 disabled:opacity-50"
                  >
                    {loadingDeposit ? "Processing..." : "Deposit"}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Bank Transfer Modal */}
          {showBankDetailsModal && bankTransferDetails && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
                <button
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-900"
                  onClick={() => {
                    setDepositAmount("");
                    setBankTransferDetails(null);
                    setShowBankDetailsModal(false);
                  }}
                >
                  ✕
                </button>

                <h2 className="text-xl font-semibold mb-4">Bank Transfer Details</h2>
                <p>Please transfer the amount to the bank account below:</p>
                <div className="mt-4 space-y-2 text-sm">
                  <div>
                    <strong>Bank Name:</strong> {bankTransferDetails.bank_name}
                  </div>
                  <div>
                    <strong>Account Number:</strong>{" "}
                    {bankTransferDetails.account_number}
                  </div>
                  <div>
                    <strong>Routing/SWIFT:</strong>{" "}
                    {bankTransferDetails.routing_number}
                  </div>
                  <div>
                    <strong>Reference:</strong>{" "}
                    <code>{bankTransferDetails.reference}</code>
                  </div>
                  <div>
                    <strong>Amount:</strong> ${depositAmount}
                  </div>
                </div>
                <p className="mt-4 text-gray-600 text-xs">
                  Once you complete the transfer, your deposit will be confirmed
                  manually.
                </p>
                <button
                  onClick={() => setShowBankDetailsModal(false)}
                  className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-900"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Notifications */}
          <div className="relative">
            <button onClick={() => setNotificationsOpen(!notificationsOpen)}>
              <FiBell className="w-5 h-5" />
            </button>
            {notificationsOpen && (
              <NotificationsDropdown onClose={() => setNotificationsOpen(false)} />
            )}
          </div>

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="focus:outline-none"
            >
              <FiUser className="w-5 h-5" />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white shadow-xl rounded-xl border z-50">
                <div className="p-3 space-y-2 text-sm text-gray-800">
                  <Link to="/profile">
                    <MenuItem icon={<FiUser />} label="My profile" />
                  </Link>
                  <Link to="/account-management">
                    <MenuItem icon={<BsShield />} label="Account management" />
                  </Link>
                  <Link to="/rewards">
                    <MenuItem icon={<BsGift />} label="Rewards hub" />
                  </Link>

                  <hr className="my-2" />
                  <Link to="/help-center">
                    <MenuItem icon={<FiHelpCircle />} label="Help Center" />
                  </Link>

                  {/* Language Selector */}
                  <div className="relative">
                    <MenuItem
                      icon={<BsGlobe />}
                      label={selectedLanguage?.label || "English"}
                      rightArrow={true}
                      onClick={() => toggleLanguageMenu(selectedLanguage?.code)}
                    />
                    {openLanguageMenu === selectedLanguage?.code && (
                      <div className="submenu">
                        {languages.map((lang) => (
                          <MenuItem
                            key={lang.code}
                            icon={<BsGlobe />}
                            label={lang.label}
                            onClick={() => handleLanguageChange(lang)}
                            selected={lang.code === selectedLanguage?.code}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Toggle Balance Visibility */}
                  <div
                    onClick={toggleBalanceVisibility}
                    className="flex justify-between items-center hover:bg-gray-100 rounded px-3 py-2 cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-lg">
                        {showBalance ? <FiEye /> : <FiEyeOff />}
                      </span>
                      <span>
                        {showBalance ? "Hide Balance" : "Show Balance"}
                      </span>
                    </span>
                  </div>

                  <hr className="my-2" />
                  <MenuItem
                    icon={<FiLogOut />}
                    label="Log out"
                    className="text-red-500"
                    onClick={async () => {
                      try {
                        localStorage.removeItem("auth_token");
                        await logoutUser();
                        toast.success("Logged out successfully!");
                        navigate("/login", { state: { loggedOut: true } });
                      } catch (err) {
                        toast.error(err.message || "Logout failed.");
                      }
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white border-t">
          {navLinks.map(({ name, href }) => (
            <Link
              key={name}
              to={href}
              className={`block text-sm font-medium ${
                location.pathname === href
                  ? "text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {name}
            </Link>
          ))}
          <button
            className="w-full mt-2 px-3 py-2 bg-black text-white rounded-lg text-sm"
            onClick={() => {
              setDepositModalOpen(true);
              setMenuOpen(false);
            }}
          >
            Make Deposit
          </button>
        </div>
      )}
    </nav>
  );
};

export default Header;
