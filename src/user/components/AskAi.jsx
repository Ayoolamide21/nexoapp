import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaQuestionCircle, FaMoneyBillWave, FaCalculator, FaChartBar} from "react-icons/fa";
import { askAI, createAIGoal, previewPlans } from "/src/api/goalApi";


const AIChatBox = () => {
  const [aiResponse, setAiResponse] = useState("");
  const [history, setHistory] = useState([]);
  const [step, setStep] = useState(0);
  const [recommendedPlans, setRecommendedPlans] = useState([]);
  const [bestPlan, setBestPlan] = useState(null);
  const [goalData, setGoalData] = useState({
    name: "",
    target_amount: "",
    target_frequency: "",
    target_date: "",
  });
  const [loading, setLoading] = useState(false);

  const options = [
    "Save for a goal",
    "Check my balance",
    //"Investment plans",
   // "View my goals",
  ];

  // Helper to convert response to string safely
  const extractMessage = (response) => {
    if (!response) return "";
    if (typeof response === "string") return response;
    if (typeof response === "object") {
      // If response has nested 'response' key, use it
      if ("response" in response && typeof response.response === "string") {
        return response.response;
      }
      // Otherwise, JSON stringify fallback
      return JSON.stringify(response);
    }
    return String(response);
  };

  const handleOptionSelection = (option) => {
    setHistory([...history, { user: option }]);
    if (option === "Save for a goal") {
      askGoalName();
    } else {
      handleConversation(option);
    }
  };

  const handleConversation = async (option) => {
    try {
      setLoading(true);
      const result = await askAI(option);

      // Use extractMessage to safely get string from response
      const message = extractMessage(result?.response) || "I didn’t get a valid response.";

      setAiResponse(message);
      setHistory((prev) => [...prev, { user: option, ai: message }]);
    } catch {
      setAiResponse("Sorry, something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Step-by-step handlers
  const askGoalName = () => {
    setAiResponse("What would you like to name your goal? (e.g., Vacation)");
    setStep(1);
  };

  const handleGoalName = (name) => {
    setGoalData((prev) => ({ ...prev, name }));
    setAiResponse("How much would you like to save?");
    setStep(2);
  };

  const handleGoalAmount = (amount) => {
    setGoalData((prev) => ({ ...prev, target_amount: amount }));
    setAiResponse("What is your target profit interval? (e.g., Daily, Weekly, Monthly)");
    setStep(3);
  };

  const handleGoalDuration = (duration) => {
    setGoalData((prev) => ({ ...prev, target_frequency: duration }));
    setAiResponse("What is your target date? (e.g., 2025-12-31)");
    setStep(4);
  };

  const handleGoalDate = async (date) => {
  setGoalData((prev) => ({ ...prev, target_date: date }));
  await previewPlansForGoal();
};
const handlePlanSelection = (selectedPlan) => {
  toast.success(`You selected the ${selectedPlan.name} plan!`);

  // Optionally store the selected plan in state
  setBestPlan(selectedPlan);

  // You could also auto-confirm the goal or move to a confirmation step
  setStep(6); // new step for final confirmation
  setAiResponse(`You've selected the ${selectedPlan.name} plan. Ready to save your goal?`);
};


  const previewPlansForGoal = async () => {
  setLoading(true);
  setStep(5); // move to confirmation step
  setAiResponse("Analyzing your goal and suggesting plans...");

  const payload = {
    name: goalData.name,
    target_amount: goalData.target_amount,
    target_frequency: goalData.target_frequency || "Daily",
    target_date: goalData.target_date,
  };

  try {
    const result = await previewPlans(payload);
    const plans = result?.recommended_plans || [];
    const bestPlan = result?.best_plan || null;

setAiResponse(result?.message || "Here are some plans to help you reach your goal:");
setRecommendedPlans(plans);
setBestPlan(bestPlan);

   let aiReply = "";

if (plans.length === 0) {
  aiReply = "No matching plans found for your goal, your balance is insufficient.";
} else {
  aiReply = result?.message || "Here are some plans to help you reach your goal:";
}

    setAiResponse(aiReply);
    setHistory((prev) => [...prev, { user: "Preview plans", ai: aiReply }]);
  } catch {
    setAiResponse("There was an error while suggesting plans.");
  } finally {
    setLoading(false);
  }
};

const confirmAndSaveGoal = async () => {
 setLoading(true);
  setAiResponse("Saving your goal...");

  const payload = {
    ...goalData,
    achieved_amount: 0,
    plan_id: bestPlan?.id,
  };

  try {
    const result = await createAIGoal(payload);
    const confirmation = extractMessage(result?.message) || "Goal saved.";
    setAiResponse(confirmation);
    setHistory((prev) => [...prev, { user: "Confirm goal", ai: confirmation }]);
    setStep(0); // reset to options
  } catch {
    setAiResponse("There was an error while saving your goal.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="ai-chat-box p-6 max-w-6xl mx-auto space-y-4">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <FaQuestionCircle className="text-blue-600" /> How can I help you today?
      </h2>

      {/* AI Response */}
      <div className="bg-gray-100 p-4 rounded-md">
        <p>{aiResponse}</p>
      </div>
{recommendedPlans.length > 0 && (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
    {recommendedPlans.map((plan, index) => {
      const isBest = bestPlan?.name === plan.name;
      return (
        <div
          key={index}
          className={`border rounded-lg p-4 shadow-sm ${
            isBest ? "border-yellow-500 bg-yellow-50" : "border-gray-200 bg-white"
          }`}
        >
          {isBest && (
            <span className="inline-block bg-yellow-400 text-white text-xs px-2 py-1 rounded-full mb-2">
              Recommended
            </span>
          )}
          <h3 className="text-lg font-semibold text-blue-700">{plan.name}</h3>
          <p className="text-sm text-gray-600 flex items-center gap-2">
  <FaMoneyBillWave className="text-green-600" />
  Invest between <strong>${plan.min_amount}</strong> and <strong>${plan.max_amount}</strong> per unit
</p>
<p className="text-sm text-gray-600 flex items-center gap-2">
  <FaCalculator className="text-blue-600" />
  Units needed: <strong>{plan.min_units} – {plan.max_units}</strong>
</p>
<p className="text-sm text-gray-600 flex items-center gap-2">
  <FaChartBar className="text-purple-600" />
  Total cost: <strong>${plan.min_total} – ${plan.max_total}</strong>
</p>

          <button
  className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
  onClick={() => handlePlanSelection(plan)}
>
  Choose This Plan
</button>
        </div>
      );
    })}
  </div>
)}

      {/* Step 0: Options */}
      {step === 0 && (
        <div className="options space-y-2">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelection(option)}
              className="w-full text-left text-blue-600 hover:text-blue-800"
            >
              <p className="p-2 rounded-md hover:bg-blue-50">{option}</p>
            </button>
          ))}
        </div>
      )}

      {/* Steps 1–4 */}
      {step === 1 && (
        <input
          type="text"
          placeholder="Enter goal name"
          onBlur={(e) => handleGoalName(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
      )}
      {step === 2 && (
        <input
          type="number"
          placeholder="Enter amount"
          onBlur={(e) => handleGoalAmount(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
      )}
      {step === 3 && (
        <select
          onChange={(e) => handleGoalDuration(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select frequency</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      )}
      {step === 4 && (
        <div>
          <input
            type="date"
            value={goalData.target_date}
            onChange={(e) =>
              setGoalData((prev) => ({ ...prev, target_date: e.target.value }))
            }
            onBlur={() => handleGoalDate(goalData.target_date)}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
      )}
{step === 5 && (
  <button
    onClick={confirmAndSaveGoal}
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
  >
    Confirm & Save Goal
  </button>
)}
{step === 6 && (
  <div className="flex gap-4">
    <button
      onClick={confirmAndSaveGoal}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Confirm & Save Goal
    </button>
    <button
      onClick={() => setStep(5)}
      className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
    >
      Go Back
    </button>
  </div>
)}

      {loading && (
        <div className="loader border-t-2 border-b-2 border-blue-600 rounded-full w-5 h-5 animate-spin"></div>
      )}

      {/* Display Summary of Goal Data */}
      {goalData.name && (
        <div className="bg-green-50 p-4 rounded-md mt-4">
          <p>
            <strong>Goal:</strong> {goalData.name}
          </p>
          <p>
            <strong>Amount:</strong> ${goalData.target_amount}
          </p>
          <p>
            <strong>Profit:</strong> {goalData.target_frequency}
          </p>
          <p>
            <strong>Target Date:</strong> {goalData.target_date}
          </p>
        </div>
      )}

      {/* Chat History */}
      <div className="conversation-history space-y-4 mt-6">
        {history.map((entry, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-md shadow-md">
            <p className="text-sm font-semibold text-blue-700">You:</p>
            <p className="text-gray-800">{entry.user}</p>
            <p className="text-sm font-semibold text-blue-700 mt-2">AI:</p>
            <p className="text-gray-600">{entry.ai}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIChatBox;
