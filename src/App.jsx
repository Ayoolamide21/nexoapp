import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import DashboardPreview from "./components/DashboardPreview";
import FeatureHighlights from "./components/FeatureHighlights";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="font-sans text-gray-900 bg-gray-50">
  {/* 🔁 Background Section for Navbar + Hero */}
  <div className="relative min-h-screen overflow-visible" style={{ height: "600px" }}>
    {/* 🔼 Background Image Layer */}
    <div className="absolute inset-0 bg-[url('/home.webp')] bg-cover bg-center bg-no-repeat z-0" />

    {/* 🔼 Foreground Content (Navbar + Hero) */}
    <div className="relative z-10">
      <Navbar />
      <Hero /> 
      {/* Other Sections */}
  <Features />
  <DashboardPreview />
  <FeatureHighlights />
  <Footer />
    </div> 
  </div>
</div>

  );
}

export default App;
