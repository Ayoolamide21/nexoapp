import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    title: "Earn Up to 38.7% with ASTROVISIONTRADE®️",
    description:
      "Select from powerful plans across ETH, Solana, USDT & more. Smart automation meets real returns.",
    buttonText: "Start Your Journey",
    image: "/images/slider1.png",
  },
  {
    title: "Why Choose Us?",
    description:
      "Join hundreds of clients worldwide building wealth through smart crypto investments. Safe, secure, and reliable.",
    buttonText: "Start Your Journey",
    image: "/images/slider2.png",
  },
  {
    title: "Your Money. Your Future. Our Expertise.",
    description:
      "Let us help you achieve true financial independence — safely and securely.",
    buttonText: "Start Your Journey",
    image: "/images/google_review.png",
  },
];

export default function HeroSlider({ isAuthenticated }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearTimeout(timer);
  }, [current]);

  const slide = slides[current];
  const linkTo = isAuthenticated ? "/dashboard" : "/login";

  return (
    <section className="relative overflow-hidden min-h-[420px] sm:min-h-[480px] md:h-[540px] text-blue-600 bg-blue-50">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-blue-100 to-purple-100 opacity-30 blur-xl z-0"></div>

      {/* Bubbles */}
      <div className="absolute inset-0 z-0 animate-bubbleGradient">
        <div className="absolute -top-20 -left-20 w-[200px] sm:w-[250px] md:w-[300px] h-[200px] sm:h-[250px] md:h-[300px] bg-blue-400 rounded-full blur-xl opacity-30"></div>
        <div className="absolute top-1/3 left-1/2 w-[150px] sm:w-[180px] md:w-[200px] h-[150px] sm:h-[180px] md:h-[200px] bg-indigo-400 rounded-full blur-2xl opacity-25 animate-pulse"></div>
        <div className="absolute -bottom-20 right-10 w-[180px] sm:w-[200px] md:w-[250px] h-[180px] sm:h-[200px] md:h-[250px] bg-cyan-400 rounded-full blur-xl opacity-30"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-14 flex flex-col-reverse md:flex-row items-center justify-between gap-6 sm:gap-10">
        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-[80%] sm:w-[70%] md:w-full max-h-[260px] sm:max-h-[300px] object-contain rounded-lg"
          />
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            {slide.title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-5 text-black/70">
            {slide.description}
          </p>

          <Link
            to={linkTo}
            className="inline-block px-6 py-3 bg-white text-[#3A1F78] font-semibold rounded shadow hover:bg-gray-200 transition"
          >
            {slide.buttonText}
          </Link>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${
              idx === current ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
