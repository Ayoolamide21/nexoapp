import React from "react";
import { FiX, FiClock } from "react-icons/fi";

const NotificationsDropdown = ({ onClose }) => {
  return (
    <div className="absolute top-14 right-4 w-96 bg-white shadow-2xl rounded-xl p-6 z-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <FiX size={20} />
        </button>
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center text-center py-16 text-gray-600">
        <div className="bg-gray-100 p-4 rounded-full mb-4">
          <FiClock size={32} />
        </div>
        <p className="text-sm">We'll keep you updated when there's something new.</p>
      </div>
    </div>
  );
};

export default NotificationsDropdown;
