import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export function PaymentProcessing() {
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
        <h1 className="text-4xl font-bold mb-4 text-center">Payment Processing</h1>
        <p className="text-lg text-center mb-8">
          Seamlessly accept digital payments globally and unlock new revenue streams through secure crypto payment infrastructure.
        </p>

        {/* Introduction */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Next-Generation Payment Solutions</h2>
          <p className="mb-4">
            Our crypto payment processing platform empowers businesses to accept, manage, and settle 
            cryptocurrency transactions with ease. Designed for speed, security, and scalability, 
            we bridge the gap between traditional finance and the decentralized economy — helping your 
            business operate efficiently in a digital-first world.
          </p>
          <p>
            Whether you’re managing a retail store, e-commerce platform, or enterprise-level service, 
            our tools simplify crypto adoption with automated conversion, compliance features, and 
            real-time analytics.
          </p>
        </div>

        {/* Key Features */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Key Features</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Global Acceptance:</strong> Process payments in Bitcoin, Ethereum, USDT, and other leading digital assets from anywhere in the world.</li>
            <li><strong>Instant Settlements:</strong> Convert crypto to fiat instantly to reduce volatility risk and improve cash flow.</li>
            <li><strong>Integrated Compliance:</strong> Built-in KYC/AML solutions ensure safe and transparent transactions for every client.</li>
            <li><strong>Multi-Platform Support:</strong> Works seamlessly across web, mobile, and in-store systems with easy API integration.</li>
            <li><strong>Real-Time Reporting:</strong> Gain full visibility into your transactions, customer trends, and revenue insights through our secure dashboard.</li>
            <li><strong>Low Fees & High Speed:</strong> Enjoy faster payments and reduced transaction costs compared to traditional processors.</li>
          </ul>
        </div>

        {/* Benefits */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Benefits for Your Business</h2>
          <p className="mb-4">
            Our payment processing solutions empower your business to thrive in the rapidly growing digital asset economy.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Attract global clients with flexible, borderless payment options.</li>
            <li>Reduce operational costs with blockchain-based settlement systems.</li>
            <li>Enhance financial transparency and audit readiness through blockchain records.</li>
            <li>Minimize fraud and chargebacks with immutable transaction verification.</li>
            <li>Future-proof your business with modern, crypto-native infrastructure.</li>
          </ul>
        </div>

        {/* How It Works */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">How It Works</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li><strong>Set Up Your Account:</strong> Register your business, verify identity, and configure preferred settlement options.</li>
            <li><strong>Integrate Easily:</strong> Use our plug-ins, SDKs, or APIs to add crypto payment capabilities to your website or app.</li>
            <li><strong>Accept Payments:</strong> Customers pay using their chosen digital currency at checkout.</li>
            <li><strong>Settle Securely:</strong> Receive payments in crypto or auto-convert to fiat directly into your business wallet or bank account.</li>
          </ol>
        </div>

        {/* Security Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Security You Can Trust</h2>
          <p>
            Security is at the heart of our operations. Our systems use bank-grade encryption, 
            two-factor authentication, and advanced risk monitoring tools to ensure every transaction 
            is safe, compliant, and fully traceable. We adhere to industry standards, including 
            GDPR, PCI DSS, and FATF guidelines, to protect both your business and your customers.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-semibold mb-4">Start Accepting Crypto Payments Today</h3>
          <p className="mb-6">
            Future-proof your business with the most reliable and scalable crypto payment processing solution.
            Let’s build the future of finance together.
          </p>
          <Link
            to="/help-center"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Talk to Our Payment Experts
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
