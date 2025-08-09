
import React from 'react';
import Navbar from '../components/Navbar';
import FeatureHighlights from '../components/FeatureHighlights';
import AboutHero from '../components/AboutHero';
import Footer from '../components/Footer';
import HeroSlider from '../components/HeroSlider';
import {
  FaBrain,
  FaRobot,
  FaNetworkWired,
  FaLayerGroup,
  FaLock,
  FaChartLine,
  FaCoins,
  FaCogs,
  FaBolt,
  FaSyncAlt,
  FaSearchDollar,
  FaGlobe,
  FaWater,
  FaRecycle,
  FaMobileAlt,
} from "react-icons/fa";
import { SiChainlink } from "react-icons/si";


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
      <main>
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
            <h2 className="text-3xl font-semibold border-b-4 border-indigo-600 inline-block pb-2">
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
            <h2 className="text-3xl font-semibold border-b-4 border-indigo-600 inline-block pb-2">
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
              <h2 className="text-3xl font-semibold border-b-4 border-indigo-600 inline-block pb-2">
                Our Vision
              </h2>
              <p className="leading-relaxed text-lg">
                To create a world where everyone, regardless of income or background, has access to secure passive income through digital assets.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold border-b-4 border-indigo-600 inline-block pb-2">
                Our Mission
              </h2>
              <p className="leading-relaxed text-lg">
                To make wealth accessible through technology, decentralization, and financial literacy—one smart investment at a time.
              </p>
            </div>
          </section>
        

