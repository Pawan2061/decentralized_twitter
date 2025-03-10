"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useAccount } from "wagmi";
const ProfileBanner = () => {
  const { address, isConnected } = useAccount();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("pandeh");
  const [bio, setBio] = useState("dnedjwndjwd");
  const [externalLink, setExternalLink] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSave = () => {
    closeModal();
  };

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
        <h1 className="text-4xl">{name || "name here"}</h1>

        <Button
          className="bg-gray-300 text-black hover:bg-gray-200"
          onClick={openModal}
        >
          Edit Profile
        </Button>

        <h1>{bio || "bio here"}</h1>
        <div className="space-x-2">
          <Button className="bg-gray-200 text-black hover:bg-gray-100 rounded-lg">
            Add Link
          </Button>
          <Button className="bg-gray-200 text-black hover:bg-gray-100 rounded-lg">
            Add Twitter
          </Button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-gray-800 bg-opacity-75 backdrop-blur-sm"
            onClick={closeModal}
          ></div>

          <div className="bg-white rounded-lg w-full max-w-md mx-4 z-10 shadow-xl max-h-96 overflow-y-auto animate-scale-in">
            <div className="sticky top-0 p-4 border-b flex justify-between items-center bg-white z-20">
              <h2 className="text-xl font-semibold">Edit Profile</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div className="flex flex-col items-center space-y-2">
                <div className="relative group">
                  <div className="w-20 h-20 bg-black rounded-full overflow-hidden">
                    {/* Profile image would go here */}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-black bg-opacity-50 text-white p-2 rounded-full">
                      <svg
                        className="w-4 h-4"
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
                </div>
                <p className="text-sm text-blue-500">Change profile picture</p>
              </div>

              <div>
                <label className="block text-lg font-medium mb-1">Name</label>
                <p className="text-sm text-blue-500 mb-1">Required</p>
                <input
                  type="text"
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-lg font-medium mb-1">Bio</label>
                <p className="text-sm text-gray-500 mb-1">Optional</p>
                <textarea
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-lg font-medium mb-1">
                  External Link
                </label>
                <p className="text-sm text-gray-500 mb-1">Optional</p>
                <input
                  type="text"
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="URL"
                  value={externalLink}
                  onChange={(e) => setExternalLink(e.target.value)}
                />
              </div>
            </div>

            <div className="sticky bottom-0 p-4 border-t bg-white">
              <Button
                className="w-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                onClick={handleSave}
              >
                Save Settings
              </Button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scaleIn 0.2s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default ProfileBanner;
