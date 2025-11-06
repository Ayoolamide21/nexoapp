export default function PersonalityProfile({ plans = [] }) {
  const goalCount = plans.length;

  return (
    <section className="personality-profile p-4 bg-blue-50 rounded-md">
      <h2 className="text-lg font-semibold mb-2">Personality Profile</h2>
      {goalCount > 0 ? (
        <p>
          You currently have {goalCount} investment goal
          {goalCount !== 1 ? "s" : ""}. Keep up the good work!
        </p>
      ) : (
        <p>You don’t have any investment goals yet. Start one today!</p>
      )}
    </section>
  );
}
