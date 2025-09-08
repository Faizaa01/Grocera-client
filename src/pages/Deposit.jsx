import { useState } from "react";
import authApiClient from "../services/auth-api-client";
import useAuthContext from "../hooks/useAuthContext";
import DepositHistory from "../components/Deposite/DepositHistory";

const Deposit = ({ order }) => {
  const { user, setUser } = useAuthContext();
  const [amount, setAmount] = useState(order?.total_price || 0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDeposit = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await authApiClient.post("/payment/initiate/", {
        amount: amount,
        orderId: order?.id,
      });

      if (response.data.payment_url) {
        window.location.href = response.data.payment_url;
      } else {
        alert("Failed to initiate payment");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to initiate payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 text-center">
      <div>
        <h1 className="text-2xl font-bold mb-4">Deposit Money</h1>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          placeholder="Enter amount"
          className="border px-4 py-2 rounded-lg"
          />

        <button
          onClick={handleDeposit}
          disabled={loading}
          className="ml-4 px-4 py-2 bg-neutral-500 text-white rounded-lg hover:bg-gray-500"
          >
          {loading ? "Processing..." : "Deposit"}
        </button>

        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

        <p className="my-4">Current Balance: ${user.balance?.toFixed(2) || 0}</p>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <DepositHistory />
      </div>

    </div>
  );
};

export default Deposit;
