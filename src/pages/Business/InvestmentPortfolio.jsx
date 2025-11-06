import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export function InvestmentPortfolios() {
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
        {/* Page Title */}
        <h1 className="text-4xl font-bold mb-4 text-center">Investment Portfolios</h1>
        <p className="text-lg text-center mb-8">
          Diversify and grow your business investments smartly with secure, data-driven crypto strategies.
        </p>

        {/* Overview */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Overview</h2>
          <p className="mb-4">
            Our <strong>Investment Portfolios</strong> platform helps businesses strategically allocate 
            capital across digital assets to maximize returns and minimize risk. Designed for corporate 
            investors and enterprise clients, our solutions combine the power of blockchain technology 
            with institutional-grade investment management.
          </p>
          <p>
            Whether you’re seeking stable income through staking, exposure to emerging blockchain projects, 
            or long-term diversification, our portfolio tools and expert insights provide a structured path 
            toward achieving your financial goals in the digital asset space.
          </p>
        </div>

        {/* Features */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Key Features</h2>
          <ul className="list-disc pl-6 space-y-4">
            <li>
              <strong>Diversified Crypto Portfolios:</strong>  
              Build balanced portfolios across multiple asset classes — including Bitcoin, Ethereum, stablecoins, 
              DeFi tokens, and more — tailored to your business objectives and risk tolerance.
            </li>
            <li>
              <strong>Automated Portfolio Management:</strong>  
              Our smart algorithms continuously monitor market conditions, automatically rebalancing your assets 
              to optimize performance and reduce exposure to volatility.
            </li>
            <li>
              <strong>Institutional-Grade Security:</strong>  
              Assets are protected with multi-signature wallets, cold storage, and audited smart contracts to ensure 
              safety and compliance for every transaction.
            </li>
            <li>
              <strong>Comprehensive Analytics:</strong>  
              Gain real-time insights into portfolio performance, ROI, risk metrics, and asset allocation 
              through interactive dashboards and advanced reporting tools.
            </li>
            <li>
              <strong>Expert Advisory Support:</strong>  
              Access insights from our investment strategists and blockchain analysts to make data-driven decisions 
              aligned with your long-term business strategy.
            </li>
          </ul>
        </div>

        {/* Value Proposition */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Why Choose Our Portfolio Solutions</h2>
          <p className="mb-4">
            Managing crypto investments can be complex — our platform simplifies it. We combine automation, 
            analytics, and security to give your business full control over digital asset management without 
            the operational burden.  
          </p>
          <p>
            With our crypto portfolio tools, your company gains transparency, flexibility, and the confidence 
            to grow sustainably in a rapidly evolving financial landscape.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-semibold mb-4">Grow Your Business Investments Smarter</h3>
          <p className="mb-6">
            Explore diversified crypto investment opportunities and manage your portfolios with confidence.  
            Build a stronger financial future for your business today.
          </p>
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Start Building Your Portfolio
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
