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

  return (
    <div className="w-full p-4 md:flex-1 lg:flex-2">
      <h1 className="text-xl md:text-2xl font-bold">Activities</h1>
      <h2 className="text-md md:text-lg font-extralight mb-4">
        Explore all the activities here
      </h2>

      <div className="bg-gray-200 shadow-xl rounded-xl w-full min-h-64 p-6 mt-4">
        {isClient && events.length > 0 ? (
          <div className="flex flex-col overflow-y-auto max-h-96">
            {events.map((event, index) => (
              <EventCard key={`event-${index}`} event={event} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-48 text-gray-500">
            No activities to display
          </div>
        )}
      </div>
    </div>
  );
}
