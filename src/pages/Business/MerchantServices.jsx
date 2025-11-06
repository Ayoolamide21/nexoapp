import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export function MerchantServices() {
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
        <h1 className="text-4xl font-bold mb-4 text-center">Merchant Services</h1>
        <p className="text-lg text-center mb-8">
          Empower your business with secure, seamless, and scalable crypto payment solutions.
        </p>

        {/* Introduction */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Accept Crypto Payments Globally</h2>
          <p className="mb-4">
            Our merchant services enable businesses to accept cryptocurrency payments from customers worldwide. 
            Whether you operate an online store, an investment platform, or a subscription-based service, 
            our API and plug-and-play integrations make it easy to process Bitcoin, Ethereum, USDT, and other 
            leading digital assets in real time.
          </p>
          <p>
            With automatic fiat conversion, fraud protection, and low transaction fees, your business can tap 
            into the global crypto economy without the volatility or technical complexity.
          </p>
        </div>

        {/* Key Features */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Key Features</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Multi-Currency Support:</strong> Accept payments in major cryptocurrencies and stablecoins.</li>
            <li><strong>Instant Settlement:</strong> Convert crypto payments to fiat instantly to avoid market volatility.</li>
            <li><strong>Custom API Integration:</strong> Connect our secure payment gateway to your website or app with minimal effort.</li>
            <li><strong>Low Transaction Fees:</strong> Enjoy competitive rates and transparent pricing.</li>
            <li><strong>Advanced Security:</strong> PCI DSS compliant with two-factor authentication and encrypted payment flows.</li>
            <li><strong>Analytics Dashboard:</strong> Track all crypto transactions and conversions in real-time with advanced reporting tools.</li>
          </ul>
        </div>

        {/* Benefits */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Benefits for Your Business</h2>
          <p className="mb-4">
            By integrating crypto merchant services, your company gains a modern edge while meeting 
            the demands of a new generation of investors and digital asset users.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Expand your global customer base with borderless payments.</li>
            <li>Reduce chargebacks and fraudulent transactions.</li>
            <li>Offer faster, cheaper, and more transparent transactions.</li>
            <li>Leverage blockchain transparency for compliance and audit readiness.</li>
            <li>Enhance your brand’s credibility in the crypto investment ecosystem.</li>
          </ul>
        </div>

        {/* How It Works */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">How It Works</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li><strong>Sign Up:</strong> Register your business and verify your account.</li>
            <li><strong>Integrate:</strong> Use our API, payment gateway, or plugins to start accepting crypto.</li>
            <li><strong>Receive Payments:</strong> Customers pay using their preferred cryptocurrency.</li>
            <li><strong>Settle Funds:</strong> Choose to receive payments in crypto or auto-convert to fiat.</li>
          </ol>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-semibold mb-4">Ready to Get Started?</h3>
          <p className="mb-6">
            Join hundreds of businesses already using our merchant solutions to power the future of digital payments.
          </p>
          <Link
            to="/help-center"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Contact Our Sales Team
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
