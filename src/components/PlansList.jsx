import React, { useEffect, useState } from "react";
import { plansFront } from "/src/api/frontApi";
import { BsCurrencyBitcoin, BsFillGiftFill} from "react-icons/bs";
import { toast } from "react-toastify";
import { Link } from "react-router-dom"; // Assuming React Router v6

const PlansList = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await plansFront();
        setPlans(data ?? []);
      } catch (err) {
        toast.error("Something went wrong");
        setError(err.message ?? "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading)
    return (
      <p className="text-center py-12 text-gray-500">
        <svg
          className="animate-spin h-8 w-8 mx-auto mb-2 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
        Loading investment plans...
      </p>
    );

  if (error)
    return (
      <p className="text-center py-12 text-red-600 font-semibold">{error}</p>
    );

  return (
    <section id="plans" className="mt-16 max-w-7xl mx-auto px-4">
      {/* Investment Plans from API */}
      <h2 className="flex items-center text-3xl font-bold mb-10 gap-3">
  <BsCurrencyBitcoin className="text-green-600" />
 Choose Your Investment Plan
</h2>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-lg transition cursor-pointer flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{plan.description}</p>
              <p className="text-sm mb-1">
                <strong>Min:</strong> ${parseFloat(plan.min_amount)?.toLocaleString() ?? "-"}
                <br />
                <strong>Max:</strong> ${parseFloat(plan.max_amount)?.toLocaleString() ?? "-"}
              </p>
              {/* <p className="text-sm mb-1">
                <strong>ROI:</strong> {plan.profit_rate ?? "-"}% {plan.profit_interval ?? ""}
              </p> */}
              <p className="text-sm mb-1">
                <strong>Duration:</strong> {plan.duration ?? "-"}
              </p>
              {/* <p className="text-sm mb-1">
                <strong>Category:</strong> {plan.category ?? "-"}
              </p> */}
              {plan.bonus_on_upgrade > 0 && (
  <p className="text-sm text-green-600 flex items-center gap-1">
    <BsFillGiftFill className="text-base" />
    Bonus on upgrade: {plan.bonus_on_upgrade}%
  </p>
)}

              <p className="text-sm text-blue-600">
                Referral Bonus: {plan.referral_bonus ?? 0}%
              </p>
            </div>

            <Link
              to="/login"
              className="mt-5 inline-block text-center w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              aria-label={`Invest Now in ${plan.name}`}
            >
              Invest Now
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlansList;
