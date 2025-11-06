import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export function DedicatedSupport() {
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
        <h1 className="text-4xl font-bold mb-4 text-center">Dedicated Support</h1>
        <p className="text-lg text-center mb-8">
          Get priority assistance from our expert business support team — ensuring your crypto operations run smoothly and securely.
        </p>

        {/* Overview */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Overview</h2>
          <p className="mb-4">
            Our <strong>Dedicated Support</strong> service ensures your business receives personalized, real-time assistance 
            whenever you need it. From technical troubleshooting to investment guidance, our team of crypto, finance, and compliance 
            professionals is here to help you stay operational, compliant, and efficient.
          </p>
          <p>
            We understand that managing digital assets and financial operations in the blockchain space can be complex. 
            That’s why we provide our business clients with priority access to a support network built around reliability, 
            responsiveness, and expertise — so your team can focus on growth, not technical issues.
          </p>
        </div>

        {/* Features */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Key Features</h2>
          <ul className="list-disc pl-6 space-y-4">
            <li>
              <strong>Priority Response:</strong>  
              Access a dedicated support line for fast, prioritized responses from our technical and business specialists.
            </li>
            <li>
              <strong>24/7 Availability:</strong>  
              Get round-the-clock assistance for urgent issues, ensuring uninterrupted access to your accounts and services.
            </li>
            <li>
              <strong>Personal Account Manager:</strong>  
              Receive one-on-one guidance from a dedicated business manager who understands your company’s goals and operations.
            </li>
            <li>
              <strong>Technical & Financial Expertise:</strong>  
              Our support covers everything from crypto transactions and wallet management to API integrations and compliance queries.
            </li>
            <li>
              <strong>Proactive Monitoring:</strong>  
              We actively monitor your business accounts and system performance to prevent issues before they impact your operations.
            </li>
          </ul>
        </div>

        {/* Benefits */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Why Choose Our Dedicated Support</h2>
          <p className="mb-4">
            Businesses operating in crypto demand precision, security, and reliability. Our dedicated support program ensures 
            you always have expert help at hand — keeping your systems optimized and your transactions secure.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Minimize downtime with direct access to specialists.</li>
            <li>Receive tailored solutions for your business’s unique requirements.</li>
            <li>Ensure compliance with crypto regulations and security best practices.</li>
            <li>Enjoy faster resolutions and seamless communication with our team.</li>
            <li>Gain peace of mind knowing your business has priority coverage 24/7.</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-semibold mb-4">Experience Unmatched Business Support</h3>
          <p className="mb-6">
            Partner with a team that understands the complexities of digital finance.  
            Get the priority service your business deserves — secure, efficient, and always available.
          </p>
          <Link
            to="/help-center"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Connect with Our Support Team
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
