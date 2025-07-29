import React from "react";
import { PhoneIcon, LockClosedIcon, CalendarIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

export default function FeatureHighlights() {
  return (
    <div>
      {/* Highlights Section */}
      <section className="bg-gray-50 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Column 1: 24/7 Client Care */}
          <div className="flex flex-col items-center">
            <PhoneIcon className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">24/7 Client Care</h3>
            <p className="text-sm text-gray-600 mt-2">We’re always here when you need us.</p>
          </div>

          {/* Column 2: Operating Since 2017 */}
          <div className="flex flex-col items-center">
            <CalendarIcon className="w-10 h-10 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">Operating Since 2017</h3>
            <p className="text-sm text-gray-600 mt-2">A legacy of excellence and innovation.</p>
          </div>

          {/* Column 3: 256-bit Encryption */}
          <div className="flex flex-col items-center">
            <ShieldCheckIcon className="w-10 h-10 text-purple-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">256-bit Encryption</h3>
            <p className="text-sm text-gray-600 mt-2">Your data is protected with military-grade security.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
