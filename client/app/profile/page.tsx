"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useAccount } from "wagmi";

const ProfileBanner = () => {
  const { address, isConnected } = useAccount();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className="flex flex-col items-center">
      <div className="relative w-full">
        <div className="w-full h-64 bg-blue-500"></div>

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div className="rounded-full h-24 w-24 bg-black border-4 border-white overflow-hidden"></div>
        </div>
      </div>

      <div className="mt-16 space-y-4 flex flex-col items-center">
        <p className="text-lg font-semibold text-gray-800">
          {isConnected ? address?.slice(0, 5) : "Not Connected"}
        </p>
        <Button
          className="bg-gray-300 text-black hover:bg-gray-200"
          onClick={openModal}
        >
          Edit Profile
        </Button>

        <h1>bio here</h1>
        <div className="space-x-2">
          <Button className="bg-gray-200 text-black hover:bg-gray-100 rounded-lg">
            Add Link
          </Button>
          <Button className="bg-gray-200 text-black hover:bg-gray-100 rounded-lg">
            Add Twitter
          </Button>
        </div>
      </div>

      {/* Profile Edit Modal */}
      {isModalOpen && (
        <div className="absolute inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center z-50  h-full    overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-md mx-4">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold">Edit Profile</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Profile Image Section */}
              <div className="flex flex-col items-center space-y-2">
                <div className="w-24 h-24 bg-black rounded-full"></div>
                <button className="text-blue-500">
                  <svg
                    className="w-5 h-5 inline mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                </button>
              </div>

              {/* Name Field */}
              <div>
                <label className="block text-lg font-medium mb-1">Name</label>
                <p className="text-sm text-blue-500 mb-1">Required</p>
                <p className="text-sm text-gray-500 mb-2">
                  What do you want to be known as?
                </p>
                <input
                  type="text"
                  className="w-full border rounded-lg p-3"
                  defaultValue="pandeh"
                />
              </div>

              {/* Bio Field */}
              <div>
                <label className="block text-lg font-medium mb-1">Bio</label>
                <p className="text-sm text-gray-500 mb-1">Optional</p>
                <p className="text-sm text-gray-500 mb-2">
                  A brief summary of who you are.
                </p>
                <textarea
                  className="w-full border rounded-lg p-3"
                  rows={4}
                  defaultValue="dnedjwndjwd"
                />
              </div>

              {/* External Link Field */}
              <div>
                <label className="block text-lg font-medium mb-1">
                  External Link
                </label>
                <p className="text-sm text-gray-500 mb-1">Optional</p>
                <p className="text-sm text-gray-500 mb-2">
                  Add an external link to your profile.
                </p>
                <input
                  type="text"
                  className="w-full border rounded-lg p-3"
                  placeholder="URL"
                />
              </div>
            </div>

            <div className="p-4 border-t">
              <Button className="w-full bg-blue-500 text-white hover:bg-blue-600">
                Save Settings
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProfileBanner;
