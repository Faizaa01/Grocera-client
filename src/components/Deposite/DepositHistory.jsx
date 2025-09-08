import { useEffect, useState } from "react";
import authApiClient from "../../services/auth-api-client";

const DepositHistory = () => {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const response = await authApiClient.get("/deposits/");
        setDeposits(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDeposits();
  }, []);

  if (loading)
  return (
    <div className="flex justify-center items-center py-12">
        <span className="loading loading-infinity loading-xl text-black"></span>
    </div>
  );


  return (
    <div className="max-w-4xl mx-auto p-6 rounded-xl bg-white/40 backdrop-blur-md shadow-lg border border-white/20">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Deposit History
      </h2>

      {deposits.length === 0 ? (
        <p className="text-gray-400 text-center">No deposits yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left text-gray-600">
            <thead>
              <tr className="border-b border-white/30">
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {deposits.map((d) => (
                <tr key={d.id} className="border-b border-white/20 hover:bg-white/10 transition-colors">
                  <td className="px-4 py-2">
                    {new Date(d.created_at).toLocaleString()}
                  </td>
                  <td
                    className={`px-4 py-2 font-medium ${
                      d.amount < 0 ? "text-red-400" : "text-lime-600"
                    }`}
                  >
                    ${d.amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 capitalize">{d.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DepositHistory;
