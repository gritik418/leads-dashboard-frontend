"use client";
import { useLoginMutation } from "@/services/authApi";
import userApi from "@/services/userApi";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const Login = () => {
  const [login] = useLoginMutation();
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<LoginData>>({});
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setErrors({});
      setLoading(true);
      const result = await login(loginData).unwrap();

      if (result.message) {
        toast.success(result.message);

        dispatch(userApi.util.invalidateTags(["User"]));
        router.push("/");
      }
    } catch (error: any) {
      if (error?.data?.errors) {
        setErrors(error.data.errors);
      } else if (error?.data?.message) {
        toast.error(error.data.message);
      } else {
        toast.error("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30">
        <div className="p-8 text-center border-b border-gray-100">
          <div className="w-20 h-20 bg-linear-to-r from-indigo-500 to-purple-600 rounded-2xl mx-auto mb-6 shadow-lg flex items-center justify-center">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
            Lead Management
          </h1>
          <p className="text-gray-600">Sign in to your dashboard</p>
        </div>

        <div className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              required
              className="w-full text-black py-3 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
              placeholder="Enter your email"
              value={loginData.email}
              onChange={handleChange}
            />
            {errors?.email && typeof errors.email === "string" ? (
              <span className="mt-0.5 ml-0.5 text-xs font-medium text-red-600 flex items-center gap-1">
                {errors.email}
              </span>
            ) : null}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full text-black px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
                placeholder="Enter your password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>

            {errors?.password && typeof errors.password === "string" ? (
              <span className="mt-0.5 ml-0.5 text-xs font-medium text-red-600 flex items-center gap-1">
                {errors.password}
              </span>
            ) : null}
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full cursor-pointer bg-linear-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold text-lg shadow-lg hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-indigo-500/50 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </div>

        <div className="px-8 pb-8 text-center text-sm text-gray-600">
          <p>
            Don't have an account?{" "}
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
