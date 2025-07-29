// src/pages/About.jsx

import React from 'react';
import Navbar from '../components/Navbar';
import AboutHero from '../components/AboutHero';
import Footer from '../components/Footer';
import {
  FaBrain,
  FaRobot,
  FaNetworkWired,
  FaLayerGroup,
  FaLock
} from "react-icons/fa";

export default function About() {
  const features = [
    { icon: <FaRobot />, label: 'Automated & AI‑driven trading' },
    { icon: <FaLock />, label: 'DeFi & Proof‑of‑Stake staking' },
    { icon: <FaLayerGroup />, label: 'Institutional mining & sidechains' },
    { icon: <FaNetworkWired />, label: 'Layer 1 & Layer 2 infrastructure' },
    { icon: <FaNetworkWired />, label: 'Transparency via Chainlink & EigenLayer' },
    { icon: <FaNetworkWired />, label: 'Tokenization & smart contracts' },
  ];

  return (
    <>
      {/* Navbar fixed at top */}
        
 

      {/* Hero section with padding to offset navbar height */}
      <main className="pt-20">
        <Navbar />
        <AboutHero
          headline="About AstroVisionTrade"
          description="We are a next‑generation crypto investment firm focused on democratizing digital wealth creation. From institutional staking to automated trading, we're building a decentralized financial future for all."
          ctaText="Sign up"
          onCtaClick={() => console.log('signup clicked')}
        />

        {/* Main page content */}
        <div className="px-6 md:px-12 py-16 max-w-5xl mx-auto space-y-16">
          {/* Who We Are */}
          <section className="space-y-4">
            <h2 className="text-3xl font-semibold border-b border-indigo-600 inline-block pb-2">
              Who We Are
            </h2>
            <p className="leading-relaxed text-lg">
              AstroVisionTrade is a next‑generation crypto investment firm with a mission to simplify digital wealth creation. We're purpose-built to democratize access to next-gen digital assets, providing cutting-edge trading, staking, and institutional infrastructure.
            </p>
            <p className="leading-relaxed text-lg">
              Founded by blockchain experts, traders, and financial strategists, our platform aims to make crypto profitable and accessible to everyone.
            </p>
          </section>

          {/* Core Focus Areas */}
          <section className="space-y-4">
            <h2 className="text-3xl font-semibold border-b border-indigo-600 inline-block pb-2">
              Core Focus Areas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              {features.map((f, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="text-indigo-400 w-8 h-8 mt-1">{f.icon}</div>
                  <span className="text-lg">{f.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Vision & Mission */}
          <section className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold">Our Vision</h2>
              <p className="leading-relaxed text-lg">
                To create a world where everyone, regardless of income or background, has access to secure passive income through digital assets.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold">Our Mission</h2>
              <p className="leading-relaxed text-lg">
                To make wealth accessible through technology, decentralization, and financial literacy—one smart investment at a time.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
