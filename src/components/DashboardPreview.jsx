export default function DashboardPreview() {
  return (
    <section className="bg-blue-50 py-16 px-6 text-center">
      <h3 className="text-2xl font-bold mb-6">All-in-One Crypto Dashboard</h3>
      <p className="text-gray-700 mb-8 max-w-xl mx-auto">Track your investments, manage loans, and monitor your portfolio performance — all in one place.</p>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Total Balance</p>
            <h4 className="text-2xl font-bold">$12,450.00</h4>
          </div>
          <div>
            <p className="text-sm text-gray-500">Crypto Portfolio</p>
            <h4 className="text-xl text-green-600 font-bold">+8.3%</h4>
          </div>
        </div>
      </div>
    </section>
  );
}
