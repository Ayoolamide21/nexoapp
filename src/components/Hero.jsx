import React from "react";
import { FaArrowRight, FaBuilding, FaHeadset, FaWallet } from "react-icons/fa";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="w-full h-screen text-white font-inter flex items-center">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between w-full gap-16 px-8 xl:px-24">
        {/* Left: Content */}
        <div className="flex-1 flex flex-col justify-center items-start">
          <h1 className="text-4xl xl:text-6xl font-bold leading-tight mb-6">
            AstroVisionTrade
          </h1>
          <p className="text-lg xl:text-xl text-gray-300 mb-6">
            Empowering Wealth Through Digital Assets
          </p>

          {/* ✅ Updated Sign Up button */}
        <Link to="/signup" className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-7 py-3 rounded-lg font-semibold transition">
            Sign Up <FaArrowRight />
          </Link>

          <p className="text-sm text-gray-400 mt-4 max-w-lg xl:text-base">
            Unlock white-glove wealth solutions when you add <strong>$100,000+</strong>. Discover CryptoStand Private.
          </p>
        </div>

        {/* Right: App Preview */}
        <div className="flex-1 flex justify-center">
          <img
            src="/images/google_review.png"
            alt="Crypto App Preview"
            className="w-64 lg:w-80 xl:w-96 h-auto drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
