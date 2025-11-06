import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export function BusinessLoans() {
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
        {/* Title */}
        <h1 className="text-4xl font-bold mb-4 text-center">Business Loans</h1>
        <p className="text-lg text-center mb-8">
          Access low-interest loans tailored for your company’s growth and powered by innovative crypto-backed financing.
        </p>

        {/* Overview */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Overview</h2>
          <p className="mb-4">
            Our <strong>Business Loans</strong> program provides companies with flexible, crypto-backed financing designed 
            to support expansion, liquidity management, and long-term stability. Whether you’re scaling operations, 
            investing in new technology, or funding day-to-day expenses, our blockchain-based lending solutions offer 
            a faster, more transparent way to access working capital.
          </p>
          <p>
            Unlike traditional lenders, we leverage the value of your digital assets to help you secure funds with minimal 
            bureaucracy, lower interest rates, and greater flexibility. Your business growth shouldn’t be limited by outdated 
            financial systems — and with us, it doesn’t have to be.
          </p>
        </div>

        {/* Features */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Key Features</h2>
          <ul className="list-disc pl-6 space-y-4">
            <li>
              <strong>Crypto-Backed Loans:</strong>  
              Use your digital assets as collateral to access instant liquidity without having to sell your holdings.
            </li>
            <li>
              <strong>Low-Interest Rates:</strong>  
              Benefit from competitive loan terms and transparent pricing designed to help your business grow sustainably.
            </li>
            <li>
              <strong>Flexible Repayment Options:</strong>  
              Choose repayment schedules that align with your cash flow — whether short-term bridge loans or long-term financing.
            </li>
            <li>
              <strong>Fast Approval Process:</strong>  
              Our digital onboarding and automated risk assessment ensure you get approval and funding quickly.
            </li>
            <li>
              <strong>Transparent & Secure:</strong>  
              Every transaction is recorded on-chain for complete transparency, backed by institutional-grade custody solutions.
            </li>
          </ul>
        </div>

        {/* Benefits */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Benefits for Your Business</h2>
          <p className="mb-4">
            Our lending solutions go beyond traditional finance, providing access to capital that’s fast, secure, 
            and powered by blockchain innovation.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Maintain crypto ownership while unlocking working capital.</li>
            <li>Leverage digital assets for real-world growth opportunities.</li>
            <li>Improve liquidity and cash flow management without dilution.</li>
            <li>Get tailored financing aligned with your company’s financial strategy.</li>
            <li>Access a global funding network with 24/7 availability.</li>
          </ul>
        </div>

        {/* How It Works */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">How It Works</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li><strong>Apply:</strong> Submit your business details and loan requirements through our secure platform.</li>
            <li><strong>Collateralize:</strong> Pledge supported crypto assets to secure your loan.</li>
            <li><strong>Get Funded:</strong> Receive funds quickly in crypto or fiat, based on your preferences.</li>
            <li><strong>Repay Flexibly:</strong> Manage repayments through our dashboard and monitor real-time loan performance.</li>
          </ol>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-semibold mb-4">Empower Your Growth with Smart Financing</h3>
          <p className="mb-6">
            Get access to low-interest, crypto-backed business loans designed to scale your operations and secure your future.  
            Experience lending built for the blockchain era.
          </p>
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Apply for a Business Loan
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
