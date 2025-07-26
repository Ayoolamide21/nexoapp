export default function Footer() {
  return (
    <footer className="bg-white text-gray-700 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
        {/* Column 1: Personal */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4">Personal</h3>
          <ul className="space-y-2">
            <li><a href="#">Profile</a></li>
            <li><a href="#">Wallet</a></li>
            <li><a href="#">Transactions</a></li>
            <li><a href="#">Settings</a></li>
          </ul>
        </div>

        {/* Column 2: Business */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4">Business</h3>
          <ul className="space-y-2">
            <li><a href="#">Merchant Portal</a></li>
            <li><a href="#">APIs</a></li>
            <li><a href="#">Invoices</a></li>
            <li><a href="#">Enterprise</a></li>
          </ul>
        </div>

        {/* Column 3: Company */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Media Kit</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>

        {/* Column 4: Legal */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Cookies</a></li>
            <li><a href="#">AML & KYC</a></li>
          </ul>
        </div>

        {/* Column 5: Social Media */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook">
              {/* Replace with actual icon */}
              <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24"><path d="..."/></svg>
            </a>
            <a href="#" aria-label="X (Twitter)">
              <svg className="w-5 h-5 text-black" viewBox="0 0 24 24"><path d="..."/></svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg className="w-5 h-5 text-pink-500" viewBox="0 0 24 24"><path d="..."/></svg>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} CryptoBank. All rights reserved.
      </div>
    </footer>
  );
}
