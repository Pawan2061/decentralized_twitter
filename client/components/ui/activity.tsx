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
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
        Activities
      </h2>
      <p className="text-gray-600 dark:text-gray-300 text-center">
        Explore all the activities here
      </p>

      {/* Scrollable Container */}
      <div className="mt-6 h-1/2 overflow-y-auto space-y-4 p-2 border rounded-lg shadow-inner bg-gray-100 dark:bg-gray-800">
        {isClient && events.length > 0 ? (
          events.map((event, index) => (
            <EventCard
              key={index}
              event={event}
              colorClass={colorClasses[index % colorClasses.length]}
            />
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center">
            No activities to display
          </p>
        )}
      </div>
      <h1>hi</h1>
    </div>
  );
}
