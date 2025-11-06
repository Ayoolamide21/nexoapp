import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useSettings } from '../../context/useSettings';


export function PrivacyPolicy() {
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
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <p className="mb-4">
          At <strong>{`${siteName}`}</strong>, we respect your privacy and are committed to protecting your personal information. 
          This Privacy Policy explains how we collect, use, and safeguard your data when you use our services.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">1. Information We Collect</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Personal information you provide when creating an account or contacting us (e.g., name, email, phone).</li>
          <li>Financial information necessary for crypto transactions and investments.</li>
          <li>Usage data, including how you interact with our website and services.</li>
          <li>Cookies and tracking technologies to improve user experience.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-3">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>To provide and manage your accounts, transactions, and crypto investments.</li>
          <li>To communicate with you about updates, promotions, or security alerts.</li>
          <li>To analyze usage patterns and improve our services.</li>
          <li>To comply with legal and regulatory obligations.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-3">3. Data Security</h2>
        <p className="mb-4">
          We implement strict security measures to protect your personal and financial information. 
          This includes encryption, secure servers, and regular monitoring to prevent unauthorized access.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">4. Sharing Your Information</h2>
        <p className="mb-4">
          We do not sell your personal data. We may share information with:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Service providers who support our operations (e.g., payment processors, analytics).</li>
          <li>Regulatory authorities as required by law or compliance obligations.</li>
          <li>In the event of a merger, acquisition, or business transfer.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-3">5. Your Privacy Rights</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>You can request access to the personal information we hold about you.</li>
          <li>You can request corrections or updates to your personal data.</li>
          <li>You can opt-out of marketing communications at any time.</li>
          <li>Data retention: We retain your information only as long as necessary for service provision and legal compliance.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-3">6. Cookies and Tracking</h2>
        <p className="mb-4">
          Our website uses cookies and similar technologies to enhance your experience, analyze traffic, and provide personalized content. 
          You can manage your cookie preferences via your browser settings.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">7. Changes to This Policy</h2>
        <p className="mb-4">
          We may update this Privacy Policy periodically. Changes will be posted on this page, and the effective date will be updated. 
          We encourage you to review this page regularly to stay informed.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">8. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy or your personal data, please <a href="/help-center" className="text-blue-600 underline">contact us</a>.
        </p>
        </section>

      <Footer />
    </>
  );
}
