import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function CorporateSavings() {
  const location = useLocation();
    useEffect(() => {
        const hash = location.hash;
        if (hash) {
          setTimeout(() => {
            const element = document.querySelector(hash);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }, 100);
        }
      }, [location]);
  return (
    <>
     <Navbar/> 
     <section className="bg-gray-50 min-h-screen py-16 px-6 sm:px-12 lg:px-24">
      
      {/* Page Heading */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Corporate Savings
        </h1>
        <p className="text-lg sm:text-xl text-gray-700">
          Maximize returns on your business funds with flexible options and transparent terms.
          Protect your capital while earning competitive yields and maintaining liquidity when needed.
        </p>
      </div>

      {/* Features Section */}
      <div className="max-w-5xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-12">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Flexible Lock-in Periods</h3>
          <p className="text-gray-600">
            Choose durations that suit your business cash flow without compromising returns. Short-term or long-term options available.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Transparent Interest Rates</h3>
          <p className="text-gray-600">
            Know exactly what your business earns — no hidden fees or surprises. Rates are clearly displayed and updated regularly.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Bank-Level Security & Custody</h3>
          <p className="text-gray-600">
            Keep your funds safe with enterprise-grade security and regulatory compliance. Enjoy peace of mind knowing your assets are protected.
          </p>
        </div>
      </div>

      {/* How it Works */}
      <div className="max-w-4xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">How It Works</h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-4 text-lg">
          <li>Sign up your business and complete a secure verification process.</li>
          <li>Deposit funds into your corporate savings account using our simple dashboard.</li>
          <li>Choose your preferred lock-in period and start earning interest immediately.</li>
          <li>Withdraw funds anytime according to your selected plan or reinvest for compounded growth.</li>
        </ol>
      </div>

      {/* Testimonials / Trust Section */}
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Trusted by Businesses Worldwide</h2>
        <p className="text-gray-700 mb-6">
          Hundreds of companies rely on our corporate savings solutions to manage cash efficiently and grow their capital securely.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <div className="bg-white p-4 rounded-lg shadow text-gray-800 flex-1">
            <p>"Our cash flow has never been better! Corporate Savings helped us optimize returns without locking our funds unnecessarily."</p>
            <span className="block mt-2 font-semibold">— Alex P., CFO</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-gray-800 flex-1">
            <p>"We trust the platform for all our short-term and long-term corporate deposits. Security and transparency are unmatched."</p>
            <span className="block mt-2 font-semibold">— Maria L., Finance Director</span>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <Link
          to="/signup"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition"
        >
          Start Earning with Corporate Savings
        </Link>
      </div>
    </section>
    <Footer/>
    </>
  );
}
