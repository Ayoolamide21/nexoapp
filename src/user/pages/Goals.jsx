import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaBullseye, FaPlusCircle  } from "react-icons/fa";

import Header from "../components/Header";
import { getUserGoals } from "/src/api/goalApi"; // updated

import SummaryHeader from "../components/SummaryHeader";
import ActiveGoalsList from "../components/ActiveGoalsList";
import CreateGoalModal from "../components/CreateGoalModal";
import AskChatBox from "../components/AskAi";

const MyGoalsPage = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    const fetchGoals = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getUserGoals();
        setGoals(data);
      } catch (err) {
        setError(err.message || "Failed to fetch your goals.");
        toast.error(err.message || "Failed to fetch your goals.");
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  return (
  <>
    <Header activeLink="My Goals" />

    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <FaBullseye className="text-blue-600" /> My Goals
      </h1>

      {loading && <p>Loading your investment goals...</p>}

      {!loading && error && (
        <p className="text-red-600">Error loading goals: {error}</p>
      )}

      {!loading && !error && goals.length === 0 && (
        <div className="text-center space-y-4">
          <p>You don't have any goals yet. Start by creating one!</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-black hover:bg-gray-700 text-white rounded-md font-semibold shadow-sm transition-colors"
            type="button"
          >
            <FaPlusCircle />
            Create New Goal
          </button>
        </div>
      )}
      <AskChatBox/>
      {!loading && !error && goals.length > 0 && (
        <>
          <SummaryHeader goals={goals} onCreateGoal={() => setShowCreateModal(true)} />
          <ActiveGoalsList goals={goals} />
          </>
      )}

      {/* Modal is always rendered but controlled via isOpen */}
      <CreateGoalModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />
    </div>
  </>
);

};

export default MyGoalsPage;
