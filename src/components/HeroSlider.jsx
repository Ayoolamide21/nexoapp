import React, { useEffect, useState } from "react";

const slides = [
  {
    title: "Earn up to 15% on Toncoin and Notcoin!",
    description:
      "Instantly buy TON and NOT, enjoy weekly payouts, and trade easily to grow your assets.",
    buttonText: "Start Earning Today",
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
    buttonText: "Build Your Portfolio",
    image: "/images/slide3.png",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearTimeout(timer);
  }, [current]);

  const slide = slides[current];

  return (
    <section className="relative overflow-hidden h-[500px] md:h-[540px] text-blue-600 bg-blue-50">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-blue-100 to-purple-100 opacity-30 blur-xl z-0"></div>

      {/* Animated bubble gradient */}
      <div className="absolute inset-0 z-0 animate-bubbleGradient">
       {/* Top Left Bubble */}
<div className="absolute -top-20 -left-20 w-[300px] h-[300px] bg-blue-400 rounded-full blur-xl opacity-30"></div>

{/* Center Pulse Bubble */}
<div className="absolute top-1/3 left-1/2 w-[200px] h-[200px] bg-indigo-400 rounded-full blur-2xl opacity-25 animate-pulse"></div>

{/* Bottom Right Bubble */}
<div className="absolute -bottom-20 right-10 w-[250px] h-[250px] bg-cyan-400 rounded-full blur-xl opacity-30"></div>
 </div>

      {/* Dark overlay for contrast */}
     <div className="relative z-20 max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-10">
  {/* Image */}
  <div className="w-full md:w-1/2">
    <img
      src={slide.image}
      alt={slide.title}
      className="w-full max-h-[300px] object-contain rounded-lg"
    />
  </div>

  {/* Text Content */}
  <div className="w-full md:w-1/2 text-center md:text-left">
    <h2 className="text-3xl md:text-4xl font-bold mb-4">{slide.title}</h2>
    <p className="text-lg md:text-xl mb-6 text-black-50">{slide.description}</p>
    <button className="px-6 py-3 bg-white text-[#3A1F78] font-semibold rounded shadow hover:bg-gray-200 transition">
      {slide.buttonText}
    </button>
  </div>
</div>


      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full ${
              idx === current ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
