import React, { useEffect, useState } from "react";
import { getUserGoals } from "/src/api/goalApi";

export default function ActiveGoalsList() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadGoals = async () => {
    try {
      const result = await getUserGoals();
      setGoals(result || []);
    } catch {
       // silently ignore errors
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGoals(); // initial fetch

    const interval = setInterval(loadGoals, 60000); // auto-refresh every 60s
    return () => clearInterval(interval);
  }, []);

  if (loading)
    return (
      <p className="text-center text-gray-500 mt-10 text-lg">Loading goals...</p>
    );
  if (!goals.length)
    return (
      <p className="text-center text-gray-500 mt-10 text-lg">No goals found.</p>
    );

  return (
    <section className="active-goals-list max-w-4xl mx-auto p-6 space-y-6">
      {goals.map((goal) => (
        <div
          key={goal.id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold text-gray-900">{goal.name}</h3>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                goal.status === "active"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-200 text-gray-600"
              } capitalize`}
            >
              {goal.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4 text-gray-700">
            <div>
              <p className="text-sm uppercase tracking-wide font-semibold mb-1">
                Target Amount
              </p>
              <p className="text-xl font-semibold text-gray-900">
                ${parseFloat(goal.target_amount).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm uppercase tracking-wide font-semibold mb-1">
                Invested
              </p>
              <p className="text-xl font-semibold text-gray-900">
                ${parseFloat(goal.invested).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm uppercase tracking-wide font-semibold mb-1">
                Earnings
              </p>
              <p className="text-xl font-semibold text-gray-900">
                ${parseFloat(goal.earned).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm uppercase tracking-wide font-semibold mb-1">
              Progress
            </p>
            <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
              <div
                className="bg-blue-600 h-full"
                style={{ width: `${goal.progress_percent}%` }}
              ></div>
            </div>
            <p className="mt-1 text-right text-sm font-semibold text-blue-600">
              {goal.progress_percent}%
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between text-gray-700">
            <p>
              <span className="font-semibold">Timeframe: </span>
              {goal.target_frequency
                ? goal.target_frequency.charAt(0).toUpperCase() +
                  goal.target_frequency.slice(1)
                : goal.target_date
                ? `Until ${new Date(goal.target_date).toLocaleDateString()}`
                : "Not specified"}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
