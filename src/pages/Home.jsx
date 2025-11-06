import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import DashboardPreview from "../components/DashboardPreview";
import FeatureHighlights from "../components/FeatureHighlights";
import CryptoTable from "../components/CryptoTable";
import Footer from "../components/Footer";
import HeroSlider from "../components/HeroSlider";

function Home() {
  return (
    <div className="font-sans text-gray-900 bg-gray-50">
      <div className="relative min-h-screen overflow-visible" style={{ height: "600px" }}>
        <div className="absolute inset-0 bg-[url('/images/home.png')] bg-cover bg-center bg-no-repeat z-0" />
        <div className="relative z-10">
          <Navbar />
          <Hero />

          {/* Add this About Us section here */}
          <section className=" text-white py-20 px-4 md:px-12">
            <div className="max-w-7xl mx-auto relative">
              {/* Left Branches */}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 space-y-6">
                {[
                  { title: "Automated Trading", value: "+20" },
                  { title: "Staking & Mining", value: "+15" },
                  { title: "Institutional Tools", value: "+10" },
                  { title: "Passive Income", value: "+25" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-[#1C1A3F] px-5 py-3 rounded-full flex items-center gap-3 shadow-lg hover:scale-105 transition"
                  >
                    <span className="text-green-400 text-sm">{item.value}</span>
                    <span className="text-sm font-medium text-white">{item.title}</span>
                  </div>
                ))}
              </div>

              {/* Right Branches */}
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 space-y-6 text-right">
                {[
                  { title: "Next-Gen Blockchain", value: "+18" },
                  { title: "Security First", value: "+12" },
                  { title: "User Simplicity", value: "+8" },
                  { title: "Zero Complexity", value: "+5" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-[#1C1A3F] px-5 py-3 rounded-full flex items-center gap-3 justify-end shadow-lg hover:scale-105 transition"
                  >
                    <span className="text-sm font-medium text-white">{item.title}</span>
                    <span className="text-green-400 text-sm">{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Center Bubble */}
              <div className="relative z-10 bg-gradient-to-r from-[#2B2E90] to-[#3A1F78] text-white text-center rounded-xl shadow-2xl p-10 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">About Us</h2>
                <p className="text-base md:text-lg text-gray-200 leading-relaxed">
                  Welcome to the most advanced cryptocurrency investment platform designed for passive income generation through automated trading, institutional-grade mining, staking, and next-generation blockchain infrastructure.
                  <br />
                  <br />
                  At <span className="text-white font-semibold">AstroVisionTrade</span>, we don’t just follow trends — we build the systems that define them. Our mission is to make cryptocurrency investment
                  <span className="text-green-400 font-medium"> safe</span>,
                  <span className="text-blue-400 font-medium"> simple</span>, and
                  <span className="text-yellow-400 font-medium"> profitable</span> — for everyone.
                </p>
              </div>
            </div>
          </section>
          {/* End About Us section */}
<section className="bg-white py-20 px-4 md:px-16 text-gray-800">
  <div className="max-w-6xl mx-auto text-center">
   
    <h2 className="text-3xl md:text-4xl font-bold mb-8">
       The Smarter, Safer Way to Earn with Blockchain.
    </h2>

    <div className="grid gap-10 md:grid-cols-3 text-left md:text-center">
      {/* Trust across countries */}
      <div className="flex flex-col items-center">
        <div className="text-4xl mb-4">🌍</div>
        <h3 className="text-lg font-semibold mb-2">Trusted by Investors</h3>
        <p className="text-gray-600 mb-2">Across 40+ countries</p>
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          <img src="https://flagcdn.com/us.svg" alt="USA" className="h-5" />
          <img src="https://flagcdn.com/gb.svg" alt="UK" className="h-5" />
          <img src="https://flagcdn.com/de.svg" alt="Germany" className="h-5" />
          <img src="https://flagcdn.com/ca.svg" alt="Nigeria" className="h-5" />
          <img src="https://flagcdn.com/tf.svg" alt="India" className="h-5" />
          <span className="text-sm text-gray-500">+ more</span>
        </div>
      </div>

      {/* Blockchain secure */}
      <div className="flex flex-col items-center">
        <div className="text-4xl mb-4">⛓️</div>
        <h3 className="text-lg font-semibold mb-2">Built on Blockchain</h3>
        <p className="text-gray-600">
          Secure, transparent, and decentralized infrastructure.
        </p>
      </div>

      {/* Passive income */}
      <div className="flex flex-col items-center">
        <div className="text-4xl mb-4">🔁</div>
        <h3 className="text-lg font-semibold mb-2">Passive Income</h3>
        <p className="text-gray-600">
          Consistent returns from <span className="font-bold text-green-600">8%</span> to <span className="font-bold text-green-600">35%</span>.
        </p>
      </div>
    </div>
  </div>
</section>
  <CryptoTable />
          <Features />
          <DashboardPreview />
          <FeatureHighlights />
           <HeroSlider />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Home;
