export default function Features() {
  const features = [
    {
      title: "Earn Interest",
      desc: "Deposit crypto and earn daily compounding interest.",
    },
    {
      title: "Instant Loans",
      desc: "Borrow cash or stablecoins using your crypto as collateral.",
    },
    {
      title: "Secure Wallet",
      desc: "Store and manage all your assets in a fully secured wallet.",
    },
  ];

  return (
    <section className="py-16 bg-white text-center">
      <h3 className="text-2xl font-bold mb-10">Why Choose Us?</h3>
      <div className="grid md:grid-cols-3 gap-8 px-4 max-w-6xl mx-auto">
        {features.map((f, idx) => (
          <div key={idx} className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-2">{f.title}</h4>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
