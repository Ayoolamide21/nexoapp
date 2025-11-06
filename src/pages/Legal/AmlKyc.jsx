import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useSettings } from '../../context/useSettings';

export function AMLKYC() {
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
        <h1 className="text-3xl font-bold mb-6">AML & KYC Compliance</h1>

        <p className="mb-4">
          At <strong>{`${siteName}`}</strong>, we are committed to maintaining the highest standards of regulatory compliance. 
          Our AML (Anti-Money Laundering) and KYC (Know Your Customer) procedures help ensure a safe and secure investment environment for all users.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">1. Know Your Customer (KYC)</h2>
        <p className="mb-4">
          KYC procedures allow us to verify the identity of our clients and understand their financial profile. This helps prevent fraud, identity theft, and illegal activities.
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Verification of personal information, including legal name, date of birth, and government-issued ID.</li>
          <li>Proof of address verification through official documents.</li>
          <li>Assessment of source of funds and investment purpose for compliance purposes.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-3">2. Anti-Money Laundering (AML)</h2>
        <p className="mb-4">
          Our AML policies are designed to detect, prevent, and report suspicious financial activities. We take proactive steps to comply with local and international regulations.
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Monitoring transactions for unusual or suspicious activity.</li>
          <li>Regular reporting to relevant regulatory authorities where required.</li>
          <li>Screening clients against sanctions and watchlists.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-3">3. Compliance Benefits</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Enhanced security for your investments and personal data.</li>
          <li>Confidence that our platform adheres to strict legal and ethical standards.</li>
          <li>Protection against fraudulent activities and regulatory risks.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-3">4. Your Responsibilities</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Provide accurate and up-to-date personal information.</li>
          <li>Respond promptly to verification requests.</li>
          <li>Report any suspicious activity on your account immediately.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-3">5. Privacy and Data Protection</h2>
        <p className="mb-4">
          All information collected during KYC and AML checks is securely stored and processed in accordance with our <a href="/privacy" className="text-blue-600 underline">Privacy Policy</a>. We use advanced encryption and strict access controls to safeguard your data.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">6. Contact Us</h2>
        <p className="mb-4">
          For questions regarding our AML & KYC procedures or compliance requirements, please <a href="/help-center" className="text-blue-600 underline">contact us</a>
        </p>
      </section>

      <Footer />
    </>
  );
}
