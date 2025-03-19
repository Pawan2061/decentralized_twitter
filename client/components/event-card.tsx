// components/event-card.tsx
"use client";

import {
  Announcement,
  AnnouncementTag,
  AnnouncementTitle,
} from "@/components/ui/announcement";
import { ArrowUpRightIcon } from "lucide-react";

interface EventCardProps {
  event: string;
}

const EventCard = ({ event }: EventCardProps) => (
  <div className="w-full mb-4">
    <Announcement>
      <AnnouncementTag>Latest update</AnnouncementTag>
      <AnnouncementTitle className="flex items-center gap-1">
        {event}
        <ArrowUpRightIcon
          size={16}
          className="shrink-0 text-muted-foreground"
        />
      </AnnouncementTitle>
    </Announcement>
  </div>
);

export { EventCard };
