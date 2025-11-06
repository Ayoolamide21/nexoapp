import React, { useState } from "react";
import { useEffect } from "react";
import { FaClock, FaGift, FaUsers, FaChartLine } from 'react-icons/fa';
import Header from "../components/Header";
import AccountOverview from "../components/AccountOverview";
import ReferralModal from "../components/ReferralModal";
import { toast } from "react-toastify";

import { fetchUserData, resendVerificationEmail as apiResendVerificationEmail } from "/src/api/authApi";
import { getPlans, getCategories } from "/src/api/planApi";
import { investInPlan } from "/src/api/investmentApi";
import OtpVerification from "/src/components/OtpVerify";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
const [showReferralModal, setShowReferralModal] = useState(false);
const [investmentError, setInvestmentError] = useState("");
const [marketPlans, setMarketPlans] = useState([]);
const [selectedCategory, setSelectedCategory] = useState("all");
const [searchQuery, setSearchQuery] = useState("");
const [hideInactive, setHideInactive] = useState(false);
const [categories, setCategories] = useState(["all"]);
const [showModal, setShowModal] = useState(false);
const [selectedPlan, setSelectedPlan] = useState(null);
const [investmentAmount, setInvestmentAmount] = useState("");
const [user, setUser] = useState(null);
const [resendLoading, setResendLoading] = useState(false);
const [showOtpInput, setShowOtpInput] = useState(false);


const filteredPlans = marketPlans.filter((plan) => {
  const matchesCategory =
    selectedCategory === "all" || plan.category === selectedCategory;
  const matchesSearch = plan.name
    .toLowerCase()
    .includes(searchQuery.toLowerCase());
  const matchesActive = !hideInactive || plan.status === "active";
  return matchesCategory && matchesSearch && matchesActive;
});

  useEffect(() => {
  const loadUser = async () => {
    const data = await fetchUserData();
    if (data) setUser(data);
  };
  loadUser();
}, []);

useEffect(() => {
  const fetchAllCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch  {
      // silently ignore errors
    }
  };
  fetchAllCategories();
}, []);

useEffect(() => {
  const fetchPlans = async () => {
    try {
      const data = await getPlans(selectedCategory);
      setMarketPlans(data);
    } catch  {
       // silently ignore errors
    }
  };
  fetchPlans();
}, [selectedCategory]);


// Step completion flags
const emailVerified = user?.email_verified_at != null;
const profile = user?.profile;

const personalInfoComplete = Boolean(
  profile?.first_name &&
  profile?.last_name &&
  profile?.address &&
  profile?.country
);
//const kycVerified = user.kyc_verified;
const steps = [
  { label: "Verify Email", done: emailVerified },
  { label: "Add Personal Info", done: personalInfoComplete },
  //{ label: "Verify Identity", done: kycVerified }
];
const currentStepIndex = steps.findIndex(step => !step.done);
const allStepsComplete = steps.every(step => step.done);
const currentStepLabel = steps[currentStepIndex]?.label;

