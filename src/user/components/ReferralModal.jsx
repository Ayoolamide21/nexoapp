import React, { useEffect, useState } from "react";
import { FiX, FiCopy } from "react-icons/fi";
import { toast } from "react-toastify";
import { apiGetReferralInfo } from "/src/api/rewardApi"; // Adjust path if needed

const ReferralModal = ({ onClose }) => {
  const [loading, setLoading] = useState(true);
  const [referralData, setReferralData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiGetReferralInfo();
        setReferralData(data);
      } catch (err) {
        toast.error(err.message || "Failed to fetch referral info.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCopy = () => {
    if (referralData?.referral_link) {
      navigator.clipboard.writeText(referralData.referral_link);
      toast.success("Referral link copied!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 relative shadow-lg">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600">
          <FiX size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Invite Your Friends</h2>

        {loading ? (
          <p>Loading...</p>
        ) : referralData ? (
          <>
            <p className="text-sm mb-1">Share this referral link:</p>
            <div className="flex items-center bg-gray-100 rounded px-3 py-2 mb-4">
              <input
                type="text"
                value={referralData.referral_link}
                readOnly
                className="flex-1 bg-transparent text-sm outline-none"
              />
              <button
                onClick={handleCopy}
                className="bg-black text-white px-2 py-1 rounded text-sm ml-2 flex items-center gap-1"
              >
                <FiCopy size={14} /> Copy
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm">
                <strong>Loyalty Points from Referrals:</strong>{" "}
                <span className="text-green-600">{referralData.points_earned}</span>
              </p>
              <p className="text-sm">
                <strong>Total Loyalty Points:</strong>{" "}
                <span className="text-blue-600">{referralData.loyalty_points}</span>
              </p>
            </div>

            {referralData.referred_users?.length > 0 && (
              <div>
                <p className="text-sm font-semibold mb-2">Referred Users:</p>
                <ul className="text-sm max-h-40 overflow-y-auto space-y-1 text-gray-700">
                  {referralData.referred_users.map((user) => (
                    <li key={user.id}>
                      {user.name} - {user.email} (
                      {new Date(user.created_at).toLocaleDateString()})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : (
          <p>No referral data available.</p>
        )}
      </div>
    </div>
  );
};

export default ReferralModal;
