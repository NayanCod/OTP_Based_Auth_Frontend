import React, { useEffect, useState } from "react";
import { fetchUserProfile } from "../service/api";

const Home = () => {
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await fetchUserProfile();
      if (res?.message === "success") {
        console.log('Profile data:', res.user);
        setProfile(res?.user);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md px-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
          {profile ? (
            <div className="text-center">
              <div className="w-20 h-20 bg-linear-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold text-white">
                  {profile.name?.charAt(0).toUpperCase()}
                </span>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Welcome back!
              </h2>
              <p className="text-2xl font-semibold text-purple-600 mb-6">
                {profile.name}
              </p>

              <div className="bg-purple-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-500 mb-1">Email Address</p>
                <p className="text-gray-800 font-medium">{profile.email}</p>
              </div>

              <button
                className="cursor-pointer w-full bg-linear-to-r from-red-500 to-red-600 text-white font-semibold py-3 rounded-lg hover:from-red-600 hover:to-red-700 focus:ring-4 focus:ring-red-300 transition duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/auth";
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-500 font-medium">Loading profile...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;