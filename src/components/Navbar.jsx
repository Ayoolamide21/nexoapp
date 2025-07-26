import React, { useState, useEffect } from "react";

import { FaGlobe, FaBars, FaTimes } from "react-icons/fa";


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-[999] w-full px-6 lg:px-12 py-3 flex items-center justify-between font-inter transition duration-300 text-white ${
  scrolled ? "bg-black/40 backdrop-blur-md shadow-md" : "bg-black/20 backdrop-blur-sm"
}`}>
  {/* Left: Logo */}
  <div className="flex items-center gap-2">
    <img src="/logo.svg" alt="Logo" className="h-5 w-auto" />
    <span className="text-base font-semibold tracking-wide">CryptoStand</span>
  </div>

  {/* 🔄 Toggle button for mobile */}
  <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">
    <FaBars />
  </button>

  {/* Center: Desktop Nav */}
  <ul className="hidden lg:flex gap-8 text-sm font-medium">
    <li><a href="#personal" className="hover:text-blue-300">Personal</a></li>
    <li><a href="#business" className="hover:text-blue-300">Business</a></li>
    <li><a href="#markets" className="hover:text-blue-300">Markets</a></li>
    <li><a href="#company" className="hover:text-blue-300">Company</a></li>
  </ul>

  {/* Right: Auth Buttons + Globe */}
  <div className="hidden lg:flex items-center gap-3">
    <button className="px-3 py-1 border border-gray-300 rounded hover:border-white hover:text-blue-300 text-sm">Log In</button>
    <button className="px-3 py-1 bg-blue-500 text-white rounded font-medium hover:bg-blue-600 transition duration-200 text-sm">Sign Up</button>
    <FaGlobe className="h-4 w-4 text-white hover:text-blue-300 cursor-pointer" />
  </div>

  {/* 📱 Mobile Menu */}
  {menuOpen && (
    <ul className="absolute top-full left-0 w-full bg-black/80 text-white flex flex-col gap-4 p-4 lg:hidden">
      <li><a href="#personal">Personal</a></li>
      <li><a href="#business">Business</a></li>
      <li><a href="#markets">Markets</a></li>
      <li><a href="#company">Company</a></li>
      <li><button className="border border-gray-300 rounded px-3 py-1 text-sm">Log In</button></li>
      <li><button className="bg-blue-500 rounded px-3 py-1 text-sm">Sign Up</button></li>
    </ul>
  )}
</nav>

  );
};

export default Navbar;
