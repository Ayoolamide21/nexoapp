import React, { useState, useEffect, useRef } from "react";
import { FaGlobe, FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
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


const Navbar = () => {
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState({ code: "USD", label: "USD $" });
const [selectedLanguage, setSelectedLanguage] = useState({ code: 'en', label: 'English', direction: 'ltr' });
const [languages, setLanguages] = useState([]);

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
const isBusinessActive = location.pathname.startsWith("/business");

const [logoUrl, setLogoUrl] = useState("");
const [siteName, setSiteName] = useState("");


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
  const loadFrontSettings = async () => {
    try {
      const data = await fetchFrontSettings();
      if (data.logo) {
              setLogoUrl(data.logo);
            }
      if (data.favicon) {
  updateFavicon(data.favicon);
    
}
 if (data.currency) {
        setSelectedCurrency({
          code: data.currency.code,
          label: `${data.currency.code} ${data.currency.symbol}`
        });
}

  if (data.sitename) {
        setSiteName(data.sitename);
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
          label: data.language.label,
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
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,binancecoin,tether")
      .then((res) => res.json())
      .then((data) => setCoins(data))
  }, []);

  return (
    <nav className={`sticky top-0 z-50 w-full px-6 lg:px-12 py-3 flex items-center justify-between transition duration-300 font-inter text-white ${scrolled ? "bg-black/50 backdrop-blur-lg shadow-md" : "bg-black/20 backdrop-blur-sm"}`}>
     
    {/* Logo */}
      <div className="flex items-center gap-2">
  <NavLink to="/">
  {logoUrl ? (
    <img src={logoUrl} alt={`${siteName} logo`} className="h-10 w-auto object-contain" />
    ) : (
          <span className="text-lg font-bold">{siteName}</span> 
        )}
  </NavLink>
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
>         <NavLink to="/personal#" className={({ isActive }) => isActive? "bg-blue-100 p-3 rounded-lg text-blue-400" 
            : "hover:text-blue-400 cursor-pointer"
        }>
          <span className="hover:text-blue-400 cursor-pointer">Personal</span>
        </NavLink>
          
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
          <NavLink to="/personal#flexible" className={({ isActive }) =>
          isActive
            ? "font-medium text-blue-500" 
            : "font-medium hover:text-blue-400"
        }
      >
            Flexible Savings
          <p className="text-xs text-gray-500">
            Earn daily rewards on your idle funds — withdraw anytime with zero lock-in.
          </p>
          </NavLink>
          
        </li>
        <li>
          <NavLink to="/personal#flexible" className={({ isActive }) =>
          isActive
            ? "font-medium text-blue-500" 
            : "font-medium hover:text-blue-400"
        }
      >
            Fixed-term Savings
          <p className="text-xs text-gray-500">
            Lock in higher returns by committing assets for set periods, up to 12 months.
          </p>
          </NavLink>
          
        </li>
        <li>
          <NavLink to="/personal#flexible" className={({ isActive }) =>
          isActive
            ? "font-medium text-blue-500" 
            : "font-medium hover:text-blue-400"
        }
      >
            Dual Investment
          <p className="text-xs text-gray-500">
            Maximize yields while setting buy-low and sell-high orders — earn regardless of market direction.
          </p>
          </NavLink>
          
        </li>
      </ul>
    </div>
              {/* Column 2 - Manage your assets */}
              <div>
                <h4 className="font-semibold text-sm mb-3">Manage your assets</h4>
                <ul className="space-y-3 text-sm">
                  <li>
                  <NavLink to="/personal#plans" className={({ isActive }) =>
          isActive
            ? "font-medium text-blue-500"
            : "font-medium hover:text-blue-400"
        }
      >
                    <p className="font-medium">Invest</p>
                     <p className="text-xs text-gray-500">Trade over 5 digital assets instantly with competitive rates.</p>
                 </NavLink>
                  </li>
                  
                  
                  <li>
                  <NavLink to="/personal#credit-line" className={({ isActive }) =>
          isActive
            ? "font-medium text-blue-500" 
            : "font-medium hover:text-blue-400"
        }
      >
                    <p className="font-medium">Credit Line</p>
                    <p className="text-xs text-gray-500">Borrow funds without selling your digital assets.</p>
                 </NavLink>
                     </li>
                  <li>
                  <NavLink to="/personal#futures" className={({ isActive }) =>
          isActive
            ? "font-medium text-blue-500" 
            : "font-medium hover:text-blue-400"
        }
      >
                     <p className="font-medium">Futures</p>
                    <p className="text-xs text-gray-500">Trade perpetual contracts to profit from both rising and falling markets.</p>
                  </NavLink>
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
        <NavLink to="/plans" className={({ isActive }) => isActive? "bg-blue-200 p-3 rounded-lg" 
            : "hover:bg-blue-50 bg-gray-100 p-3 rounded-lg"
        }
      >
      <h5 className="font-semibold text-xs mb-1">AstroVision Prime</h5>
      <p className="text-xs">For $100k+ investors — enjoy personal advisors, exclusive pools, and co-investment deals.</p>
      </NavLink>

      <NavLink to="/business/loans" className={({ isActive }) => isActive? "bg-blue-200 p-3 rounded-lg" 
            : "hover:bg-blue-50 bg-gray-100 p-3 rounded-lg"
        }
      >
      <h5 className="font-semibold text-xs mb-1">AstroPerks Loans</h5>
      <p className="text-xs">Unlock low-interest credit lines based on your portfolio — no credit check required.</p>
      </NavLink>
     
                
              </div>
            </div>
          )}
        </li>

        {/* Business Menu */}
<li
  className="relative"
  ref={companyRef}
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
  <NavLink to="#" className={
        isBusinessActive
          ? "bg-blue-100 p-3 rounded-lg text-blue-400"
          : "hover:text-blue-400 cursor-pointer"
      }
    >
    <span className="hover:text-blue-400 cursor-pointer">Business</span>
  </NavLink>
  
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
              <NavLink to="/business/corporate-savings" className={({ isActive }) => isActive? "font-medium text-blue-400" 
            : "font-medium hover:text-blue-400"
        }
      >Corporate Savings
              <p className="text-xs text-gray-500">Maximize returns on your business funds with flexible options.</p>
              </NavLink>
          </li>
          <li>
          <NavLink to="/business/payment-processing" className={({ isActive }) => isActive? "font-medium text-blue-400" 
            : "font-medium hover:text-blue-400"
        }>
            <p className="font-medium">Payment Processing</p>
            <p className="text-xs text-gray-500">Seamlessly accept digital payments globally.</p>
          </NavLink>
            </li>
          <li>
          <NavLink to="/business/merchant-services" className={({ isActive }) => isActive? "font-medium text-blue-400" 
            : "font-medium hover:text-blue-400"
        }>
            <p className="font-medium">Merchant Services</p>
            <p className="text-xs text-gray-500">Tailored financial tools to help your business grow.</p>
          </NavLink>
            </li>
        </ul>
      </div>

      {/* Column 2 - Manage Business Assets */}
      <div>
        <h4 className="font-semibold text-sm mb-3">Manage Business Assets</h4>
        <ul className="space-y-3 text-sm">
          <li>
          <NavLink to="/business/exchange" className={({ isActive }) => isActive? "font-medium text-blue-400" 
            : "font-medium hover:text-blue-400"
        }>
        <p className="font-medium">Business Exchange</p>
            <p className="text-xs text-gray-500">Trade assets with competitive rates and low fees.</p>
          </NavLink>
            </li>
          <li>
          <NavLink to="/personal#credit-line" className={({ isActive }) => isActive? "font-medium text-blue-400" 
            : "font-medium hover:text-blue-400"
        }>
            <p className="font-medium">Credit Lines</p>
            <p className="text-xs text-gray-500">Access flexible credit solutions designed for enterprises.</p>
          </NavLink>
            </li>
          <li>
          <NavLink to="/business/portfolio" className={({ isActive }) => isActive? "font-medium text-blue-400" 
            : "font-medium hover:text-blue-400"
        }>
           <p className="font-medium">Investment Portfolios</p>
            <p className="text-xs text-gray-500">Diversify and grow your business investments smartly.</p>
         </NavLink>
           </li>
        </ul>
      </div>

      {/* Column 3 - Extras */}
      <div className="flex flex-col gap-4">
        <div>
          <h4 className="font-semibold text-sm mb-3">Exclusive Programs</h4>
          <NavLink to="/plans" className={({ isActive }) => isActive? "font-medium text-blue-400" 
            : "font-medium hover:text-blue-400"
        }>
        <p className="font-medium">AstroBusiness Prime</p>
          <p className="text-xs text-gray-500">For enterprises — enjoy personalized support and premium benefits.</p>
        </NavLink>
          </div>
        <NavLink to="/business/loans" className="bg-gray-100 p-3 rounded-lg hover:bg-blue-50">
          <h5 className="font-semibold text-xs mb-1">Business Loans</h5>
          <p className="text-xs">Access low-interest loans tailored for your company’s growth.</p>
        </NavLink>
        <NavLink to="/business/support" className="bg-gray-100 p-3 rounded-lg hover:bg-blue-50">
          <h5 className="font-semibold text-xs mb-1">Dedicated Support</h5>
          <p className="text-xs">Get priority assistance from our business support team.</p>
        </NavLink>
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
                <li><NavLink to="/signup" className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 text-sm"> Buy assets → </NavLink> </li>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-3">Company</h4>
                <ul className="space-y-2 text-sm">
                 
        <NavLink to="/about" className={({ isActive }) => isActive? " text-blue-400" 
            : "hover:text-blue-400 cursor-pointer"
        }> About
        </NavLink>
                 
                  <li><NavLink to="/help-center" className={({ isActive }) => isActive? " text-blue-400" 
            : "hover:text-blue-400 cursor-pointer"
        }>
        Help Center</NavLink></li>
                  <li><NavLink to="/careers" className={({ isActive }) => isActive? " text-blue-400" 
            : "hover:text-blue-400 cursor-pointer"
        }>
        Careers</NavLink></li>
                </ul>
              </div>
              <div className="flex flex-col gap-3">
                <NavLink to="/plans" className={({ isActive }) => isActive? "bg-blue-200 p-3 rounded-lg" 
            : "hover:bg-blue-50 bg-gray-100 p-3 rounded-lg"
        }
      >
      <h5 className="font-semibold text-xs mb-1">AstroVision Prime</h5>
      <p className="text-xs">For $100k+ investors — enjoy personal advisors, exclusive pools, and co-investment deals.</p>
      </NavLink>
      <NavLink to="/business/loans" className={({ isActive }) => isActive? "bg-blue-200 p-3 rounded-lg" 
            : "hover:bg-blue-50 bg-gray-100 p-3 rounded-lg"
        }
      >
      <h5 className="font-semibold text-xs mb-1">AstroPerks Loans</h5>
      <p className="text-xs">Unlock low-interest credit lines based on your portfolio — no credit check required.</p>
      </NavLink>

              </div>
            </div>
          )}
        </li>
      </ul>
      {/* Right Side */}
      <div className="hidden lg:flex items-center gap-3 relative" ref={dropdownRef}>
        <NavLink to="/login" className="px-3 py-1 border border-blue-500 rounded hover:border-blue-900 text-sm">Log In</NavLink>
        <NavLink to="/signup" className="px-3 py-1 bg-blue-500 text-white rounded font-medium hover:bg-blue-700 transition text-sm">Sign Up</NavLink>
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
<img src={`/images/flags/${lang.code}.svg`} alt={lang.label} className="w-4 h-4" />
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
          <li><NavLink to="/personal#flexible" className={({ isActive }) => isActive? "block text-blue-400" 
            : "hover:text-blue-400 block"
        }
      >Flexible Savings</NavLink></li>
          <li><NavLink to="/personal#fixed-term" className={({ isActive }) => isActive? "block text-blue-400" 
            : "hover:text-blue-400 block"
        }>Fixed-term Savings</NavLink></li>
          <li><NavLink to="/personal#dual-investment" className={({ isActive }) => isActive? "block text-blue-400" 
            : "hover:text-blue-400 block"
        }>Dual Investment</NavLink></li>
          <li><NavLink to="/personal#plans" className={({ isActive }) => isActive? "block text-blue-400" 
            : "hover:text-blue-400 block"
        }>Invest</NavLink></li>
          <li><NavLink to="/personal#credit-line" className={({ isActive }) => isActive? "block text-blue-400" 
            : "hover:text-blue-400 block"
        }>Credit Line</NavLink></li>
          <li><NavLink to="/personal#futures" className={({ isActive }) => isActive? "block text-blue-400" 
            : "hover:text-blue-400 block"
        }>Futures</NavLink></li>
          <li><NavLink to="/plans" className={({ isActive }) => isActive? "block text-blue-400" 
            : "hover:text-blue-400 block"
        }>AstroVision Prime</NavLink></li>
          <li><NavLink to="/business/loans" className={({ isActive }) => isActive? "block text-blue-400" 
            : "hover:text-blue-400 block"
        }>AstroPerks Loans</NavLink></li>
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
          <li><NavLink to="/business/corporate-savings" className={({ isActive }) => isActive? "block text-blue-400" 
            : "hover:text-blue-400 block"
        }>Corporate Savings</NavLink></li>
          <li><NavLink to="/business/payment-processing" className={({ isActive }) => isActive? "block text-blue-400" 
            : "hover:text-blue-400 block"
        }>Payment Processing</NavLink></li>
          <li><NavLink to="/business/merchant-services" className={({ isActive }) => isActive? "block text-blue-400" 
            : "hover:text-blue-400 block"
        }>Merchant Services</NavLink></li>
          <li><NavLink to="/business/exchange" className={({ isActive }) => isActive? "block text-blue-400" 
            : "hover:text-blue-400 block"
        }>Business Exchange</NavLink></li>
          <li><NavLink to="/business/prime" className={({ isActive }) => isActive? "block text-blue-400" 
            : "hover:text-blue-400 block"
        }>AstroBusiness Prime</NavLink></li>
        <li><NavLink to="/business/loans" className={({ isActive }) => isActive? "block text-blue-400" 
            : "hover:text-blue-400 block"
        }>Business Loans</NavLink></li>
        <li><NavLink to="/business/support" className={({ isActive }) => isActive? "block text-blue-400" 
            : "hover:text-blue-400 block"
        }>Dedicated Support</NavLink></li>
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
        <ul className="mt-2 pl-4 space-y-2 text-sm">
          {coins.map((coin) => (
            <li key={coin.id} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img src={coin.image} alt={coin.symbol} className="w-5 h-5" />
                <span>{coin.name}</span>
              </div>
              <span className="text-sm font-medium">${coin.current_price.toLocaleString()}</span>
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
          <li><NavLink to="/about" className={({ isActive }) => isActive? "block text-blue-400" 
            : "hover:text-blue-400 block"
        }>About</NavLink></li>
          <li><NavLink to="/help-center" className={({ isActive }) => isActive? "block text-blue-400" 
            : "hover:text-blue-400 block"
        }>Help Center</NavLink></li>
          <li><NavLink to="/careers" className={({ isActive }) => isActive? "block text-blue-400" 
            : "hover:text-blue-400 block"
        }>Careers</NavLink></li>
        </ul>
      )}
    </div>
  </div>
)}


    </nav>
  );
};

export default Navbar;
