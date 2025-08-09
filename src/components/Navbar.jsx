import React, { useState, useEffect, useRef } from "react";
import { FaGlobe, FaBars } from "react-icons/fa";
import { Link, Links } from "react-router-dom";

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
  const [showCompanyMenu, setShowCompanyMenu] = useState(false);
  const [showMarketsMenu, setShowMarketsMenu] = useState(false);
  const [showPersonalMenu, setShowPersonalMenu] = useState(false);
  const personalRef = useRef(null);
  const personalMenuRef = useRef(null);
  const marketsRef = useRef(null);
  const marketsMenuRef = useRef(null);
  const companyRef = useRef(null);
  const companyMenuRef = useRef(null);
  const [showBusinessMenu, setShowBusinessMenu] = useState(false);
const businessRef = useRef(null);
const businessMenuRef = useRef(null);


  const [coins, setCoins] = useState([]);

  const dropdownRef = useRef();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,binancecoin,tether")
      .then((res) => res.json())
      .then((data) => setCoins(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <nav className={`sticky top-0 z-50 w-full px-6 lg:px-12 py-3 flex items-center justify-between transition duration-300 font-inter text-white ${scrolled ? "bg-black/50 backdrop-blur-lg shadow-md" : "bg-black/20 backdrop-blur-sm"}`}>
      {/* Logo */}
      <div className="flex items-center gap-2">
        <a href="/">
          <img src="/images/logo.png" alt="AstroVisionTrade Logo" className="h-10 w-auto object-contain" />
        </a>
      </div>

      {/* Mobile Toggle */}
      <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">
        <FaBars />
      </button>

      {/* Desktop Nav */}
      <ul className="hidden lg:flex gap-8 text-sm font-medium relative">
        {/* Personal Menu */}
        <li
  className="relative"
  ref={personalRef}
  onMouseEnter={() => setShowPersonalMenu(true)}
  onMouseLeave={() => {
    setTimeout(() => {
      if (
        !personalRef.current?.matches(':hover') &&
        !personalMenuRef.current?.matches(':hover')
      ) {
        setShowPersonalMenu(false);
      }
    }, 100);
  }}
>
          <span className="hover:text-blue-400 cursor-pointer">Personal</span>
          {showPersonalMenu && (
            <div
      ref={personalMenuRef}
      className="absolute top-full left-0 mt-3 w-[900px] bg-white text-gray-900 shadow-2xl rounded-xl p-6 grid grid-cols-3 gap-6 z-50"
      onMouseLeave={() => {
        setTimeout(() => {
          if (
            !personalRef.current?.matches(':hover') &&
            !personalMenuRef.current?.matches(':hover')
          ) {
            setShowPersonalMenu(false);
          }
        }, 100);
      }}
    >
              {/* Column 1 - Grow your savings */}
              <div>
      <h4 className="font-semibold text-sm mb-3">Grow your savings</h4>
      <ul className="space-y-3 text-sm">
        <li>
          <Link to="/personal#flexible" className="font-medium text-blue-600 hover:underline">
            Flexible Savings
          </Link>
          <p className="text-xs text-gray-500">
            Earn daily rewards on your idle funds — withdraw anytime with zero lock-in.
          </p>
        </li>
        <li>
          <Link to="/personal#fixed-term" className="font-medium text-blue-600 hover:underline">
            Fixed-term Savings
          </Link>
          <p className="text-xs text-gray-500">
            Lock in higher returns by committing assets for set periods, up to 12 months.
          </p>
        </li>
        <li>
          <Link to="/personal#dual-investment" className="font-medium text-blue-600 hover:underline">
            Dual Investment
          </Link>
          <p className="text-xs text-gray-500">
            Maximize yields while setting buy-low and sell-high orders — earn regardless of market direction.
          </p>
        </li>
      </ul>
    </div>
              {/* Column 2 - Manage your assets */}
              <div>
                <h4 className="font-semibold text-sm mb-3">Manage your assets</h4>
                <ul className="space-y-3 text-sm">
                  <li>
                  <Link to="/personal#manage-assets" className="font-medium text-blue-600 hover:underline">
                    <p className="font-medium">Invest</p>
                     </Link>
                     <p className="text-xs text-gray-500">Trade over 5 digital assets instantly with competitive rates.</p>
                 </li>
                  
                  
                  <li>
                    <p className="font-medium">Credit Line</p>
                    <p className="text-xs text-gray-500">Borrow funds without selling your digital assets.</p>
                  </li>
                  <li>
                    <p className="font-medium">Futures</p>
                    <p className="text-xs text-gray-500">Trade perpetual contracts to profit from both rising and falling markets.</p>
                  </li>
                </ul>
              </div>

              {/* Column 3 - Spend anywhere + Extras */}
              <div className="flex flex-col gap-4">
                <div>
                  <h4 className="font-semibold text-sm mb-3">Spend anywhere</h4>
                  <p className="font-medium">AstroCard</p>
                  <p className="text-xs text-gray-500">Coming Soon.</p>
                </div>
                <Link to="/plans" className="bg-gray-100 p-3 rounded-lg hover:bg-blue-50">
                <div className="bg-gray-100 p-3 rounded-lg hover:bg-blue-50">
                  <h5 className="font-semibold text-xs mb-1">AstroVision Prime</h5>
                  <p className="text-xs">For $100k+ investors — enjoy personal advisors, exclusive pools, and co-investment deals.</p>
                </div>
                </Link>
                <Link to="/plans" className="bg-gray-100 p-3 rounded-lg hover:bg-blue-50">
                  <div className="bg-gray-100 p-3 rounded-lg hover:bg-blue-50">
                  <h5 className="font-semibold text-xs mb-1">AstroPerks Loans</h5>
                  <p className="text-xs">Unlock low-interest credit lines based on your portfolio — no credit check required.</p>
                </div>
                </Link>
                
              </div>
            </div>
          )}
        </li>

        {/* Business Menu */}
<li
  className="relative"
  ref={companyRef /* I'll create a new ref for business */}
  onMouseEnter={() => setShowBusinessMenu(true)}
  onMouseLeave={() => {
    setTimeout(() => {
      if (
        !businessRef.current?.matches(':hover') &&
        !businessMenuRef.current?.matches(':hover')
      ) {
        setShowBusinessMenu(false);
      }
    }, 100);
  }}
>
  <span className="hover:text-blue-400 cursor-pointer">Business</span>
  {showBusinessMenu && (
    <div
      ref={businessMenuRef}
      className="absolute top-full left-0 mt-3 w-[900px] bg-white text-gray-900 shadow-2xl rounded-xl p-6 grid grid-cols-3 gap-6 z-50"
      onMouseLeave={() => {
        setTimeout(() => {
          if (
            !businessRef.current?.matches(':hover') &&
            !businessMenuRef.current?.matches(':hover')
          ) {
            setShowBusinessMenu(false);
          }
        }, 100);
      }}
    >
      {/* Column 1 - Business Solutions */}
      <div>
        <h4 className="font-semibold text-sm mb-3">Business Solutions</h4>
        <ul className="space-y-3 text-sm">
          <li>
            <p className="font-medium">Corporate Savings</p>
            <p className="text-xs text-gray-500">Maximize returns on your business funds with flexible options.</p>
          </li>
          <li>
            <p className="font-medium">Payment Processing</p>
            <p className="text-xs text-gray-500">Seamlessly accept digital payments globally.</p>
          </li>
          <li>
            <p className="font-medium">Merchant Services</p>
            <p className="text-xs text-gray-500">Tailored financial tools to help your business grow.</p>
          </li>
        </ul>
      </div>

      {/* Column 2 - Manage Business Assets */}
      <div>
        <h4 className="font-semibold text-sm mb-3">Manage Business Assets</h4>
        <ul className="space-y-3 text-sm">
          <li>
            <p className="font-medium">Business Exchange</p>
            <p className="text-xs text-gray-500">Trade assets with competitive rates and low fees.</p>
          </li>
          <li>
            <p className="font-medium">Credit Lines</p>
            <p className="text-xs text-gray-500">Access flexible credit solutions designed for enterprises.</p>
          </li>
          <li>
            <p className="font-medium">Investment Portfolios</p>
            <p className="text-xs text-gray-500">Diversify and grow your business investments smartly.</p>
          </li>
        </ul>
      </div>

      {/* Column 3 - Extras */}
      <div className="flex flex-col gap-4">
        <div>
          <h4 className="font-semibold text-sm mb-3">Exclusive Programs</h4>
          <p className="font-medium">AstroBusiness Prime</p>
          <p className="text-xs text-gray-500">For enterprises — enjoy personalized support and premium benefits.</p>
        </div>
        <Link to="/business-plans" className="bg-gray-100 p-3 rounded-lg hover:bg-blue-50">
          <h5 className="font-semibold text-xs mb-1">Business Loans</h5>
          <p className="text-xs">Access low-interest loans tailored for your company’s growth.</p>
        </Link>
        <Link to="/business-support" className="bg-gray-100 p-3 rounded-lg hover:bg-blue-50">
          <h5 className="font-semibold text-xs mb-1">Dedicated Support</h5>
          <p className="text-xs">Get priority assistance from our business support team.</p>
        </Link>
      </div>
    </div>
  )}
</li>

        {/* Markets Menu */}
        <li className="relative">
          <span
            className="hover:text-blue-400 cursor-pointer"
            onMouseEnter={() => setShowMarketsMenu(true)}
            onMouseLeave={() => {
              setTimeout(() => {
                if (!marketsRef.current?.matches(':hover') && !marketsMenuRef.current?.matches(':hover')) {
                  setShowMarketsMenu(false);
                }
              }, 100);
            }}
          >
            Markets
          </span>

          {showMarketsMenu && (
            
            <div
              ref={marketsMenuRef}
              className="absolute top-full left-0 mt-3 w-[400px] bg-white text-gray-800 shadow-2xl rounded-xl p-6 z-50"
              onMouseLeave={() => {
                setTimeout(() => {
                  if (!marketsRef.current?.matches(':hover') && !marketsMenuRef.current?.matches(':hover')) {
                    setShowMarketsMenu(false);
                  }
                }, 100);
              }}
            >
              <h4 className="font-semibold text-sm mb-2">Live Crypto Prices</h4>
              <ul className="divide-y divide-gray-200">
                {coins.map((coin) => (
                  <li key={coin.id} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <img src={coin.image} alt={coin.symbol} className="w-5 h-5" />
                      <span>{coin.name}</span>
                    </div>
                    <span className="text-sm font-medium">${coin.current_price.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>

        {/* Company Menu */}
        <li className="relative"
          onMouseEnter={() => setShowCompanyMenu(true)}
          onMouseLeave={() => {
            setTimeout(() => {
              if (!companyRef.current?.matches(':hover') && !companyMenuRef.current?.matches(':hover')) {
                setShowCompanyMenu(false);
              }
            }, 100);
          }}
          ref={companyRef}
          >
          <span className="hover:text-blue-400 cursor-pointer">Company</span>
          {showCompanyMenu && (
            <div
              ref={companyMenuRef}
              className="absolute top-full left-0 mt-3 w-[700px] bg-white text-gray-800 shadow-2xl rounded-xl p-6 grid grid-cols-3 gap-6 z-50"
              onMouseLeave={() => {
                setTimeout(() => {
                  if (!companyRef.current?.matches(':hover') && !companyMenuRef.current?.matches(':hover')) {
                    setShowCompanyMenu(false);
                  }
                }, 100);
              }}
            >
              <div>
                <h4 className="font-semibold text-sm mb-3">Get Started</h4>
                <p className="text-xs mb-4">Buy BTC, ETH and start earning interest.</p>
                <li><Link to="/signup" className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 text-sm"> Buy assets → </Link> </li>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-3">Company</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/about" className="hover:text-blue-600">About</Link></li>
                  <li><Link to="/support" className="hover:text-blue-600">Help Center</Link></li>
                  <li><Link to="/careers" className="hover:text-blue-600">Careers</Link></li>
                </ul>
              </div>
              <div className="flex flex-col gap-3">
                <div className="bg-gray-100 p-3 rounded-lg hover:bg-blue-50" >
                <Link to="/plans" className="font-semibold text-xs mb-1">
                <h5 className="font-semibold text-xs">AstroVision Prime
                </h5>
                 <p className="text-xs">For $100k+ investors — enjoy personal advisors, exclusive pools, and co-investment deals.</p>
                </Link>
                </div>

                <div className="bg-gray-100 p-3 rounded-lg hover:bg-blue-50">
                <Link to="/plans" className="font-semibold text-xs mb-1">
                <h5 className="font-semibold text-xs">AstroPerks Loans</h5>
                <p className="text-xs">Unlock low-interest credit lines based on your portfolio — no credit check required.</p>
                </Link>
                </div>
              </div>
            </div>
          )}
        </li>
      </ul>
      {/* Right Side */}
      <div className="hidden lg:flex items-center gap-3 relative" ref={dropdownRef}>
        <Link to="/login" className="px-3 py-1 border border-gray-500 rounded hover:border-white hover:text-blue-300 text-sm">Log In</Link>
        <Link to="/signup" className="px-3 py-1 bg-blue-500 text-white rounded font-medium hover:bg-blue-700 transition text-sm">Sign Up</Link>
        <div className="relative inline-block">
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-1 hover:text-blue-300 border border-transparent hover:border-white rounded px-2 py-1 text-sm">
            <FaGlobe className="h-4 w-4" />
            {selectedLanguage.code.toUpperCase()} / {selectedCurrency.code}
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-black/90 backdrop-blur-md rounded-xl shadow-2xl text-white z-50 flex divide-x divide-gray-700 overflow-hidden">
              <div className="flex-1 p-3">
                <p className="text-xs uppercase font-semibold mb-2">Language</p>
                {languages.map((lang) => (
                  <button key={lang.code} onClick={() => { setSelectedLanguage(lang); setDropdownOpen(false); }}
                    className={`flex items-center gap-2 w-full px-3 py-2 rounded hover:bg-blue-600 ${lang.code === selectedLanguage.code ? "bg-blue-700" : ""}`}>
                    <img src={`/flags/${lang.code}.svg`} alt={lang.label} className="w-4 h-4" />
                    {lang.label}
                  </button>
                ))}
              </div>
              <div className="flex-1 p-3">
                <p className="text-xs uppercase font-semibold mb-2">Currency</p>
                {currencies.map((cur) => (
                  <button key={cur.code} onClick={() => { setSelectedCurrency(cur); setDropdownOpen(false); }}
                    className={`block w-full text-left px-3 py-2 rounded hover:bg-blue-600 ${cur.code === selectedCurrency.code ? "bg-blue-700" : ""}`}>
                    {cur.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Nav */}
{menuOpen && (
  <div className="absolute top-full left-0 w-full bg-black text-white p-4 lg:hidden z-40 flex flex-col gap-6 border-t border-gray-700 shadow-lg">
    {/* Personal Section */}
    <div>
      <button
        onClick={() => setShowPersonalMenu(!showPersonalMenu)}
        className="flex justify-between w-full font-semibold text-lg border-b border-gray-700 pb-2"
      >
        Personal {showPersonalMenu ? "▲" : "▼"}
      </button>
      {showPersonalMenu && (
        <ul className="mt-2 pl-4 space-y-2 text-sm">
          <li><Link to="/personal#flexible" className="block hover:text-blue-400">Flexible Savings</Link></li>
          <li><Link to="/personal#fixed-term" className="block hover:text-blue-400">Fixed-term Savings</Link></li>
          <li><Link to="/personal#dual-investment" className="block hover:text-blue-400">Dual Investment</Link></li>
        </ul>
      )}
    </div>

    {/* Business Section */}
    <div>
      <button
        onClick={() => setShowBusinessMenu(!showBusinessMenu)}
        className="flex justify-between w-full font-semibold text-lg border-b border-gray-700 pb-2"
      >
        Business {showBusinessMenu ? "▲" : "▼"}
      </button>
      {showBusinessMenu && (
        <ul className="mt-2 pl-4 space-y-2 text-sm">
          <li><Link to="/business" className="block hover:text-blue-400">Business Solutions</Link></li>
          <li><Link to="/business-plans" className="block hover:text-blue-400">Business Loans</Link></li>
          <li><Link to="/business-support" className="block hover:text-blue-400">Dedicated Support</Link></li>
        </ul>
      )}
    </div>

    {/* Markets Section */}
    <div>
      <button
        onClick={() => setShowMarketsMenu(!showMarketsMenu)}
        className="flex justify-between w-full font-semibold text-lg border-b border-gray-700 pb-2"
      >
        Markets {showMarketsMenu ? "▲" : "▼"}
      </button>
      {showMarketsMenu && (
        <ul className="mt-2 pl-4 space-y-2 text-sm max-h-48 overflow-y-auto">
          {coins.map((coin) => (
            <li key={coin.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={coin.image} alt={coin.symbol} className="w-5 h-5 rounded-full" />
                <span>{coin.name}</span>
              </div>
              <span>${coin.current_price.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>

    {/* Company Section */}
    <div>
      <button
        onClick={() => setShowCompanyMenu(!showCompanyMenu)}
        className="flex justify-between w-full font-semibold text-lg border-b border-gray-700 pb-2"
      >
        Company {showCompanyMenu ? "▲" : "▼"}
      </button>
      {showCompanyMenu && (
        <ul className="mt-2 pl-4 space-y-2 text-sm">
          <li><Link to="/about" className="block hover:text-blue-400">About</Link></li>
          <li><Link to="/support" className="block hover:text-blue-400">Support</Link></li>
          <li><Link to="/careers" className="block hover:text-blue-400">Careers</Link></li>
        </ul>
      )}
    </div>

    {/* Auth Buttons */}
    <div className="flex flex-col gap-2 mt-4">
      <Link
        to="/login"
        className="block w-full text-center px-4 py-2 border border-gray-600 rounded hover:border-blue-400 hover:text-blue-400 transition"
      >
        Log In
      </Link>
      <Link
        to="/signup"
        className="block w-full text-center px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition text-white font-semibold"
      >
        Sign Up
      </Link>
    </div>
  </div>
)}

    </nav>
  );
};

export default Navbar;
