import React from "react";
import ParticleBackground from "./ParticleBackground";
import { FaArrowRight, FaBuilding, FaHeadset, FaWallet } from "react-icons/fa";

export default function AboutHero({ headline, description, ctaText, onCtaClick }) {
  return (
    <section className="relative min-h-[600px] md:h-screen text-white overflow-hidden">
      <ParticleBackground />
    <div
  className="absolute inset-0 z-10"
  style={{
    background: "linear-gradient(135deg, #2d085a 0%, #0b133a 100%)",
    opacity: 0.6,
  }}
></div>




      <div className="relative z-20 flex flex-col md:flex-row h-full px-6 sm:px-8 md:px-12 items-center justify-center md:justify-between max-w-6xl mx-auto gap-10 md:gap-16">
        {/* Text Section */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug mb-4">
            {headline}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed">
            {description}
          </p>
        </div>

        {/* CTA Section */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-start">
          <button
            onClick={onCtaClick}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition text-sm sm:text-base"
          >
            {ctaText} <FaArrowRight />
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="absolute bottom-6 md:bottom-8 w-full flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-12 text-gray-300 text-sm md:text-base z-20">
        {[
          { icon: FaBuilding, label: "Operating\nsince 2021" },
          { icon: FaHeadset, label: "24/7\nClient Care" },
          { icon: FaWallet, label: "$500M+\nAssets Managed" },
        ].map((i, idx) => (
          <div key={idx} className="flex flex-col items-center text-center">
            <i.icon className="text-indigo-400 w-6 h-6 mb-1" />
            <p className="font-medium text-white whitespace-pre-line">{i.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
