import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
        <Link to="/signup" className="bg-white text-blue-600 font-semibold px-6 py-3 rounded hover:bg-gray-100 transition">
          Get Started
        </Link>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-10">🔍 How It Works</h2>
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

      {/* Investment Plans */}
      <section className="bg-gray-100 py-16 px-6">
        <h2 className="text-3xl font-semibold text-center mb-10">💼 Choose Your Investment Plan</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Starter",
              min: "$100",
              apy: "8% APY",
              duration: "Flexible",
              perks: ["No lockup", "Daily payouts", "Instant withdrawal"],
            },
            {
              name: "Growth",
              min: "$5,000",
              apy: "12% APY",
              duration: "6 months",
              perks: ["Priority support", "Auto compounding", "Reinvestment bonus"],
            },
            {
              name: "Prime",
              min: "$100,000",
              apy: "Up to 18% APY",
              duration: "12 months",
              perks: ["Private advisor", "Exclusive pools", "Early access to JVT"],
            },
          ].map((plan, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-1">Minimum: <strong>{plan.min}</strong></p>
              <p className="text-gray-600 mb-1">Earnings: <strong>{plan.apy}</strong></p>
              <p className="text-gray-600 mb-4">Duration: <strong>{plan.duration}</strong></p>
              <ul className="mb-4 space-y-1 text-sm text-gray-700">
                {plan.perks.map((perk, i) => (
                  <li key={i}>✔ {perk}</li>
                ))}
              </ul>
              <Link to="/signup" className="block w-full text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Invest Now
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to grow your wealth?</h2>
        <p className="text-lg mb-6">Start with as little as $100 and watch your portfolio grow.</p>
        <Link to="/signup" className="bg-blue-600 text-white font-semibold px-6 py-3 rounded hover:bg-blue-700 transition">
          Create an Account
        </Link>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
