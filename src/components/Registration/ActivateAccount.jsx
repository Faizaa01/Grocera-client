import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import apiClient from "../../services/api-client";
import ErrorAlert from "../ErrorAlert";

const ActivateAccount = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { uid, token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .post("/auth/users/activation/", { uid, token })
      .then(() => {
        setMessage("🎉 Your account has been activated successfully!");
        setTimeout(() => navigate("/login"), 3000);
      })
      .catch((error) => {
        setError("⚠️ Something went wrong. Please check your activation link.");
        console.log(error);
      });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
      <div className="card w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Account Activation
        </h2>

        {message && (
          <div className="alert alert-success rounded-xl shadow-md mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-medium">{message}</span>
          </div>
        )}

        {error && (
          <div className="mt-2">
            <ErrorAlert error={error} />
          </div>
        )}

        {!message && !error && (
          <p className="text-gray-600 text-center mt-4">
            Please wait while we activate your account...
          </p>
        )}
      </div>
    </div>
  );
};

export default ActivateAccount;
