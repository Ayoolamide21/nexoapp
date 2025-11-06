import React, { useEffect, useState } from "react";
import { getUserPlans, lockUserPlan } from "/src/api/planApi";
import PlansTable from "../components/PlansTable";
import Header from "../components/Header";

export default function PlansPage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const data = await getUserPlans();
      setPlans(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleLock = async () => {
    try {
      await lockUserPlan(selectedPlanId);
      setShowModal(false);
      await fetchPlans(); // refresh
    } catch {
       // silently ignore errors
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">My Active & Completed Plans</h2>
        {loading && <p>Loading your plans...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && (
          <PlansTable
            plans={plans}
            onManageClick={(planId) => {
              setSelectedPlanId(planId);
              setShowModal(true);
            }}
          />
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Lock Plan</h3>
            <p className="mb-4">Are you sure you want to lock this plan? This action cannot be undone.</p>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={handleLock}
              >
                Lock Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
