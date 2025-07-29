import React from "react";
import ParticleBackground from "./ParticleBackground";
import { FaArrowRight, FaBuilding, FaHeadset, FaWallet } from "react-icons/fa";

export default function AboutHero({ headline, description, ctaText, onCtaClick }) {
  return (
    <section className="relative h-screen text-white overflow-hidden">
      <ParticleBackground />
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      <div className="relative z-20 flex h-full px-6 items-center justify-between max-w-6xl mx-auto md:flex-row flex-col gap-12">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">{headline}</h1>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed">{description}</p>
        </div>
        <div className="md:w-1/3">
          <button onClick={onCtaClick}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-7 py-3 rounded-lg font-semibold transition">
            {ctaText} <FaArrowRight />
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 w-full flex justify-center gap-12 text-gray-300 text-sm z-20">
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
