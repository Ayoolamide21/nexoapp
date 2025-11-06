import React, { useState, useEffect } from "react";
import { useBalanceVisibility } from "/src/context/BalanceVisibilityContext";
import { fetchTotalDeposits } from '/src/api/depositApi';

const AccountOverview = ({ user }) => {
  const { showBalance } = useBalanceVisibility();
  const [totalDeposits, setTotalDeposits] = useState(null);
  const [loadingDeposits, setLoadingDeposits] = useState(false);
  
  useEffect(() => {
    const loadTotalDeposits = async () => {
      setLoadingDeposits(true);
      try {
        const data = await fetchTotalDeposits();
        if (data && data.total_deposits != null) {
          setTotalDeposits(data.total_deposits);
        }
      } catch {
         // silently ignore errors
      } finally {
        setLoadingDeposits(false);
      }
    };

    if (user) {
      loadTotalDeposits();
    }
  }, [user]);

  return (
    <div className="mb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-sm font-medium text-gray-500">Earned Points</p>
          <p className="text-2xl font-bold">
            {user ? user.loyalty_points : "Loading..."}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-sm font-medium text-gray-500">Balance</p>
          <p className="text-2xl font-bold">
            {showBalance ? (
              `$${Number(user?.balance).toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}`
            ) : (
              "********"
            )}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-sm font-medium text-gray-500">Earnings</p>
          <p className="text-2xl font-bold">
            {showBalance ? (
              `$${Number(user?.total_earnings).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`
            ) : (
              "********"
            )}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-sm font-medium text-gray-500">Total Deposit</p>
          <p className="text-2xl font-bold">
            {loadingDeposits
              ? "Loading..."
              : totalDeposits != null
              ? `$${Number(totalDeposits).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountOverview;
