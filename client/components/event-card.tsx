"use client";
import { AnnouncementTitle } from "@/components/ui/announcement";

interface EventCardProps {
  event: string;
  colorClass: string;
}

const EventCard = ({ event, colorClass }: EventCardProps) => (
  <div
    className={`w-full max-w-3xl overflow-hidden mx-auto p-4 rounded-xl text-white shadow-md transition-transform transform hover:scale-105 ${colorClass}`}
  >
    <AnnouncementTitle className="text-lg font-semibold text-center">
      {event}
    </AnnouncementTitle>
  </div>
);

export { EventCard };
