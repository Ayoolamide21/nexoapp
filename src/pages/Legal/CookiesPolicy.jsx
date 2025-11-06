import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useSettings } from '../../context/useSettings';


export function CookiesPolicy() {
  const location = useLocation();
  const { settings } = useSettings();
  const siteName = settings?.sitename || "Our Platform";
    
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  return (
    <>
      <Navbar />

      <section className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Cookies Policy</h1>

        <p className="mb-4">
          At <strong>{`${siteName}`}</strong>, we use cookies and similar technologies to enhance your experience, analyze site traffic, and provide personalized services. This Cookies Policy explains what cookies are, how we use them, and how you can manage your preferences.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">1. What Are Cookies?</h2>
        <p className="mb-4">
          Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, improve functionality, and track usage for analytics purposes.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">2. How We Use Cookies</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Essential Cookies:</strong> Required for basic website functions like security, login, and navigation.</li>
          <li><strong>Performance Cookies:</strong> Track how users interact with our website to improve speed, usability, and reliability.</li>
          <li><strong>Functional Cookies:</strong> Remember your preferences, such as language or display settings.</li>
          <li><strong>Analytics & Advertising Cookies:</strong> Help us deliver relevant content and analyze marketing effectiveness.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-3">3. Third-Party Cookies</h2>
        <p className="mb-4">
          We may allow trusted third-party services, such as analytics providers or advertising partners, to place cookies on our site. These cookies help measure performance and deliver relevant advertisements. We do not control how third parties use their cookies.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">4. Managing Your Cookies</h2>
        <p className="mb-4">
          You can manage cookies through your browser settings, including deleting existing cookies or blocking new ones. Please note that disabling some cookies may affect the functionality of our website or limit certain services.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">5. Your Consent</h2>
        <p className="mb-4">
          By using our website, you consent to the use of cookies as described in this policy. If you do not agree, please adjust your browser settings or refrain from using certain features of our website.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">6. Updates to This Policy</h2>
        <p className="mb-4">
          We may update this Cookies Policy periodically to reflect changes in our practices or legal requirements. The effective date will be updated, and we encourage you to review this page regularly.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">7. Contact Us</h2>
        <p className="mb-4">
          If you have any questions or concerns about our use of cookies, <a href="/help-center" className="text-blue-600 underline">contact us</a>.
        </p>
        </section>

      <Footer />
    </>
  );
}
