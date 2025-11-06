import React, { useState } from "react";
import { FiLock, FiKey, FiDollarSign } from "react-icons/fi";
import Header from "../components/Header";
import { toast } from "react-toastify";
import SecuritySettings from "../components/SecuritySettings";
import ChangePassword from "../components/ChangePassword";
import WithdrawalHistory from "../components/WithdrawalHistory";
import { makeWithdrawal } from "/src/api/withdrawalApi";

const AccountManagement = () => {
  const [activeTab, setActiveTab] = useState("security");
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [withdrawalMethod, setWithdrawalMethod] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [withdrawalDestination, setWithdrawalDestination] = useState({});

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 sm:px-6 md:px-8">
        {/* Tab Navigation */}
        <div className="flex flex-wrap sm:flex-nowrap space-x-0 sm:space-x-6 border-b pb-4">
          <button
            className={`flex items-center space-x-2 p-2 text-sm font-medium ${
              activeTab === "security"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            } rounded-md transition-all w-full sm:w-auto mb-2 sm:mb-0`}
            onClick={() => setActiveTab("security")}
          >
            <FiLock />
            <span>Security</span>
          </button>

          <button
            className={`flex items-center space-x-2 p-2 text-sm font-medium ${
              activeTab === "password"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            } rounded-md transition-all w-full sm:w-auto mb-2 sm:mb-0`}
            onClick={() => setActiveTab("password")}
          >
            <FiKey />
            <span>Change Password</span>
          </button>

          <button
            className={`flex items-center space-x-2 p-2 text-sm font-medium ${
              activeTab === "withdrawals"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            } rounded-md transition-all w-full sm:w-auto`}
            onClick={() => setActiveTab("withdrawals")}
          >
            <FiDollarSign />
            <span>Withdrawals</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "security" && (
          <div className="space-y-4 transition-all">
            <SecuritySettings />
          </div>
        )}

        {activeTab === "password" && (
  <div className="space-y-4 transition-all">
    <ChangePassword />
  </div>
)}

        {activeTab === "withdrawals" && (
  <div className="space-y-4 transition-all">
  <button
  onClick={() => setShowWithdrawalModal(true)}
  className="bg-black text-white px-4 py-2 rounded hover:bg-gray-900"
>
  Make Withdrawal
</button>
    <h2 className="text-lg font-semibold">Withdrawals</h2>
    <WithdrawalHistory />
  </div>
)}

      </div>
      {showWithdrawalModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
      <button
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-900"
        onClick={() => setShowWithdrawalModal(false)}
      >
        ✕
      </button>
      <h2 className="text-xl font-semibold mb-4">Make a Withdrawal</h2>

      <form
        onSubmit={async (e) => {
  e.preventDefault();
  setSubmitting(true);

  try {
    const token = localStorage.getItem("authToken");
    await makeWithdrawal({
      amount: withdrawalAmount,
      withdrawal_method: withdrawalMethod,
      destination: JSON.stringify(withdrawalDestination),
      token,
    });

    toast.success("Withdrawal request submitted successfully!");

    setWithdrawalAmount("");
    setWithdrawalMethod("");
    setShowWithdrawalModal(false);
  } catch (error) {
    toast.error(error.message || "Withdrawal failed.");
  } finally {
    setSubmitting(false);
  }
}}
        className="space-y-4"
      >
        <div>
          <label className="block mb-1 font-medium" htmlFor="amount">
            Amount ($)
          </label>
          <input
            id="amount"
            type="number"
            min="1"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
{withdrawalMethod === "crypto" && (
  <>
    <div>
      <label className="block mb-1 font-medium" htmlFor="cryptoCurrency">
        Crypto Currency
      </label>
      <select
        id="cryptoCurrency"
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        onChange={(e) =>
          setWithdrawalDestination((prev) => ({
            ...prev,
            currency: e.target.value,
          }))
        }
        required
      >
        <option value="">Select Currency</option>
        <option value="BTC">Bitcoin (BTC)</option>
        <option value="ETH">Ethereum (ETH)</option>
        <option value="USDT">Tether (USDT)</option>
        <option value="SOL">Solana (SOL)</option>
      </select>
    </div>

    <div>
      <label className="block mb-1 font-medium" htmlFor="network">
        Network
      </label>
      <input
        id="network"
        type="text"
        placeholder="e.g., ERC20, TRC20, BEP20"
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        onChange={(e) =>
          setWithdrawalDestination((prev) => ({
            ...prev,
            network: e.target.value,
          }))
        }
        required
      />
    </div>

    <div>
      <label className="block mb-1 font-medium" htmlFor="wallet">
        Wallet Address
      </label>
      <input
        id="wallet"
        type="text"
        placeholder="Enter wallet address"
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        onChange={(e) =>
          setWithdrawalDestination((prev) => ({
            ...prev,
            address: e.target.value,
          }))
        }
        required
      />
    </div>
  </>
)}

{withdrawalMethod === "bank_transfer" && (
  <>
    <div>
      <label className="block mb-1 font-medium" htmlFor="bank_name">
        Bank Name
      </label>
      <input
        id="bank_name"
        type="text"
        placeholder="e.g., JPMorgan Chase"
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        onChange={(e) =>
          setWithdrawalDestination((prev) => ({
            ...prev,
            bankName: e.target.value,
          }))
        }
        required
      />
    </div>

    <div>
      <label className="block mb-1 font-medium" htmlFor="account_number">
        Account Number
      </label>
      <input
        id="account_number"
        type="text"
        placeholder="Your account number"
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        onChange={(e) =>
          setWithdrawalDestination((prev) => ({
            ...prev,
            accountNumber: e.target.value,
          }))
        }
        required
      />
    </div>

    <div>
      <label className="block mb-1 font-medium" htmlFor="swift_code">
        SWIFT/BIC Code
      </label>
      <input
        id="swift_code"
        type="text"
        placeholder="e.g., CHASUS33"
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        onChange={(e) =>
          setWithdrawalDestination((prev) => ({
            ...prev,
            swiftCode: e.target.value,
          }))
        }
        required
      />
    </div>
  </>
)}



        <div>
          <label className="block mb-1 font-medium" htmlFor="method">
            Withdrawal Method
          </label>
          <select
            id="withdrawal_method"
            value={withdrawalMethod}
            onChange={(e) => setWithdrawalMethod(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            required
          >
           <option value="" disabled>Select Method</option>
<option value="bank_transfer">Bank Transfer</option>
<option value="crypto">Crypto Wallet</option>

          </select>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-900 disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  </div>
)}
 </>
  );
};

export default AccountManagement;
