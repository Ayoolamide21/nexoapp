import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PlansList from "../components/PlansList";
import { BsSearch } from "react-icons/bs";

export default function Plans() {
  return (
    <div className="font-inter text-gray-800">
      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Build Wealth with Crypto</h1>
        <p className="text-lg mb-6">
          Invest with confidence — earn passive income through trading, staking, and mining.
        </p>
        <Link
          to="/signup"
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-10 flex items-center justify-center gap-2">
  <BsSearch className="text-blue-500 text-2xl" />
  How It Works
</h2>
        <div className="grid md:grid-cols-5 gap-6 text-center">
          {[
            {
              title: "Create an Account",
              desc: "Sign up in minutes with secure KYC to protect your identity and assets.",
            },
            {
              title: "Choose Your Plan",
              desc: "Pick an investment package based on your budget and risk appetite.",
            },
            {
              title: "Invest & Earn",
              desc: "Funds go into trading, staking, or mining — profits are generated for you.",
            },
            {
              title: "Monitor Your Growth",
              desc: "Use your dashboard to track returns 24/7 on mobile and web.",
            },
            {
              title: "Withdraw or Reinvest",
              desc: "We automate everything — you just fund, sit back, and earn.",
            },
          ].map((step, index) => (
            <div key={index} className="p-4 border rounded-md shadow hover:shadow-md transition">
              <div className="text-blue-600 font-bold text-xl mb-2">{index + 1}</div>
              <h4 className="font-semibold mb-1">{step.title}</h4>
              <p className="text-sm text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
     {/* Investment Plans from API */}
<section className="bg-gray-100 py-16 px-6">
<div className="max-w-4xl mx-auto mb-10">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
      ASTROVISIONTRADE®️ TRUST INVESTMENT PLANS
    </h2>
    <p className="text-gray-700 text-lg mb-2">
      Earn Daily Returns with Tailored Crypto & Asset-Based Investment Options
    </p>
    <p className="text-sm text-gray-600 italic">
      All contracts are 30-day renewable unless stated otherwise.
    </p>
    <p className="text-sm text-gray-600 italic">
      Upgrade bonuses activate when moving to a higher plan.
    </p>
  </div>
  <PlansList />
</section>

      {/* Call to Action */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to grow your wealth?</h2>
        <p className="text-lg mb-6">Start with as little as $100 and watch your portfolio grow.</p>
        <Link
          to="/signup"
          className="bg-blue-600 text-white font-semibold px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Create an Account
        </Link>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
