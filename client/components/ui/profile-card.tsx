import React from "react";
import { Bell } from "lucide-react";

const ProfileCard = () => {
  return (
    <div className="bg-white flex items-center justify-between p-4 rounded-lg shadow-sm w-full max-w-md">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200">
          <img
            src="/api/placeholder/48/48"
            alt="Profile avatar"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <h2 className="text-lg font-bold text-gray-800">Kairon</h2>
          <p className="text-gray-500 text-sm">kairon.eth</p>
        </div>
      </div>

      <div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg">
          <Bell size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
