import React from "react";
import { FaPlusCircle } from "react-icons/fa";

export default function SummaryHeader({ goals, onCreateGoal }) {
const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  if (!goals) return <p>No goals data passed!</p>;

  const totalInvested = goals.reduce(
  (sum, goal) => sum + (goal.invested ?? goal.achieved_amount ?? 0),
  0
);

  const activeCount = goals.filter((goal) => goal.status === "active").length;
  const completedCount = goals.filter((goal) => goal.status === "completed").length;

  return (
    <section className="summary-header p-6 bg-white rounded-lg shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
      <div>
        <h2 className="text-xl font-semibold mb-3">Summary</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 text-gray-700">
          <div>
            <p className="text-sm font-medium">Total Goals</p>
            <p className="text-lg font-bold">{goals.length}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Active Goals</p>
            <p className="text-lg font-bold text-green-600">{activeCount}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Completed Goals</p>
            <p className="text-lg font-bold text-blue-600">{completedCount}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Total Invested</p>
            <p className="text-lg font-bold text-indigo-600">
              {formatCurrency(totalInvested)}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={onCreateGoal}
        className="inline-flex items-center gap-2 px-4 py-2 bg-black hover:bg-gray-700 text-white rounded-md font-semibold shadow-sm transition-colors"
        type="button"
      >
        <FaPlusCircle />
        Create New Goal
      </button>
    </section>
  );
}
