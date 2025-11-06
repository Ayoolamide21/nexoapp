import React, { useEffect, useState } from "react";
import { getPlans, applyForLoan, getLoanHistory } from "/src/api/planApi";
import Header from "../components/Header";
import { toast } from "react-toastify";

const INTEREST_INTERVALS = {
  daily: 365,
  weekly: 52,
  monthly: 12,
};

export default function Explore() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [estimatedRepayment, setEstimatedRepayment] = useState(null);
  const [error, setError] = useState("");
  const [loanHistory, setLoanHistory] = useState([]); // State for loan history

  useEffect(() => {
    async function fetchPlans() {
      try {
        const data = await getPlans("loans");
        setPlans(data.plans || data);
      } catch {
        // silently ignore errors
      } finally {
        setLoading(false);
      }
    }

    // Fetch loan application history
    async function fetchLoanHistory() {
      try {
        const history = await getLoanHistory(); // Assuming an API to get loan history
        setLoanHistory(history);
      } catch {
       // silently ignore errors
      }
    }

    fetchPlans();
    fetchLoanHistory(); // Fetch history when component loads
  }, []);

  const calculateRepayment = (amountNum, termNum, plan) => {
    if (!amountNum || !termNum) return null;
    if (
      !plan ||
      typeof plan.profit_rate !== "number" ||
      !plan.profit_interval ||
      !(plan.profit_interval in INTEREST_INTERVALS)
    )
      return null;

    const ratePerYear = plan.profit_rate / 100;
    const intervalsPerYear = INTEREST_INTERVALS[plan.profit_interval];
    const totalInterest = amountNum * ratePerYear * (termNum / intervalsPerYear);
    const totalRepayment = amountNum + totalInterest;

    const repayment = totalRepayment / termNum;
    if (isNaN(repayment)) return null;

    return repayment.toFixed(2);
  };

  const parseChange = (changeStr) => {
    if (!changeStr) return { profit_rate: null, profit_interval: null };

    const parts = changeStr.split(" ");
    if (parts.length !== 2) return { profit_rate: null, profit_interval: null };

    const rate = parseFloat(parts[0].replace("%", ""));
    const interval = parts[1].toLowerCase();

    return {
      profit_rate: isNaN(rate) ? null : rate,
      profit_interval: interval,
    };
  };

  const onSelectPlan = (plan) => {
    const { profit_rate, profit_interval } = parseChange(plan.change);

    setSelectedPlan({
      ...plan,
      profit_rate,
      profit_interval,
      duration: plan.duration ? parseInt(plan.duration) : null,
    });

    setAmount(plan.min_amount);
    setTerm(plan.duration ? parseInt(plan.duration) : "");
    setEstimatedRepayment(null);
    setError("");
  };

  const onCalculate = () => {
    const amountNum = parseFloat(amount);
    const termNum = parseInt(term);

    if (
      isNaN(amountNum) ||
      amountNum < selectedPlan.min_amount ||
      amountNum > selectedPlan.max_amount
    ) {
      setError(
        `Amount must be between $${selectedPlan.min_amount} and $${selectedPlan.max_amount}`
      );
      return;
    }
    if (isNaN(termNum) || termNum < 1) {
      setError("Please enter a valid term.");
      return;
    }
    const repayment = calculateRepayment(amountNum, termNum, selectedPlan);
    setEstimatedRepayment(repayment);
  };

  const onApply = async () => {
    if (!selectedPlan || !selectedPlan.id) {
      toast.error("Please select a loan plan first.");
      return;
    }

    const amountNum = parseFloat(amount);
    const termNum = parseInt(term);

    if (
      isNaN(amountNum) ||
      amountNum < selectedPlan.min_amount ||
      amountNum > selectedPlan.max_amount
    ) {
      toast.error(
        `Amount must be between $${selectedPlan.min_amount} and $${selectedPlan.max_amount}`
      );
      return;
    }
    if (isNaN(termNum) || termNum < 1) {
      toast.error("Please enter a valid term.");
      return;
    }

    try {
      await applyForLoan({
        plan_id: selectedPlan.id,
        amount_requested: amountNum,
        term: termNum,
      });

      toast.success("Loan application submitted successfully!");
      setSelectedPlan(null);
      setAmount("");
      setTerm("");
      setEstimatedRepayment(null);

   // Re-fetch loan history after a new application is made
      const updatedLoanHistory = await getLoanHistory(); 
      setLoanHistory(updatedLoanHistory || []);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const renderLoanHistory = () => {
  if (loanHistory.length === 0) {
    return (
      <tr>
        <td colSpan="5" className="text-center py-4 text-gray-500">
          No loan applications found.
        </td>
      </tr>
    );
  }

  return loanHistory.map((loan) => {
    // Find the plan for the loan
    const plan = plans.find((p) => p.id === loan.plan_id);
    const loanDate = new Date(loan.date);
    const formattedDate = loanDate instanceof Date && !isNaN(loanDate)
      ? loanDate.toLocaleDateString() // Format to the default locale
      : "Not Available"; // Fallback if the date is invalid

    const statusClass = {
      pending: "bg-gray-200 text-yellow-800",
      approved: "bg-gray-200 text-green-800",
      rejected: "bg-red-200 text-red-800",
      completed: "bg-blue-200 text-blue-800",
    }[loan.status] || "bg-gray-200 text-gray-800";

    return (
      <tr key={loan.id} className="hover:bg-gray-50">
        {/* Default display for large screens */}
        <td className="px-6 py-4 text-gray-800 hidden sm:table-cell">{plan ? plan.name : "Unknown Plan"}</td>
        <td className="px-6 py-4 text-gray-800 hidden sm:table-cell">${loan.amount_requested}</td>
        <td className="px-6 py-4 text-gray-800 hidden sm:table-cell">{loan.term} months</td>
        <td className="px-6 py-4 hidden sm:table-cell">
          <span className={`px-4 py-2 inline-block rounded-full text-sm font-semibold ${statusClass}`}>
            {loan.status}
          </span>
        </td>
        <td className="px-6 py-4 text-gray-500 hidden sm:table-cell">{formattedDate}</td>

        {/* Mobile View: Stack columns */}
        <td className="sm:hidden px-6 py-4 text-gray-800 block">
          <div><strong>Loan Plan:</strong> {plan ? plan.name : "Unknown Plan"}</div>
          <div><strong>Amount Requested:</strong> ${loan.amount_requested}</div>
          <div><strong>Term:</strong> {loan.term} months</div>
          <div><strong>Status:</strong> <span className={`px-4 py-2 inline-block rounded-full text-sm font-semibold ${statusClass}`}>{loan.status}</span></div>
          <div><strong>Date:</strong> {formattedDate}</div>
        </td>
      </tr>
    );
  });
};

  if (loading) return <p className="p-6">Loading loan plans...</p>;

  return (
    <>
      <Header activeLink="Explore" />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-xl font-semibold mb-4">Explore Loan Plans</h2>

        {/* Plan List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.length === 0 ? (
            <p>No loan plans available.</p>
          ) : (
            plans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-white shadow-sm rounded-lg p-4 border cursor-pointer hover:shadow-md ${
                  selectedPlan?.id === plan.id ? "border-blue-500" : ""
                }`}
                onClick={() => onSelectPlan(plan)}
              >
                <p className="text-lg font-semibold">{plan.name}</p>
                <p className="text-sm text-gray-500 mb-2">{plan.description}</p>
                <p className="text-sm">
                  <strong>Amount:</strong> ${plan.min_amount} - $
                  {plan.max_amount}
                </p>
                <p className="text-sm">
                  <strong>Interest Rate:</strong>{" "}
                  {plan.change ? plan.change : "N/A"}
                </p>
                <p className="text-sm">
                  <strong>Duration:</strong> {plan.duration || "Varies"}
                </p>
              </div>
            ))
          )}
        </div>

      {/* Loan Application History */}
<h3 className="text-lg font-semibold mt-8 mb-4 text-gray-800">Loan Application History</h3>
<div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
  <table className="min-w-full table-auto text-sm hidden sm:table">
    <thead className="bg-gray-100 text-gray-700">
      <tr>
        <th className="px-6 py-3 text-left font-medium text-sm uppercase tracking-wider">Loan Plan</th>
        <th className="px-6 py-3 text-left font-medium text-sm uppercase tracking-wider">Amount Requested</th>
        <th className="px-6 py-3 text-left font-medium text-sm uppercase tracking-wider">Term</th>
        <th className="px-6 py-3 text-left font-medium text-sm uppercase tracking-wider">Status</th>
        <th className="px-6 py-3 text-left font-medium text-sm uppercase tracking-wider">Date</th>
      </tr>
    </thead>
    <tbody>
      {renderLoanHistory()}
    </tbody>
  </table>

  {/* Mobile View (Card Layout) */}
  <div className="sm:hidden">
    {loanHistory.length === 0 ? (
      <p className="text-center py-4 text-gray-500">No loan applications found.</p>
    ) : (
      loanHistory.map((loan) => {
        // Find the plan for the loan
        const plan = plans.find((p) => p.id === loan.plan_id);
        const loanDate = new Date(loan.date);
        const formattedDate = loanDate instanceof Date && !isNaN(loanDate)
          ? loanDate.toLocaleDateString() // Format to the default locale
          : "Not Available"; // Fallback if the date is invalid

        const statusClass = {
          pending: "bg-gray-200 text-yellow-800",
          approved: "bg-gray-200 text-green-800",
          rejected: "bg-red-200 text-red-800",
          completed: "bg-blue-200 text-blue-800",
        }[loan.status] || "bg-gray-200 text-gray-800";

        return (
          <div key={loan.id} className="mb-4 p-4 bg-white shadow-lg rounded-lg border">
            <div className="flex flex-col">
              <div className="mb-2">
                <strong className="text-gray-800">Loan Plan:</strong> {plan ? plan.name : "Unknown Plan"}
              </div>
              <div className="mb-2">
                <strong className="text-gray-800">Amount Requested:</strong> ${loan.amount_requested}
              </div>
              <div className="mb-2">
                <strong className="text-gray-800">Term:</strong> {loan.term} months
              </div>
              <div className="mb-2">
                <strong className="text-gray-800">Status:</strong>{" "}
                <span className={`px-4 py-2 inline-block rounded-full text-sm font-semibold ${statusClass}`}>
                  {loan.status}
                </span>
              </div>
              <div className="mb-2">
                <strong className="text-gray-800">Date:</strong> {formattedDate}
              </div>
            </div>
          </div>
        );
      })
    )}
  </div>
</div>



        {/* Apply Modal */}
        {selectedPlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4">
            <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
              <button
                onClick={() => setSelectedPlan(null)}
                className="absolute top-2 right-2 text-gray-600 text-xl"
              >
                &times;
              </button>
              <h3 className="text-lg font-semibold mb-4">
                Apply for {selectedPlan.name}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Loan Amount</label>
                  <input
                    type="number"
                    value={amount}
                    min={selectedPlan.min_amount}
                    max={selectedPlan.max_amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      setError("");
                    }}
                    className="w-full border rounded px-3 py-2 mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Term (in {selectedPlan.profit_interval})
                  </label>
                  <input
                    type="number"
                    value={term}
                    min={1}
                    onChange={(e) => {
                      setTerm(e.target.value);
                      setError("");
                    }}
                    className="w-full border rounded px-3 py-2 mt-1"
                  />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                {estimatedRepayment && (
                  <p className="text-sm text-green-600">
                    Estimated repayment per {selectedPlan.profit_interval}:{" "}
                    <strong>${estimatedRepayment}</strong>
                  </p>
                )}

                <div className="flex justify-between gap-2">
                  <button
                    onClick={onCalculate}
                    className="flex-1 bg-gray-800 text-white py-2 rounded"
                  >
                    Calculate
                  </button>
                  <button
                    onClick={onApply}
                    className="flex-1 bg-green-600 text-white py-2 rounded"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
