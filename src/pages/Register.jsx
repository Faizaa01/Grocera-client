import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import ErrorAlert from "../components/ErrorAlert";
import useAuthContext from "../hooks/useAuthContext";
import bg from "../assets/images/img5.jpeg";

const Register = () => {
  const { registerUser, errorMsg } = useAuthContext();
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    delete data.confirm_password;
    try {
      const response = await registerUser(data);
      console.log(response);
      if (response.success) {
        setSuccessMsg(response.message);
        setTimeout(() => navigate("/login"),3000);
      }
    } catch (error) {
      console.log("Registration failed", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100 p-16">
      <div className="w-full max-w-4xl rounded-xl shadow-lg overflow-hidden flex">
        <div className="w-1/2 overflow-hidden">
          <img
            src={bg}
            alt="Lovebirds Illustration"
            className="w-full h-full object-cover opacity-80"
          />
        </div>

        <div className="w-1/2 flex flex-col justify-center p-8 bg-white/50 backdrop-blur-md border border-white/30 rounded-r-xl">
          <div className="mb-6 text-center">
            <h1 className="font-logo text-3xl mb-2">Register</h1>
            <p className="text-lg text-gray-700">Welcome to Grocera</p>
          </div>

          {errorMsg && <ErrorAlert error={errorMsg} />}
          {successMsg && (
            <div
              role="alert"
              className="alert alert-success flex items-center mb-4 p-3 rounded text-green-700 bg-green-100 bg-opacity-60"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            {/* First Name */}
            <div>
              <label htmlFor="first_name" className="block text-gray-600 mb-1">
                First Name
              </label>
              <input
                id="first_name"
                type="text"
                placeholder="First_name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                {...register("first_name", { required: "First Name is Required" })}
              />
              {errors.first_name && (
                <span className="text-red-500 text-sm">{errors.first_name.message}</span>
              )}
            </div>
            {/* Last Name */}
            <div>
              <label htmlFor="last_name" className="block text-gray-600 mb-1">
                Last Name
              </label>
              <input
                id="last_name"
                type="text"
                placeholder="Last_name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                {...register("last_name", { required: "Last Name is Required" })}
              />
              {errors.last_name && (
                <span className="text-red-500 text-sm">{errors.last_name.message}</span>
              )}
            </div>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-gray-600 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                {...register("email", { required: "Email is Required" })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email.message}</span>
              )}
            </div>
            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-gray-600 mb-1">
                Address
              </label>
              <input
                id="address"
                type="text"
                placeholder="7/A Dhanmondi, Dhaka"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                {...register("address")}
              />
            </div>
            {/* Phone Number */}
            <div>
              <label htmlFor="phone_number" className="block text-gray-600 mb-1">
                Phone Number
              </label>
              <input
                id="phone_number"
                type="text"
                placeholder="0123456789"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                {...register("phone_number")}
              />
            </div>
            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-gray-600 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Password must be at least 8 characters" },
                })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password.message}</span>
              )}
            </div>
            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-gray-600 mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                {...register("confirm_password", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "Password do not match",
                })}
              />
              {errors.confirm_password && (
                <span className="text-red-500 text-sm">{errors.confirm_password.message}</span>
              )}
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 mt-2 rounded-lg bg-emerald-400 hover:bg-emerald-500 text-white font-semibold text-lg transition"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6 flex items-center">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="px-2 text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          <button className="mt-4 w-full flex items-center justify-center py-2 bg-white border rounded-lg shadow hover:bg-gray-50 transition">
            <span className="text-gray-700 ml-2">Sign in with Google</span>
          </button>

          <div className="text-center mt-4">
            <p className="text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-teal-500 font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
