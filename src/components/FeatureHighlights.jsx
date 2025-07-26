// Place this component right above your <Footer /> in your layout
export default function FeatureHighlights() {
  return (
    <section className="bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* Column 1: 24/7 Client Care */}
        <div className="flex flex-col items-center">
          {/* Example Icon — Support */}
          <svg className="w-10 h-10 text-blue-600 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12v4c0 1.1.9 2 2 2h4v4l4-4h4c5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
          </svg>
          <h3 className="text-lg font-semibold text-gray-900">24/7 Client Care</h3>
          <p className="text-sm text-gray-600 mt-2">We’re always here when you need us.</p>
        </div>

        {/* Column 2: Operating Since 2017 */}
        <div className="flex flex-col items-center">
          {/* Example Icon — Calendar */}
          <svg className="w-10 h-10 text-green-600 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M8 7V3M16 7V3M3 9h18M5 22h14a2 2 0 002-2V7H3v13a2 2 0 002 2z"/>
          </svg>
          <h3 className="text-lg font-semibold text-gray-900">Operating Since 2017</h3>
          <p className="text-sm text-gray-600 mt-2">A legacy of excellence and innovation.</p>
        </div>

        {/* Column 3: 256-bit Encryption */}
        <div className="flex flex-col items-center">
          {/* Example Icon — Shield */}
          <svg className="w-10 h-10 text-purple-600 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 2l8 4v5c0 5.25-3.5 10.16-8 11-4.5-.84-8-5.75-8-11V6l8-4z"/>
          </svg>
          <h3 className="text-lg font-semibold text-gray-900">256-bit Encryption</h3>
          <p className="text-sm text-gray-600 mt-2">Your data is protected with military-grade security.</p>
        </div>
      </div>
    </section>
  );
}
