import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Sidenav from '../templates/Sidenav';
import Topnav from '../templates/Topnav';

const Profile = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    // TODO: Add API call to update user profile
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#1F1E24] flex flex-col lg:flex-row">
      <Sidenav />
      <div className="flex-1 w-full lg:w-[80%] h-full overflow-auto">
        <Topnav />
        
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
              <p className="text-zinc-400">Manage your account settings and preferences</p>
            </div>

            {/* Profile Card */}
            <div className="bg-[#2A2930] rounded-lg p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <h2 className="text-xl font-semibold text-white">Profile Information</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-[#D2042D] hover:bg-[#B8032A] text-white px-4 py-2 rounded-lg transition duration-200"
                  >
                    <i className="ri-edit-line mr-2"></i>
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={handleSave}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-200"
                    >
                      <i className="ri-save-line mr-2"></i>
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-zinc-600 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg transition duration-200"
                    >
                      <i className="ri-close-line mr-2"></i>
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center mb-6 gap-4">
                <div className="w-20 h-20 bg-[#D2042D] rounded-full flex items-center justify-center sm:mr-6">
                  <span className="text-white font-bold text-2xl">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl font-semibold text-white">{user?.name}</h3>
                  <p className="text-zinc-400">{user?.email}</p>
                  <p className="text-sm text-zinc-500">Member since {new Date().getFullYear()}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-zinc-300 text-sm font-medium mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#1F1E24] border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-[#D2042D] transition duration-200"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-[#1F1E24] border border-zinc-600 rounded-lg text-white">
                      {user?.name}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-zinc-300 text-sm font-medium mb-2">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#1F1E24] border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-[#D2042D] transition duration-200"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-[#1F1E24] border border-zinc-600 rounded-lg text-white">
                      {user?.email}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-[#2A2930] rounded-lg p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#D2042D] rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-bookmark-line text-white text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">0</h3>
                    <p className="text-zinc-400">Watchlist Items</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#2A2930] rounded-lg p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#D2042D] rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-heart-line text-white text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">0</h3>
                    <p className="text-zinc-400">Favorites</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#2A2930] rounded-lg p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#D2042D] rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-play-circle-line text-white text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">0</h3>
                    <p className="text-zinc-400">Watched</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className="bg-[#2A2930] rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Account Actions</h2>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                <button className="bg-zinc-600 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg transition duration-200">
                  <i className="ri-lock-line mr-2"></i>
                  Change Password
                </button>
                <button className="bg-zinc-600 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg transition duration-200">
                  <i className="ri-download-line mr-2"></i>
                  Export Data
                </button>
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200"
                >
                  <i className="ri-logout-box-line mr-2"></i>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
