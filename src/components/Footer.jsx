import { useSettings } from '../context/useSettings';

export default function Footer() {
  const { settings } = useSettings();
  const siteName = settings?.sitename || "Our Platform";

  return (
    <footer className="bg-white text-gray-700 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
        {/* Column 1: Personal */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4">Personal</h3>
          <ul className="space-y-2">
            <li><a href="/login?redirect=profile">Profile</a></li>
            <li><a href="/login?redirect=wallet">Wallet</a></li>
            <li><a href="/login?redirect=transactions">Transactions</a></li>
            <li><a href="/login?redirect=settings">Settings</a></li>
          </ul>
        </div>

        {/* Column 2: Business */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4">Business</h3>
          <ul className="space-y-2">
            <li><a href="/business/merchant-services">Merchant Portal</a></li>
            <li><a href="/business/payment-processing">APIs</a></li>
            <li><a href="/business/corporate-savings">Corporate Savings</a></li>
            <li><a href="/business/exchange">Business Exchange</a></li>
          </ul>
        </div>

        {/* Column 3: Company */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            <li><a href="/about">About Us</a></li>
            <li><a href="/help-center">Help Center</a></li>
            <li><a href="/careers">Careers</a></li>
          </ul>
        </div>

        {/* Column 4: Legal */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms-of-use">Terms of Service</a></li>
            <li><a href="/cookies">Cookies</a></li>
            <li><a href="/kyc">AML & KYC</a></li>
          </ul>
        </div>

        {/* Column 5: Social Media */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22 12.07c0-5.52-4.48-10-10-10S2 6.55 2 12.07c0 5 3.66 9.13 8.44 9.88v-6.99h-2.54v-2.89h2.54v-2.2c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.22.2 2.22.2v2.44h-1.25c-1.23 0-1.61.76-1.61 1.53v1.94h2.74l-.44 2.89h-2.3v6.99C18.34 21.2 22 17.06 22 12.07z"/>
              </svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
              <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M23 3a10.9 10.9 0 01-3.14.86 4.48 4.48 0 001.97-2.48 9.02 9.02 0 01-2.83 1.08 4.52 4.52 0 00-7.69 4.13 12.83 12.83 0 01-9.3-4.73 4.48 4.48 0 001.4 6.04 4.49 4.49 0 01-2.05-.57v.06a4.52 4.52 0 003.62 4.43 4.52 4.52 0 01-2.04.07 4.53 4.53 0 004.22 3.13A9 9 0 012 19.54a12.84 12.84 0 006.94 2.03c8.32 0 12.87-6.89 12.87-12.87 0-.2 0-.39-.02-.58A9.22 9.22 0 0023 3z"/>
              </svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 3.15a1.15 1.15 0 110 2.3 1.15 1.15 0 010-2.3zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} {siteName}. All rights reserved.
      </div>
    </footer>
  );
}
 