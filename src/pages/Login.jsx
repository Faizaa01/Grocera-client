import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuthContext from "../hooks/useAuthContext";
import ErrorAlert from "../components/ErrorAlert";
import { useState } from "react";
import bg from "../assets/images/bg4.jpeg";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { errorMsg, loginUser } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await loginUser(data);
      if (response.success) navigate("/");
    } catch (error) {
      console.log("Login Failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 opacity-80"
      style={{backgroundImage: `url(${bg})`}}
    >
      <div className="backdrop-blur-md bg-white/30 rounded-xl max-w-md w-full p-8 shadow-lg border border-white">
        <h2 className="text-3xl font-bold mb-6 text-center drop-shadow-lg">
          Login
        </h2>

        {errorMsg && <ErrorAlert error={errorMsg} />}

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              className={`w-full rounded-md px-4 py-2 focus:outline-none ${
                errors.email ? "border-gray-500 border-2" : "border border-white/50"
              } bg-white/70`}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-gray-900 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className={`w-full rounded-md px-4 py-2 focus:outline-none ${
                errors.password ? "border-gray-500 border-2" : "border border-white/50"
              } bg-white/70`}
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-gray-900 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full hover:bg-orange-300 hover:text-white bg-yellow-200 text-gray-500 bg-opacity-80 hover:bg-opacity-100 font-bold py-2 rounded-md drop-shadow-md transition duration-300 disabled:opacity-70"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-500 text-center drop-shadow">
          Don't have an account?{" "}
          <Link to="/register" className="underline hover:text-gray-200">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
