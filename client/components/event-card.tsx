"use client";

import {
  Announcement,
  AnnouncementTag,
  AnnouncementTitle,
} from "@/components/ui/announcement";
import { ArrowUpRightIcon } from "lucide-react";

const Example = () => (
  <div className="flex flex-col w-full h-screen items-center justify-center gap-4">
    <Announcement>
      <AnnouncementTag>Latest update</AnnouncementTag>
      <AnnouncementTitle>
        New feature added
        <ArrowUpRightIcon
          size={16}
          className="shrink-0 text-muted-foreground"
        />
      </AnnouncementTitle>
    </Announcement>
  </div>
);

export { Example };
