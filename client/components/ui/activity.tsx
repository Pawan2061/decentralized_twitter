"use client";
import useEventStore from "@/store/eventStore";
import { EventCard } from "@/components/event-card";
import { useEffect, useState } from "react";

export default function Activity() {
  const [isClient, setIsClient] = useState(false);
  const { events } = useEventStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const colorClasses = [
    "bg-gradient-to-r from-purple-300 to-pink-400",
    "bg-gradient-to-r from-blue-300 to-indigo-400",
    "bg-gradient-to-r from-green-300 to-teal-400",
    "bg-gradient-to-r from-red-300 to-orange-400",
    "bg-gradient-to-r from-yellow-300 to-amber-400",
  ];

  return (
    <div className="p-3 sm:p-4 md:p-6 w-full rounded-lg shadow-sm bg-white dark:bg-gray-900">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center">
        Activities
      </h2>
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 text-center mb-4">
        Explore all the activities here
      </p>

      <div className="mt-4 h-72 sm:h-80 md:h-96 overflow-y-auto space-y-3 md:space-y-4 p-2 border rounded-lg shadow-inner bg-gray-100 dark:bg-gray-800">
        {isClient && events.length > 0 ? (
          events.map((event, index) => (
            <EventCard
              key={index}
              event={event}
              colorClass={colorClasses[index % colorClasses.length]}
            />
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 dark:text-gray-400 text-center">
              No activities to display
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