const ResendVerificationEmail = async () => {
  if (!user?.email) {
    toast.error("User email not available");
    return;
  }
  setResendLoading(true);
  try {
    await apiResendVerificationEmail(user.email);
    toast.success("Verification email resent! Check your inbox for the OTP.");
    setShowOtpInput(true);
  } catch (error) {
    toast.error(error.message || "Error resending verification email");
  } finally {
    setResendLoading(false);
  }
};


 const handleConfirmInvestment = async () => {
  const amount = parseFloat(investmentAmount);

  if (isNaN(amount)) {
    setInvestmentError("Please enter a valid amount.");
    toast.error("Please enter a valid amount.");
    return;
  }

  if (amount < selectedPlan.min_amount || amount > selectedPlan.max_amount) {
    const msg = `Amount must be between $${selectedPlan.min_amount} and $${selectedPlan.max_amount}.`;
    setInvestmentError(msg);
    toast.error(msg);
    return;
  }

  setInvestmentError("");

  try {
    const result = await investInPlan(selectedPlan.id, amount);
    toast.success(result.message || "Investment successful!");

    // Reset modal
    setShowModal(false);
    setSelectedPlan(null);
    setInvestmentAmount("");
  } catch {
     // silently ignore errors
  }
};
  return (
    <>
    
      <Header activeLink="Dashboard" />
    
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Account Setup Progress */}
        {!allStepsComplete && (
  <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
    <div className="flex items-center justify-between">
      <p className="font-medium">Finalise account setup</p>

      {currentStepLabel === "Verify Email" ? (
        <div className="flex items-center space-x-2">
          <button
            className="px-3 py-1 bg-black text-white rounded-lg text-sm"
            onClick={() => {
              window.location.href = "/verify"; // Or your verification instructions page
            }}
          >
            Continue
          </button>
          <button
  onClick={ResendVerificationEmail}
  disabled={resendLoading}
            className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm"
          >
          {resendLoading ? "Resending..." : "Resend Verification Email"}
</button>
          {showOtpInput && (
  <OtpVerification
    email={user.email}
    onVerified={async () => {
      setShowOtpInput(false);
      const updatedUser = await fetchUserData();
      setUser(updatedUser);
      toast.success("Email verified successfully!");
    }}
  />
)}


        </div>
      ) : (
        <button
          className="px-3 py-1 bg-black text-white rounded-lg text-sm"
          onClick={() => {
            window.location.href = "/profile";
          }}
        >
          Add personal information
        </button>
      )}
    </div>

    {/* Visual Progress Bar */}
    <div className="mt-3 flex items-center space-x-4">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`flex-1 h-1 rounded ${step.done ? "bg-green-500" : "bg-gray-200"}`}
        ></div>
      ))}
    </div>

    <p className="mt-2 text-xs text-gray-500">
      Step {currentStepIndex + 1} of {steps.length}: {currentStepLabel}
    </p>
  </div>
)}

        {/* Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-100 rounded-lg p-6 flex flex-col justify-between">
  <div>
    <h3 className="text-lg font-semibold mb-4 text-gray-900">
      Boost Your Savings with Locked Plans
    </h3>

    <p className="text-gray-700 mb-4">
      Lock your plan to earn <strong>daily compound interest</strong> plus extra bonuses. The longer you lock, the higher your rewards!
    </p>

    <ul className="space-y-3 text-gray-700 text-sm">
      <li className="flex items-center">
        <FaClock className="text-indigo-600 mr-2" />
        <span><strong>3 months:</strong> earn an additional 0.29% daily profit</span>
      </li>

      <li className="flex items-center">
        <FaClock className="text-indigo-600 mr-2" />
        <span><strong>6 months:</strong> earn an additional 0.45% daily profit</span>
      </li>

      <li className="flex items-center">
        <FaClock className="text-indigo-600 mr-2" />
        <span><strong>12 months:</strong> earn an additional 0.55% daily profit</span>
      </li>
    </ul>

    <p className="text-gray-600 text-sm mt-3">
      Locking your plan helps maximize your returns and stay disciplined with your savings goals.
    </p>
  </div>

  <NavLink to="/my-portfolio" className="mt-4 px-3 py-1 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition inline-block text-center">
  Lock & Earn
</NavLink>

</div>


          <div className="bg-gray-100 rounded-lg p-6 flex flex-col justify-between shadow-md">
  <div>
    <h3 className="text-lg font-semibold mb-2 text-gray-900">
      Earn Rewards by Referring Friends
    </h3>

    <p className="text-gray-700 mb-4">
      Share up to <span className="font-bold">5,000 loyalty points</span> with each friend you refer.  
      Both you and your friend will benefit when they join and complete their first action.
    </p>
    <ul className="space-y-2 text-gray-700 text-sm">
  <li className="flex items-center">
    <FaGift className="text-indigo-600 mr-2" />
    <span>Points can be redeemed for exclusive perks and rewards</span>
  </li>

  <li className="flex items-center">
    <FaUsers className="text-indigo-600 mr-2" />
    <span>Invite as many friends as you like and keep earning</span>
  </li>

  <li className="flex items-center">
    <FaChartLine className="text-indigo-600 mr-2" />
    <span>Track your referrals and rewards in real-time</span>
  </li>
</ul>
  </div>

  <button
    onClick={() => setShowReferralModal(true)}
    className="mt-4 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition"
  >
    Invite Friends
  </button>

  {showReferralModal && (
    <ReferralModal onClose={() => setShowReferralModal(false)} />
  )}
</div>

        </div>

{/* Account Overview */}
<AccountOverview user={user} />
 {/* Market Highlights */}
      {/* <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <p className="font-semibold">Availablebb Plans</p>
          <a href="#" className="text-sm text-blue-600">See all</a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredPlans.length > 0 ? (
            filteredPlans.map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-sm p-4">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-lg font-bold">{item.price}</p>
                <p
                  className={`text-sm ${
                    item.change?.startsWith("+")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {item.change}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No plans available
            </p>
          )}
        </div>
      </div> */}


        {/* Section Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Available Plans</h2>

          {/* Category Tabs */}
          {categories.map((cat) => (
  <button
    key={cat}
    onClick={() => setSelectedCategory(cat)}
    className={`px-4 py-1 rounded-full border ${
      selectedCategory === cat
        ? "bg-black text-white"
        : "bg-white text-gray-700"
    }`}
  >
    {cat === "all"
      ? "All Plans"
      : typeof cat === "string"
      ? cat.charAt(0).toUpperCase() + cat.slice(1)
      : ""}
  </button>
))}



          {/* Search & Toggle */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-4">
            <label className="flex items-center text-sm space-x-2">
              <input
                type="checkbox"
                checked={hideInactive}
                onChange={() => setHideInactive(!hideInactive)}
              />
              <span>Hide inactive plans</span>
            </label>

            <input
              type="text"
              placeholder="Search plans..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border px-3 py-1 rounded text-sm"
            />
          </div>

          {/* Plans Table */}
          <div className="bg-white shadow-sm rounded-lg overflow-x-auto">
  <table className="min-w-full text-sm hidden md:table">
    <thead className="bg-gray-100 text-gray-700">
      <tr>
        <th className="px-4 py-2 text-left">Name</th>
        <th className="px-4 py-2 text-left">Amount</th>
        <th className="px-4 py-2 text-left">Return Rate</th>
        <th className="px-4 py-2 text-left">Duration</th>
        <th className="px-4 py-2 text-left">Expected Yield</th>
        <th className="px-4 py-2 text-left">Status</th>
        <th className="px-4 py-2 text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      {filteredPlans.map((item, idx) => (
        <tr key={idx} className="border-t hover:bg-gray-50">
          <td className="px-4 py-2">{item.name}</td>
          <td className="px-4 py-2">{item.price}</td>
          <td className="px-4 py-2">{item.change}</td>
          <td className="px-4 py-2">{item.duration}</td>
          <td className="px-4 py-2">{item.expected_yield}</td>
          <td className="px-4 py-2">
            <span className={`text-xs px-2 py-1 rounded-full ${
              item.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
            }`}>
              {item.status === "active" ? "Active" : "Inactive"}
            </span>
          </td>
          <td className="px-4 py-2">
            <button
  disabled={item.status !== "active"}
  className={`text-xs px-3 py-1 rounded ${
    item.status === "active"
      ? "bg-black text-white hover:bg-gray-800"
      : "bg-gray-300 text-gray-600 cursor-not-allowed"
  }`}
  onClick={() => {
    if (item.status === "active") {
      setSelectedPlan(item);
      setInvestmentAmount("");
      setShowModal(true);
    }
  }}
>
  Invest
</button>

          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {/* Mobile View */}
  <div className="md:hidden space-y-4">
    {filteredPlans.map((item, idx) => (
      <div
        key={idx}
        className="border rounded-lg p-4 shadow-sm bg-white"
      >
        <div className="mb-2">
          <span className="font-semibold">Name: </span>
          {item.name}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Amount: </span>
          {item.price}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Return Rate: </span>
          {item.change}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Duration: </span>
          {item.duration}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Expected Yield: </span>
          {item.expected_yield}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Status: </span>
          <span className={`text-xs px-2 py-1 rounded-full ${
            item.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
          }`}>
            {item.status === "active" ? "Active" : "Inactive"}
          </span>
        </div>
        <button
  disabled={item.status !== "active"}
  className={`text-xs px-3 py-1 rounded ${
    item.status === "active"
      ? "bg-black text-white hover:bg-gray-800"
      : "bg-gray-300 text-gray-600 cursor-not-allowed"
  }`}
  onClick={() => {
    if (item.status === "active") {
      setSelectedPlan(item);
      setInvestmentAmount("");
      setShowModal(true);
    }
  }}
>
  Invest
</button>

      </div>
    ))}
  </div>
</div>

        </div>
      </div>
      
      {showModal && selectedPlan && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
      <h2 className="text-lg font-semibold mb-4">
        Invest in {selectedPlan.name}
      </h2>

      <p className="text-sm mb-2 text-gray-600">
        Min: {selectedPlan.price} | Max
      </p>

      <input
        type="number"
        placeholder="Enter amount"
        value={investmentAmount}
        onChange={(e) => setInvestmentAmount(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-4"
      />
{investmentError && (
  <p className="text-red-500 text-sm mt-1">{investmentError}</p>
)}

      <div className="flex justify-end gap-2">
        <button
          className="px-4 py-2 border rounded text-gray-600"
          onClick={() => {
            setShowModal(false);
            setSelectedPlan(null);
          }}
        >
          Cancel
        </button>
        <button
  className="px-4 py-2 bg-black text-white rounded"
  
  onClick={handleConfirmInvestment}
>
  Confirm
</button>

      </div>
    </div>
  </div>
)}

    </>
  );
}

export default Dashboard;
