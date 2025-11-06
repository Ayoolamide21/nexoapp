import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSettings } from '../context/useSettings';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaHandsHelping, FaHandshake, FaRegClock } from "react-icons/fa";
import { GiHealthDecrease, GiPayMoney} from "react-icons/gi";
import { SiGooglechrome, SiHackaday, SiCoinmarketcap, SiBookstack, SiMentorcruise, SiOpenaccess } from "react-icons/si";

export function Careers() {
  const location = useLocation();
  const { settings } = useSettings();
  const siteName = settings?.sitename || "Our Platform";

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

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Be part of a global movement shaping the future of finance.  
          At <strong> {`${siteName}`}</strong>, we’re redefining how businesses and individuals invest, trade, and grow with digital assets.
        </p>
        <div className="mt-8">
          <Link
            to="#open-positions"
            className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition"
          >
            View Open Positions
          </Link>
        </div>
      </section>

      {/* About Our Culture */}
      <section className="max-w-5xl mx-auto p-6 text-gray-800">
        <h2 className="text-3xl font-semibold mb-4 text-center">Life at {`${siteName}`}</h2>
        <p className="text-lg text-center mb-8">
          We believe in empowering people through innovation, transparency, and collaboration.  
          Every voice matters, and every team member contributes to shaping the crypto economy of tomorrow.
        </p>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition">
            <SiGooglechrome className="mx-auto text-4xl mb-3 text-blue-600" />
            <h3 className="text-xl font-semibold mb-3"> Global Impact</h3>
            <p>Work with a diverse team across continents on projects that make digital finance more accessible worldwide.</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition">
          <SiHackaday className="mx-auto text-4xl mb-3 text-green-600" />
            <h3 className="text-xl font-semibold mb-3">Innovation First</h3>
            <p>Collaborate with experts in blockchain, DeFi, and AI to build the next generation of financial tools.</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition">
          <FaHandsHelping className="mx-auto text-4xl mb-3 text-purple-600" />
            <h3 className="text-xl font-semibold mb-3">People-Focused</h3>
            <p>We value learning, flexibility, and personal growth — because empowered people drive powerful results.</p>
          </div>
        </div>
      </section>

      {/* Perks & Benefits */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold mb-6 text-center">Perks & Benefits</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-700">
                <SiCoinmarketcap className="text-blue-600 text-2xl" />
                <span>Competitive salaries and crypto-based incentives</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <FaRegClock className="text-green-600 text-2xl" />
                <span>Remote-first culture with flexible work hours</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <SiBookstack className="text-yellow-600 text-2xl" />
                <span>Ongoing professional development and certification programs</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <GiHealthDecrease className="text-red-600 text-2xl" />
                <span>Health, wellness, and insurance benefits</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-700">
                <SiMentorcruise className="text-purple-600 text-2xl" />
                <span>Mentorship from industry leaders in crypto and fintech</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <SiOpenaccess className="text-blue-600 text-2xl" />
                <span>Access to cutting-edge blockchain tools and data systems</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
              
                <GiPayMoney className="text-green-600 text-2xl" />
                <span>Paid time off and wellness days</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <FaHandshake className="text-purple-600 text-2xl" />
                <span>Inclusive company events and global meetups</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="max-w-5xl mx-auto p-6 text-gray-800">
        <h2 className="text-3xl font-semibold mb-4 text-center">Open Positions</h2>
        <p className="text-center mb-8 text-lg">
          We're always looking for passionate individuals ready to make an impact in the crypto industry.  
          Explore our current openings below.
        </p>

        <div className="space-y-6">
          {/* Example Roles */}
          <div className="border border-gray-200 p-6 rounded-lg hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Blockchain Developer</h3>
            <p className="text-gray-600 mb-3">
              Build and optimize smart contracts, DApps, and blockchain integrations that power our investment ecosystem.
            </p>
            <Link
              to="/help-center"
              className="text-blue-600 font-semibold hover:underline"
            >
              Apply Now →
            </Link>
          </div>

          <div className="border border-gray-200 p-6 rounded-lg hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Financial Analyst – Crypto Assets</h3>
            <p className="text-gray-600 mb-3">
              Analyze digital asset trends, assess risk, and support portfolio strategies for business and institutional clients.
            </p>
            <Link
              to="/help-center"
              className="text-blue-600 font-semibold hover:underline"
            >
              Apply Now →
            </Link>
          </div>

          <div className="border border-gray-200 p-6 rounded-lg hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Business Development Manager</h3>
            <p className="text-gray-600 mb-3">
              Build partnerships, onboard institutional clients, and help drive adoption of our crypto investment solutions.
            </p>
            <Link
              to="/help-center"
              className="text-blue-600 font-semibold hover:underline"
            >
              Apply Now →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-700 text-white text-center py-16 px-6 mt-10">
        <h3 className="text-3xl font-semibold mb-4">Build the Future of Digital Finance</h3>
        <p className="max-w-2xl mx-auto mb-6">
          Even if you don’t see a role that fits you right now, we’d still love to hear from you.  
          We're always open to passionate innovators who believe in blockchain's potential.
        </p>
        <Link
          to="/help-center"
          className="bg-white text-blue-700 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
        >
          Contact Our HR Team
        </Link>
      </section>

      <Footer />
    </>
  );
}
