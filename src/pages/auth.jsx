import React, { useState } from "react";
import { loginRequestOtp, loginVerifyOtp, signupRequestOtp, signupVerifyOtp } from "../service/api";
// import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginMode, setLoginMode] = useState(true);
  const [loginVerifyMode, setLoginVerifyMode] = useState(false);
  const [signupVerifyMode, setSignupVerifyMode] = useState(false);
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");

//   const navigate = useNavigate();


//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       navigate('/', { replace: true });
//     }
//   }, [navigate]);
    
  const handleLoginRequest = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setLoading(true);
    try {
      const res = await loginRequestOtp(email);
      console.log('login request res', res);
      
      if (res?.message === "OTP sent to email") {
        setLoginVerifyMode(true);
      }
    } catch (error) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!otp) {
      setError("OTP is required");
      setLoading(false);
      return;
    }
    try {
      const res = await loginVerifyOtp(email, otp);
      console.log('login verify res: ', res);
      
      if (res?.message === "Login successful") {
        localStorage.setItem("token", res.token);
        // navigate("/", { replace: true });
        window.location.href = "/";
      }
    } catch (error) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSignupRequest = async (e) => {
    e.preventDefault();
    if (!email || !name) {
      setError("Email and Name are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setLoading(true);
    try {
      const res = await signupRequestOtp(email, name);
      console.log('signup req res: ', res);
      
      if (res?.message === "OTP sent to email") {
        setSignupVerifyMode(true);
      }
    } catch (error) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

   const handleSignupVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!otp) {
      setError("OTP is required");
      setLoading(false);
      return;
    }
    try {
      const res = await signupVerifyOtp(name, email, otp);
      console.log('signup verify res: ', res);
      
      if (res?.message === "Signup successful") {
        localStorage.setItem("token", res.token);
        // navigate("/", { replace: true });
        window.location.href = "/";
      }
    } catch (error) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-0 p-0 min-h-screen flex items-center justify-center bg-linear-to-br from-purple-50 via-purple-100 to-purple-200 overflow-hidden">
      <div className="w-full max-w-md px-6">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-purple-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {loginMode ? "Login" : "Register"}
            </h1>
            <p className="text-gray-500 text-sm">
                {loginMode ? "Welcome back!" : "Create an account"}
            </p>
          </div>

          {/* Form */}
          {loginMode ? (
            <>
              {!loginVerifyMode ? (
                <form onSubmit={handleLoginRequest} className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition duration-200 text-gray-800 placeholder-gray-400"
                    />
                    {error && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {error}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="cursor-pointer w-full bg-linear-to-br from-purple-500 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-purple-600 hover:to-purple-700 focus:ring-4 focus:ring-purple-300 transition duration-200 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Continue
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleLoginVerify} className="space-y-6">
                <p className="text-sm text-gray-600">
                  Please enter the OTP sent to your email address.
                </p>
                  <div>
                    <label
                      htmlFor="otp"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      OTP
                    </label>
                    <input
                      id="otp"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="6-digit code"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition duration-200 text-gray-800 placeholder-gray-400"
                    />
                    {error && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {error}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="cursor-pointer w-full bg-linear-to-br from-purple-500 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-purple-600 hover:to-purple-700 focus:ring-4 focus:ring-purple-300 transition duration-200 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Verifying...
                      </>
                    ) : (
                      <>
                        Submit
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  Don't have an account?{" "}
                  <button
                    onClick={() => setLoginMode(false)}
                    className="cursor-pointer text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Signup
                  </button>
                </p>
              </div>
            </>
          ) : (
            <>
              {!signupVerifyMode ? (
                <form onSubmit={handleSignupRequest} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition duration-200 text-gray-800 placeholder-gray-400"
                    />
                    {error && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {error}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition duration-200 text-gray-800 placeholder-gray-400"
                    />
                    {error && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {error}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="cursor-pointer w-full bg-linear-to-br from-purple-500 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-purple-600 hover:to-purple-700 focus:ring-4 focus:ring-purple-300 transition duration-200 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Continue
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSignupVerify} className="space-y-6">
                <p className="text-sm text-gray-600">
                  Please enter the OTP sent to your email address.
                </p>
                  <div>
                    <label
                      htmlFor="otp"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      OTP
                    </label>
                    <input
                      id="otp"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="6-digit code"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition duration-200 text-gray-800 placeholder-gray-400"
                    />
                    {error && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {error}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="cursor-pointer w-full bg-linear-to-br from-purple-500 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-purple-600 hover:to-purple-700 focus:ring-4 focus:ring-purple-300 transition duration-200 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Verifying...
                      </>
                    ) : (
                      <>
                        Submit
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  Already have an account?{" "}
                  <button
                    onClick={() => setLoginMode(true)}
                    className="cursor-pointer text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Login
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
