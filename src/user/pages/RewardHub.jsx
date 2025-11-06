import React, { useEffect, useState } from "react";
import { apiGetReferralInfo, apiConvertPoints } from "/src/api/rewardApi";
import Header from "../components/Header";
import { toast } from "react-toastify";

export default function RewardHub() {
  const [loading, setLoading] = useState(true);
  const [referralInfo, setReferralInfo] = useState(null);
  const [redeemLoading, setRedeemLoading] = useState(false);

  useEffect(() => {
    const loadReferralInfo = async () => {
      try {
        const data = await apiGetReferralInfo();
        setReferralInfo(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadReferralInfo();
  }, []);

  const handleRedeem = async () => {
    setRedeemLoading(true);
    try {
      const data = await apiConvertPoints();
      toast.success(data.message);
      const refreshed = await apiGetReferralInfo();
      setReferralInfo(refreshed);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setRedeemLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading reward info...</p>;

  return (
    <>
  <Header/>
  
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
    
      <h1 className="text-3xl font-semibold mb-8 border-b pb-4">Rewards Hub</h1>

      {/* Referral Link */}
      <section className="mb-8">
        <label className="block mb-2 font-medium text-gray-700">Your Referral Link</label>
        <input
          readOnly
          value={referralInfo.referral_link}
          className="w-full border rounded px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <StatBox label="Referral Points Earned" value={referralInfo.points_earned} />
        <StatBox label="Total Loyalty Points" value={referralInfo.loyalty_points} />
      </section>

      {/* Redeem */}
      <section className="mb-10">
        <button
          disabled={redeemLoading || referralInfo.loyalty_points < 10}
          onClick={handleRedeem}
          className={`px-6 py-2 rounded font-semibold transition ${
            redeemLoading || referralInfo.loyalty_points < 10
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-900 text-white hover:bg-gray-700"
          }`}
        >
          {redeemLoading ? "Redeeming..." : "Redeem Points to Balance"}
        </button>
        {referralInfo.loyalty_points < 10 && (
          <p className="mt-2 text-sm text-gray-500">You need at least 10 points to redeem.</p>
        )}
      </section>

      {/* Referred Users */}
      <section>
        <h2 className="text-xl font-semibold mb-4">People You Referred</h2>
        {referralInfo.referred_users.length === 0 ? (
          <p className="text-gray-600">No referrals yet.</p>
        ) : (
          <div className="overflow-x-auto border rounded-md border-gray-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 font-medium text-gray-700">Name</th>
                  <th className="p-3 font-medium text-gray-700">Email</th>
                  <th className="p-3 font-medium text-gray-700">Joined</th>
                </tr>
              </thead>
              <tbody>
                {referralInfo.referred_users.map((user) => (
                  <tr key={user.id} className="border-t hover:bg-indigo-50">
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{new Date(user.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
    </>
  );
}

const StatBox = ({ label, value }) => (
  <div className="bg-gray-50 rounded p-5 shadow border border-gray-200">
    <p className="text-gray-600">{label}</p>
    <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
  </div>
);
