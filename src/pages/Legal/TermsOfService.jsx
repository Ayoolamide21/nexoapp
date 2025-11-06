import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useSettings } from '../../context/useSettings';


export function TermsOfService() {
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
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

        <p className="mb-4">
          Welcome to <strong>{`${siteName}`}</strong>. These Terms of Service (“Terms”) govern your use of our website, platform, and services. 
          By accessing or using our services, you agree to these Terms. Please read them carefully.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">1. Eligibility</h2>
        <p className="mb-4">
          You must be at least 18 years old (or the legal age in your jurisdiction) to use our services. 
          By using {`${siteName}`}, you confirm that you have the legal authority to enter into these Terms.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">2. Account Registration</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>You agree to provide accurate, current, and complete information when creating an account.</li>
          <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
          <li>Any activity under your account is your responsibility, including financial transactions.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-3">3. Investment and Trading</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>{`${siteName}`} provides access to digital asset investments, which carry inherent risks.</li>
          <li>Past performance does not guarantee future results.</li>
          <li>You agree to make investment decisions responsibly and understand potential gains and losses.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-3">4. Fees and Payments</h2>
        <p className="mb-4">
          Certain services may incur fees. By using our platform, you agree to pay any applicable fees. 
          Fees are subject to change with prior notice, as outlined on our website.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">5. Prohibited Activities</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Using the platform for illegal purposes or money laundering.</li>
          <li>Attempting unauthorized access to other users’ accounts or platform systems.</li>
          <li>Disrupting the platform’s security, functionality, or integrity.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-3">6. Intellectual Property</h2>
        <p className="mb-4">
          All content, software, and branding on {`${siteName}`} are owned by or licensed to us. 
          You may not copy, distribute, or use our intellectual property without prior written consent.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">7. Limitation of Liability</h2>
        <p className="mb-4">
          {`${siteName}`} is not liable for any losses, damages, or costs resulting from your use of the platform or investments. 
          You acknowledge the inherent risks associated with digital assets.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">8. Termination</h2>
        <p className="mb-4">
          We reserve the right to suspend or terminate your account for violations of these Terms or illegal activity. 
          You may also close your account at any time by following the account closure process.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">9. Governing Law and Dispute Resolution</h2>
        <p className="mb-4">
          These Terms are governed by the laws of the jurisdiction in which {`${siteName}`} operates. 
          Any disputes arising from these Terms will be resolved through binding arbitration or the appropriate courts in accordance with applicable law.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">10. Changes to Terms</h2>
        <p className="mb-4">
          {`${siteName}`} may update these Terms periodically. Updates will be posted on this page, and continued use of our services constitutes acceptance of the new Terms.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">11. Contact Information</h2>
        <p className="mb-4">
          If you have questions about these Terms, please <a href="/help-center" className="text-blue-600 underline">contact us</a>.
        </p>
        </section>

      <Footer />
    </>
  );
}
