import React, { useState, useEffect, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticleBackground() {
  const [initDone, setInitDone] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInitDone(true));
  }, []);

  const options = useMemo(() => ({
    fullScreen: { enable: false },
    detectRetina: true,
    fpsLimit: 60,
    interactivity: {
      events: { onHover: { enable: true, mode: "repulse" } },
      modes: { repulse: { distance: 100 } },
    },
    particles: {
      number: { value: 60, density: { enable: true, area: 800 } },
      color: { value: "#3A1F78" },
      links: { enable: true, color: "#3A1F78", distance: 120, opacity: 0.3, width: 1 },
      move: { enable: true, speed: 1.5, outModes: "bounce" },
      size: { value: { min: 1, max: 3 } },
      opacity: { value: 0.5 },
    },
  }), []);

  if (!initDone) return null;
  return <Particles id="tsparticles" options={options} className="absolute inset-0" />;
}
