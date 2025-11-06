import React, { useEffect, useState, useCallback } from "react";
import { apiGetUserTransactions } from "/src/api/activityApi";
import { toast } from "react-toastify";
import Header from "../components/Header";

const Activity = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [type, setType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Pagination state
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTransactions = useCallback(
    async (pageNumber = 1) => {
      setLoading(true);
      try {
        const filters = {
          ...(type && { type }),
          ...(startDate && { start_date: startDate }),
          ...(endDate && { end_date: endDate }),
          page: pageNumber,
          per_page: perPage,
        };

        const data = await apiGetUserTransactions(filters);
        setTransactions(data.data || []);
        setPage(data.meta?.current_page || pageNumber);
        setTotalPages(data.meta?.total_pages || 1);
      } catch (error) {
        toast.error(error.message || "Failed to fetch transactions");
      } finally {
        setLoading(false);
      }
    },
    [type, startDate, endDate, perPage]
  );

  // Fetch transactions on filter or page change
  useEffect(() => {
    fetchTransactions(page);
  }, [fetchTransactions, page]);

  // Reset page to 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [type, startDate, endDate]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  const clearFilters = () => {
  setType("");
  setStartDate("");
  setEndDate("");
  setPage(1);
  fetchTransactions(1);
};


  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <h2 className="text-2xl font-semibold">Activity</h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center mb-4">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="">All Types</option>
            <option value="deposit">Deposit</option>
            <option value="withdrawal">Withdrawal</option>
            <option value="earning">Earning</option>
            <option value="points_conversion">Loyalty Points</option>
          </select>

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border px-3 py-2 rounded"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border px-3 py-2 rounded"
          />

          <button
            onClick={() => fetchTransactions(1)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Apply Filters
          </button>
          <button
    onClick={clearFilters}
    className="bg-gray-300 text-black px-4 py-2 rounded"
  >
    Clear Filters
  </button>
        </div>

        {/* Transactions */}
        {loading ? (
          <p>Loading transactions...</p>
        ) : transactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {transactions.map((tx, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-md shadow-sm bg-white flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium capitalize">{tx.type}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(tx.date).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    {tx.type === "points" ? (
                      <p className="font-bold text-blue-600">{tx.points} pts</p>
                    ) : (
                      <p
                        className={`font-bold ${
                          tx.amount > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {tx.amount > 0 ? "+" : "-"}${Math.abs(tx.amount)}
                      </p>
                    )}
                    {tx.status && (
                      <p className="text-sm text-gray-500">{tx.status}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Previous
              </button>

              <span className="px-4 py-2">
                Page {page} of {totalPages}
              </span>

              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Activity;
