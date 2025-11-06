import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaMoneyBillWave, FaCalculator, FaChartLine } from "react-icons/fa";

import { calculatePlanImpact } from "/src/api/goalApi";
import {getPlans} from "/src/api/planApi";

export default function CreateGoalModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: "",
    target_amount: "",
    target_frequency: "",
    target_date: "",
  });
const formatCurrency = (value) =>
  `$${parseFloat(value).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

useEffect(() => {
  const loadPlans = async () => {
    try {
      const result = await getPlans(); // fetches all plans
      const filtered = result.filter(
        (plan) => plan.category === "personal" || plan.category === "business"
      );
      setRecommendedPlans(filtered);
    } catch {
      // silently ignore errors
    }
  };

  loadPlans();
}, []);



  const [loading, setLoading] = useState(false);
  const [suggestedDuration, setSuggestedDuration] = useState(null);
  const [recommendationLoading, setRecommendationLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [recommendedPlans, setRecommendedPlans] = useState([]);

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  if (!selectedPlan?.id) {
    toast.error("Please select a plan before submitting.");
    setLoading(false);
    return;
  }

  const payload = {
    name: form.name,
    target_amount: Number(form.target_amount),
    target_frequency: form.target_frequency,
    target_date: form.target_date,
    plan_id: selectedPlan.id,
  };

  try {
  await calculatePlanImpact(payload);
  toast.success("Goal created and investment deducted!");
  onClose();
} catch (err) {
  toast.error(err.message || "Failed to create goal.");
} finally {
  setLoading(false);
}

};




  // Update form on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Effect: when target_amount or target_frequency changes, fetch recommendation
  useEffect(() => {
  const fetchRecommendation = async () => {
    if (!form.target_amount || Number(form.target_amount) <= 0) {
      setSuggestedDuration(null);
      return;
    }

    setRecommendationLoading(true);
    try {
      const result = await calculatePlanImpact({
        target_amount: Number(form.target_amount),
        target_frequency: form.target_frequency || undefined,
      });

      setSuggestedDuration(result.recommended_duration_days || null);
    } catch {
      setSuggestedDuration(null);
    } finally {
      setRecommendationLoading(false);
    }
  };

  fetchRecommendation();
}, [form.target_amount, form.target_frequency]);


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Create a New Goal</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-sm mb-1">Goal Title</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
              placeholder="E.g. Buy a Car"
            />
          </div>

          <div>
            <label className="block font-medium text-sm mb-1">Target Amount ($)</label>
            <input
              type="number"
              name="target_amount"
              value={form.target_amount}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
              min="1"
            />
          </div>

          <div>
            <label className="block font-medium text-sm mb-1">
              Earning Frequency (Optional)
            </label>
            <select
              name="target_frequency"
              value={form.target_frequency}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">None</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-sm mb-1">Target Date (Optional)</label>
            <input
              type="date"
              name="target_date"
              value={form.target_date}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Suggestion Result Display */}
         <div className="mt-2">
  {recommendationLoading ? (
    <p className="text-sm text-gray-500">Calculating recommendation...</p>
  ) : suggestedDuration ? (
    <p className="text-sm text-green-600 font-medium flex items-center gap-2">
      <FaLightbulb className="text-yellow-500" />
      Suggested duration to reach your goal: {suggestedDuration} days
    </p>
  ) : null}
</div>

{recommendedPlans.length > 0 && (
  <div>
    <label className="block font-medium text-sm mb-1">Select a Plan</label>
    <select
      value={selectedPlan?.id || ""}
      onChange={(e) => {
        const plan = recommendedPlans.find(p => p.id === Number(e.target.value));
        setSelectedPlan(plan);
      }}
      className="w-full border rounded px-3 py-2"
    >
      <option value="">Choose a plan</option>
      {recommendedPlans.map((plan) => (
        <option key={plan.id} value={plan.id}>
         {plan.name} — {formatCurrency(plan.min_amount)} to {formatCurrency(plan.max_amount)}

        </option>
      ))}
    </select>
  </div>
)}




          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              {loading ? "Saving..." : "Create Goal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
