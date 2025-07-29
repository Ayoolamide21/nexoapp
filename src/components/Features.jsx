import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid"; // Optional for check icons

export default function Features() {
  const features = [
    {
      title: "Regulated & Transparent",
      desc: "Our operations comply with global standards and are monitored by certified experts.",
    },
    {
      title: "Experienced Team",
      desc: "Decades of combined experience in crypto, forex, and traditional finance.",
    },
    {
      title: "Real-Time Support",
      desc: "Dedicated account managers and 24/7 customer service.",
    },
    {
      title: "Secure Infrastructure",
      desc: "Bank-grade security, multi-sig wallets, cold storage protection.",
    },
    {
      title: "Passive Income Focus",
      desc: "We specialize in automated earning models to generate reliable passive returns.",
    },
  ];

  return (
    <section className="py-16 bg-white text-center">
      <h3 className="text-2xl md:text-3xl font-bold mb-10">
      <h2 className="text-3xl md:text-4xl font-bold mb-8">
      Why Choose <span className="text-blue-600">AstroVisionTrade</span>?
    </h2>
      </h3>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 max-w-6xl mx-auto">
        {features.map((f, idx) => (
          <div
            key={idx}
            className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="flex items-start gap-3 mb-3">
              <CheckCircleIcon className="w-6 h-6 text-green-500" />
              <h4 className="text-lg font-semibold">{f.title}</h4>
            </div>
            <p className="text-gray-600 text-sm text-left">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