<section className="bg-white text-gray-800 px-6 md:px-16 py-20 max-w-6xl mx-auto">
  {/* Section Header */}
  <header className="mb-16 max-w-3xl mx-auto text-center">
    <h2 className="text-4xl font-bold text-gray-900 border-b-4 border-indigo-600 inline-block pb-3">
      Our Services
    </h2>
    <p className="mt-6 text-lg text-gray-600 leading-relaxed">
      We help you earn passively through innovative crypto services powered by AI, automation, and clean energy.
    </p>
  </header>

  {/* Service A - Crypto Trading */}
  <section className="mb-20 border-b border-gray-200 pb-12">
    <div className="md:flex md:gap-12">
      {/* Left Column: Title + Summary */}
      <div className="md:w-1/3 mb-8 md:mb-0">
        <h3 className="flex items-center gap-3 text-3xl font-semibold text-gray-900">
          <FaChartLine className="text-indigo-600" size={32} />
          Crypto Trading
        </h3>
        <p className="mt-3 text-lg text-gray-700 font-medium">
          Let Our Experts and Bots Trade For You
        </p>
      </div>

      {/* Right Column: Details */}
      <div className="md:w-2/3 bg-indigo-50 rounded-lg p-8 text-gray-700">
        <p>
          We manage your crypto trading using both human intelligence and AI-driven strategies, including:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
          <li>Swing trading, Scalping, Arbitrage, Trend-following systems, Smart portfolio rotation</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Features</h4>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>24/7 Automated Trading Bots</li>
          <li>Manual High-Frequency Trading by Experts</li>
          <li>Profit Targeting & Stop-Loss Systems</li>
          <li>Market & News-Based Algorithms</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">How It Works</h4>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>Bots scan global markets, news, and charts 24/7</li>
          <li>Use pattern recognition, sentiment, and volume signals to place trades</li>
          <li>You earn from market fluctuations — no trading required</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Advanced Features</h4>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>
            <FaBolt className="inline text-yellow-500 mr-2" /> Integrated with Arbitrum and Optimism
          </li>
          <li>
            <FaRobot className="inline text-green-600 mr-2" /> AI trading bots on Uniswap, dYdX, PancakeSwap
          </li>
          <li>
            <FaSyncAlt className="inline text-blue-500 mr-2" /> Multi-chain arbitrage strategies
          </li>
          <li>
            <SiChainlink className="inline text-cyan-500 mr-2" /> Chainlink Oracles for real-time pricing
          </li>
        </ul>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Benefits</h4>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>Consistent daily, weekly, or monthly returns</li>
          <li>Reduced emotional risk</li>
          <li>Transparent trade reporting</li>
          <li>Capital preservation tools</li>
          <li>8%–35% monthly ROI</li>
        </ul>

        <blockquote className="italic text-indigo-700 mt-6 border-l-4 border-indigo-600 pl-4">
          “We don’t guess — we trade based on data, discipline, and automation.”
        </blockquote>
      </div>
    </div>
  </section>

  {/* Service B - Crypto Staking */}
  <section className="mb-20 border-b border-gray-200 pb-12">
    <div className="md:flex md:gap-12">
      <div className="md:w-1/3 mb-8 md:mb-0">
        <h3 className="flex items-center gap-3 text-3xl font-semibold text-gray-900">
          <FaCoins className="text-indigo-600" size={32} />
          Crypto Staking
        </h3>
        <p className="mt-3 text-lg text-gray-700 font-medium">
          Turn Your Coins Into Yield-Producing Assets
        </p>
      </div>

      <div className="md:w-2/3 bg-indigo-50 rounded-lg p-8 text-gray-700">
        <p>We stake your tokens in Proof-of-Stake blockchains and pay you weekly or monthly.</p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Supported Assets</h4>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>ETH, ADA, SOL, DOT, AVAX, ATOM, etc.</li>
          <li>Multiple APY tiers depending on lock duration</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">How It Works</h4>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>Your funds secure the blockchain</li>
          <li>You earn rewards weekly or monthly</li>
          <li>We handle all technical details</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">We Offer</h4>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>
            <FaGlobe className="inline mr-2 text-blue-500" /> Native staking (ETH, ADA, SOL, DOT, etc.)
          </li>
          <li>
            <FaWater className="inline mr-2 text-blue-600" /> Liquid staking (stETH, rETH)
          </li>
          <li>
            <FaRecycle className="inline mr-2 text-green-600" /> EigenLayer restaking
          </li>
        </ul>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">New Users’ Perks</h4>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>1-click staking dashboard</li>
          <li>Real-time reward tracking</li>
          <li>Up to 18% APY</li>
          <li>
            <FaLayerGroup className="inline text-cyan-500 mr-2" /> Stack & Arbitrum rollup integration
          </li>
        </ul>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Plans</h4>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>Flexible: Withdraw anytime, lower APY</li>
          <li>Locked: 30–90 days lock, higher APY</li>
          <li>Max Boost: Staking + loyalty bonus</li>
        </ul>

        <blockquote className="italic text-indigo-700 mt-6 border-l-4 border-indigo-600 pl-4">
          “Earn rewards while holding your crypto — no trading required.”
        </blockquote>
      </div>
    </div>
  </section>

  {/* Service C - Crypto Mining */}
  <section>
    <div className="md:flex md:gap-12">
      <div className="md:w-1/3 mb-8 md:mb-0">
        <h3 className="flex items-center gap-3 text-3xl font-semibold text-gray-900">
          <FaCogs className="text-indigo-600" size={32} />
          Crypto Mining
        </h3>
        <p className="mt-3 text-lg text-gray-700 font-medium">
          Mine Crypto Without Any Technical Hassle
        </p>
      </div>

      <div className="md:w-2/3 bg-indigo-50 rounded-lg p-8 text-gray-700">
        <p>We run clean-energy-powered mining farms. You invest, we mine, you earn.</p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Options</h4>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>Cloud Mining (own a share)</li>
          <li>Dedicated Mining (rent a rig)</li>
          <li>
            <FaMobileAlt className="inline mr-2 text-green-600" /> Mobile Mining App
          </li>
          <li>
            <FaSyncAlt className="inline mr-2 text-indigo-600" /> Hybrid plans (mining + staking)
          </li>
        </ul>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">What We Do</h4>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>Run clean-energy ASIC mining rigs</li>
          <li>Daily or weekly payouts</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">What We Mine</h4>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>Bitcoin (BTC)</li>
          <li>Ethereum Classic (ETC)</li>
          <li>Litecoin (LTC)</li>
          <li>Kadena (KDA)</li>
          <li>Dogecoin (merged with LTC)</li>
        </ul>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Technical Edge</h4>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>Zero-emission grid nodes in Canada, UK, Iceland</li>
          <li>Real-time hashrate dashboards</li>
          <li>Merged mining capabilities</li>
        </ul>

        <blockquote className="italic text-indigo-700 mt-6 border-l-4 border-indigo-600 pl-4">
          “We turn mining from a technical mess into a passive income machine.”
        </blockquote>
      </div>
    </div>
  </section>
</section>

        </div>
      </main>
    <HeroSlider />
<FeatureHighlights />
      <Footer />
    </>
  );
}
