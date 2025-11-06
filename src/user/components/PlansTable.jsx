import React, { useState } from "react";

const statusLabels = {
  active: "Manage",
  completed: "Completed",
  locked: "Locked",
  cancelled: "Cancelled",
};

export default function PlansTable({ plans, onManageClick, itemsPerPage = 5 }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(plans.length / itemsPerPage);

  // Calculate current page items
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPlans = plans.slice(startIndex, startIndex + itemsPerPage);

  function goToPage(page) {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
      <table className="min-w-full text-sm text-gray-700 border-collapse">
        <thead className="bg-gray-100 border-b text-xs uppercase text-gray-600 hidden sm:table-header-group">
          <tr>
            <th className="px-4 py-3 text-left">Plan</th>
            <th className="px-4 py-3 text-left">Invested</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Start - End</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {currentPlans.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-6 text-center text-gray-500">
                No active or completed plans found.
              </td>
            </tr>
          ) : (
            currentPlans.map((plan, idx) => (
              <tr
                key={idx}
                className="border-b hover:bg-gray-50 duration-150 block sm:table-row"
              >
                <td
                  className="px-4 py-3 font-medium sm:table-cell block sm:border-none border-b border-gray-200 relative sm:relative"
                  data-label="Plan"
                >
                  {plan.plan_name}
                </td>
                <td
                  className="px-4 py-3 sm:table-cell block sm:border-none border-b border-gray-200 relative sm:relative"
                  data-label="Invested"
                >
                  ${plan.amount.toLocaleString()}
                </td>
                <td
                  className="px-4 py-3 capitalize sm:table-cell block sm:border-none border-b border-gray-200 relative sm:relative"
                  data-label="Status"
                >
                  {plan.status}
                </td>
                <td
                  className="px-4 py-3 sm:table-cell block sm:border-none border-b border-gray-200 relative sm:relative"
                  data-label="Start - End"
                >
                  {plan.starts_at
                    ? `${plan.starts_at.split("T")[0]} → ${plan.ends_at?.split("T")[0]}`
                    : "N/A"}
                </td>
                <td
                  className="px-4 py-3 sm:table-cell block sm:border-none relative sm:relative"
                  data-label="Actions"
                >
                  <button
                    className={`px-3 py-1 rounded text-xs font-medium ${
                      plan.status === "active"
                        ? "bg-gray-800 text-white hover:bg-gray-900"
                        : "bg-gray-400 text-gray-800 cursor-not-allowed opacity-60"
                    }`}
                    disabled={plan.status !== "active"}
                    onClick={() => onManageClick(plan.id)}
                  >
                    {statusLabels[plan.status] || plan.status}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2 text-gray-700">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-3 py-1 rounded border ${
                  currentPage === page
                    ? "bg-gray-800 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                {page}
              </button>
            );
          })}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 640px) {
          tbody tr {
            display: block;
            margin-bottom: 1rem;
            border: 1px solid #e5e7eb; /* gray-200 */
            border-radius: 0.5rem;
            padding: 0.5rem;
          }

          tbody td {
            display: flex;
            justify-content: space-between;
            padding-left: 0.75rem;
            padding-right: 0.75rem;
            position: relative;
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
          }

          tbody td::before {
            content: attr(data-label);
            font-weight: 600;
            text-transform: uppercase;
            color: #6b7280; /* gray-500 */
            flex-basis: 40%;
          }
        }
      `}</style>
    </div>
  );
}
