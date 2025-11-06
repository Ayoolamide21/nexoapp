import React, { useEffect, useState } from "react";
import { getWithdrawals } from "/src/api/withdrawalApi";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  default: "bg-gray-100 text-gray-800",
};

const WithdrawalHistory = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchWithdrawals = async (pageNum = 1) => {
    setLoading(true);
    try {
      const data = await getWithdrawals(pageNum);
      setWithdrawals(data.data);
      setPage(data.current_page);
      setLastPage(data.last_page);
    } catch {
      // silently ignore errors
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawals(page);
  }, [page]);

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h3 className="text-xl font-semibold mb-6">Withdrawal History</h3>
      {loading ? (
        <p>Loading...</p>
      ) : withdrawals.length === 0 ? (
        <p>No withdrawals found.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <table className="hidden md:table w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold border-b">
                <th className="py-3 px-5 text-left">Amount</th>
                <th className="py-3 px-5 text-left">Method</th>
                <th className="py-3 px-5 text-left">Date</th>
                <th className="py-3 px-5 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((w, idx) => (
                <tr
                  key={w.id}
                  className={`border-b hover:bg-gray-50 transition-colors ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="py-3 px-5 font-medium text-gray-900">
                    ${w.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-5 capitalize">
  {(w.withdrawal_method ?? "").replace("_", " ")}
</td>
                  <td className="py-3 px-5">
                    {new Date(w.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-5">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        statusColors[w.status] || statusColors.default
                      }`}
                    >
                      {w.status.charAt(0).toUpperCase() + w.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile Card View */}
          <div className="space-y-5 md:hidden">
            {withdrawals.map((w) => (
              <div
                key={w.id}
                className="border rounded p-4 shadow-sm bg-gray-50"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Amount:</span>
                  <span>${w.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Method:</span>
                 <span>{(w.withdrawal_method ?? "").replace("_", " ")}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Date:</span>
                  <span>{new Date(w.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Status:</span>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      statusColors[w.status] || statusColors.default
                    }`}
                  >
                    {w.status.charAt(0).toUpperCase() + w.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-6 mt-6">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 rounded border disabled:opacity-50 hover:bg-gray-100"
            >
              Previous
            </button>

            <span className="text-gray-700">
              Page {page} of {lastPage}
            </span>

            <button
              disabled={page === lastPage}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 rounded border disabled:opacity-50 hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default WithdrawalHistory;
