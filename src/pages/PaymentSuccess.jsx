import { useEffect } from "react";
import { Link, useNavigate } from "react-router";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      window.performance.getEntriesByType("navigation")[0]?.type === "reload"
    ) {
      navigate(0);
    }
  }, [navigate]);
  return (
    <div className="text-center py-10">
      <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
      <p>Your deposit has been completed.</p>
      <Link to="/dashboard/deposit" className="text-blue-500 underline mt-4 inline-block">
        Go to Deposit Page
      </Link>
  </div>
  );
};

export default PaymentSuccess;