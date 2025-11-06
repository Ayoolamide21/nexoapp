export default function ProfitCalculator({ goals = [] }) {
  const activeGoals = goals.filter((goal) => goal.status === "active");
  const estimatedProfit = activeGoals.reduce(
    (sum, goal) => sum + (goal.amount * 0.05 || 0),
    0
  );

  return (
    <section className="profit-calculator p-4 bg-green-50 rounded-md">
      <h2 className="text-lg font-semibold mb-2">Estimated Profit</h2>
      <p>${estimatedProfit.toFixed(2)}</p>
    </section>
  );
}
