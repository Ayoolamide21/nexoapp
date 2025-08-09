import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FeatureHighlights from "../components/FeatureHighlights";
import HeroSlider from "../components/HeroSlider";

import { FaCheck, FaLock, FaChartLine, FaMoneyBillWave, FaSyncAlt, FaBullseye, FaBriefcase} from "react-icons/fa";

export default function Personal() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white text-center py-16 px-4">
        <h1 className="text-4xl font-bold mb-4 text-white">Grow & Manage Your Crypto Portfolio</h1>
        <p className="text-lg text-white-600 max-w-2xl mx-auto">
          Use flexible and fixed options to earn, invest, or access liquidity — all in one place.
        </p>
      </section>

      {/* Main Section */}
      <main className="max-w-6xl mx-auto px-4 py-16 space-y-24 font-sans text-gray-900">

        {/* Grow Your Portfolio */}
        <section>
         <h2 className="flex items-center text-3xl font-bold mb-10 gap-3">
  <FaChartLine className="text-green-500" />
  Grow Your Portfolio
</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Card: Flexible Savings */}
            <div id="flexible" className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Flexible Savings</h3>
              <p className="text-sm text-gray-600 mb-3">
                Let your idle crypto work for you with daily payouts and full access anytime.
              </p>
              <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                <li className="flex items-center gap-2">
    <FaCheck className="text-green-500" />
    Daily rewards
  </li>
  <li className="flex items-center gap-2">
    <FaCheck className="text-green-500" />
    No lock-in
  </li>
  <li className="flex items-center gap-2">
    <FaCheck className="text-green-500" />
    Withdraw anytime
  </li>
              </ul>
            </div>

            {/* Card: Fixed-Term Savings */}
            <div id="fixed-term" className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Fixed-Term Savings</h3>
              <p className="text-sm text-gray-600 mb-3">
                Lock assets to earn higher returns. Choose durations from 7 days to 12 months.
              </p>
              <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                <li className="flex items-center gap-2">
    <FaLock className="text-blue-500" />
    Higher yields
  </li>
  <li className="flex items-center gap-2">
    <FaChartLine className="text-blue-500" />
    Fixed earnings
  </li>
  <li className="flex items-center gap-2">
    <FaMoneyBillWave className="text-blue-500" />
    Auto payout at maturity
  </li>
              </ul>
            </div>

            {/* Card: Dual Investment */}
            <div id="dual-investment" className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Dual Investment</h3>
              <p className="text-sm text-gray-600 mb-3">
                Set buy/sell targets and earn high yield — even if the market moves sideways.
              </p>
              <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                <li className="flex items-center gap-2">
    <FaSyncAlt className="text-blue-500" />
    Earn in any market
  </li>
  <li className="flex items-center gap-2">
    <FaBullseye className="text-blue-500" />
    Smart entry/exit strategy
  </li>
  <li className="flex items-center gap-2">
    <FaBriefcase className="text-blue-500" />
    High yield potential
  </li>
              </ul>
            </div>

          </div>
        </section>

        {/* Manage Your Assets */}
        <section id="manage-assets" className="mt-16">
          <h2 className="flex items-center text-3xl font-bold mb-10 gap-3">
  <FaBriefcase className="text-blue-500" />
  Manage Your Assets
</h2>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Card: Exchange */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Exchange</h3>
              <p className="text-sm text-gray-600">
                Trade over 100 digital assets instantly with competitive market rates.
              </p>
            </div>

            {/* Card: Credit Line */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Credit Line</h3>
              <p className="text-sm text-gray-600">
                Borrow instantly without selling your crypto. Use your holdings as collateral.
              </p>
            </div>

            {/* Card: Futures */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Futures</h3>
              <p className="text-sm text-gray-600">
                Trade perpetual contracts and profit in both bullish and bearish markets.
              </p>
            </div>

          </div>
        </section>
      </main>
      <HeroSlider/>
<FeatureHighlights/>
      <Footer />
    </>
  );
}
