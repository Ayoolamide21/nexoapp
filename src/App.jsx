import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import DashboardPreview from "./components/DashboardPreview";
import FeatureHighlights from "./components/FeatureHighlights";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="font-sans text-gray-900 bg-gray-50">
 
  <div className="relative font-sans text-gray-900 bg-gray-50 min-h-screen">
  {/* 🔼 Background Image Layer */}
  <div className="absolute inset-0 bg-[url('/home.webp')] bg-cover bg-center bg-no-repeat z-0" />


  {/* ✅ Foreground Content */}
  <div className="relative z-10">
    <Navbar />
    <Hero />
  </div>
  </div>

      {/* Other Sections */}
      <Features />
      <DashboardPreview />
      <FeatureHighlights />
      <Footer />
    </div>
  );
}

export default App;
