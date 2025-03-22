"use client";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { useAccount, useWriteContract, useReadContract } from "wagmi";
import { Loader2, Users } from "lucide-react";
import DecentralizedTwitterABI from "../../../contract/artifacts/contracts/DecentralizedTwitter.sol/DecentralizedTwitter.json";
import { toast } from "sonner";
import { useProfileStore } from "@/store/useProfileStore";
import Landing from "@/components/landing";
import { ColorPicker } from "@/components/ui/color-picker";
import useColorStore from "@/store/use-color";
import useEventStore from "@/store/eventStore";
import { parseGwei } from "viem";
import UserPosts from "@/components/userPosts";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

interface UserProfile {
  id: number;
  user: string;
  name: string;
  premium: boolean;
  bio: string;
}

const ProfileBanner = () => {
  const { address, isConnected } = useAccount();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { writeContract, isPending } = useWriteContract();
  const { setProfile, getProfile } = useProfileStore();
  const { selectedColor } = useColorStore();
  const [followerLength, setFollowerLength] = useState(0);
  const { addEvent } = useEventStore();

  const { data: userProfile, isLoading: isLoadingProfile } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: DecentralizedTwitterABI.abi,
    functionName: "userProfile",
    args: [address],
    query: {
      enabled: !!address,
    },
  });

  const followers =
    useProfileStore.getState().getProfile(`${address}`)?.followers || [];

  const hasExistingProfile =
    userProfile &&
    (userProfile as UserProfile).user !==
      "0x0000000000000000000000000000000000000000";

  useEffect(() => {
    if (address) {
      const storedProfile = getProfile(address);

      if (storedProfile?.followers?.length) {
        setFollowerLength(storedProfile.followers.length);
      }

      if (storedProfile) {
        setName(storedProfile.name);
        setBio(storedProfile.bio);
      } else if (userProfile && hasExistingProfile) {
        const profile = userProfile as UserProfile;
        setName(profile.name);
        setBio(profile.bio);
        setProfile(address, profile);
      }
    }
  }, [address, userProfile, hasExistingProfile, getProfile, setProfile]);

  const profile = getProfile(`0x${address}`);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    setIsLoading(true);
    try {
      writeContract?.({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: DecentralizedTwitterABI.abi,
        functionName: hasExistingProfile ? "updateProfile" : "createProfile",
        args: [name, bio || ""],
        gas: BigInt(2100000),
        gasPrice: parseGwei("3"),
      });

      if (address) {
        setProfile(address, {
          user: address,
          name,
          bio: bio || "",
          premium: hasExistingProfile
            ? (userProfile as UserProfile).premium
            : false,
        });
      }
      if (hasExistingProfile) {
        addEvent(`${address} has updated a profile`);
      } else {
        addEvent(`${address} has created a profile`);
      }

      toast.success(
        hasExistingProfile
          ? "Profile updated successfully!"
          : "Profile created successfully!"
      );
      closeModal();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(
        hasExistingProfile
          ? "Failed to update profile"
          : "Failed to create profile"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-lg text-gray-600">
          Please connect your wallet to view and edit your profile
        </p>
      </div>
    );
  }

  if (isLoadingProfile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="mt-2 text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center">
      <div className="relative w-full">
        <div
          className="w-full h-64"
          style={{
            background: `linear-gradient(to right, ${selectedColor}, ${selectedColor})`,
          }}
        ></div>

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div
            className="rounded-full h-24 w-24 border-4 border-white overflow-hidden flex items-center justify-center text-white text-2xl"
            style={{ backgroundColor: selectedColor }}
          >
            {address ? address.slice(0, 2) : "?"}
          </div>
        </div>
      </div>

      <div className="mt-16 space-y-4 flex flex-col items-center">
        <ColorPicker />

        <div className="flex items-center gap-4">
          <div className="text-sm font-mono text-gray-600">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </div>

          <div
            className="flex items-center gap-1 px-3 py-1 rounded-full text-white shadow-md transition-transform hover:scale-105"
            style={{ backgroundColor: selectedColor }}
          >
            <Users className="h-4 w-4" />
            <span className="font-medium">{followers.length || 0}</span>
            <span className="text-sm">followers</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold">{name || "No name set"}</h1>
        <p className="text-gray-600">{bio || "No bio yet"}</p>

        <Button
          className="bg-[#007AFF] hover:bg-[#0056b3] text-white"
          onClick={openModal}
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {hasExistingProfile ? "Updating..." : "Creating..."}
            </>
          ) : hasExistingProfile ? (
            "Edit Profile"
          ) : (
            "Create Profile"
          )}
        </Button>
      </div>
      <UserPosts />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-gray-800 bg-opacity-75 backdrop-blur-sm"
            onClick={closeModal}
          ></div>

          <div className="bg-white rounded-lg w-full max-w-md mx-4 z-10 shadow-xl max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="sticky top-0 p-4 border-b flex justify-between items-center bg-white z-20">
              <h2 className="text-xl font-semibold">
                {hasExistingProfile ? "Edit Profile" : "Create Profile"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-lg font-medium mb-1">Name</label>
                <p className="text-sm text-blue-500 mb-1">Required</p>
                <input
                  type="text"
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-lg font-medium mb-1">Bio</label>
                <p className="text-sm text-gray-500 mb-1">Optional</p>
                <textarea
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself"
                />
              </div>
            </div>

            <div className="sticky bottom-0 p-4 border-t bg-white">
              <Button
                className="w-full bg-[#007AFF] hover:bg-[#0056b3] text-white transition-colors"
                onClick={handleSave}
                disabled={isLoading || isPending}
              >
                {isLoading || isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {hasExistingProfile ? "Updating..." : "Creating..."}
                  </>
                ) : hasExistingProfile ? (
                  "Save Changes"
                ) : (
                  "Create Profile"
                )}
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
