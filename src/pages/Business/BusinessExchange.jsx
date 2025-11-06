import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export function BusinessExchange() {
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
      <Navbar />
      <section className="max-w-5xl mx-auto p-6 text-gray-800">
        {/* Main Title */}
        <h1 className="text-4xl font-bold mb-4 text-center">Manage Business Assets</h1>
        <p className="text-lg text-center mb-8">
          Efficiently trade, track, and manage your digital business assets with competitive exchange rates and low transaction fees.
        </p>

        {/* Submenu Title */}
        <h2 className="text-2xl font-semibold text-center mb-10">Business Exchange</h2>

        {/* Overview */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-3">Overview</h3>
          <p className="mb-4">
            Our <strong>Business Exchange</strong> platform empowers merchants and crypto-driven enterprises 
            to streamline their asset management workflows. From trading cryptocurrencies at competitive market rates 
            to automating reconciliation and financial reporting, our suite of tools ensures your daily operations 
            remain fast, transparent, and compliant.
          </p>
          <p>
            Whether you're managing liquidity, accepting crypto payments, or reconciling daily sales, 
            our exchange and asset management tools provide the flexibility and control your business needs to thrive in the digital economy.
          </p>
        </div>

        {/* Features Section */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-3">Key Features</h3>
          <ul className="list-disc pl-6 space-y-4">
            <li>
              <strong>Custom Payment Gateways:</strong>  
              Build personalized gateways that align with your brand, allowing customers to pay in multiple cryptocurrencies 
              while settling in the currency of your choice. Integrate effortlessly with existing POS systems or online platforms.
            </li>
            <li>
              <strong>Automated Reconciliation:</strong>  
              Simplify your accounting and back-office operations with automatic tracking, matching, and recording of crypto transactions.  
              Real-time synchronization ensures accuracy across ledgers and banking systems.
            </li>
            <li>
              <strong>Transaction Analytics:</strong>  
              Get full visibility into trading activity and cash flow with advanced analytics dashboards.  
              Monitor performance, analyze transaction patterns, and optimize financial decisions with data-driven insights.
            </li>
          </ul>
        </div>

        {/* Value Proposition / Summary */}
        <div className="mb-10">
          <p>
            With integrated exchange services, your business gains the agility to move assets seamlessly across wallets and currencies, 
            improving liquidity and reducing costs. Our system helps merchants maintain operational efficiency while adapting 
            to the fast-paced world of digital finance.
          </p>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-semibold mb-4">Simplify Your Merchant Operations</h3>
          <p className="mb-6">
            Manage assets, automate workflows, and stay in control — all from one secure, unified dashboard.  
            Experience the next evolution in crypto business management today.
          </p>
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
