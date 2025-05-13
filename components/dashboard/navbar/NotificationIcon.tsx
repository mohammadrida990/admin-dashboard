import useSWR from "swr";

import React from "react";
import { MdNotifications } from "react-icons/md";
import Link from "next/link";

const fetchNotificationCount = async () => {
  const res = await fetch("/api/new-notification");
  if (!res.ok) {
    throw new Error("Failed to fetch new notifications");
  }
  return res.json();
};

const NotificationIcon = () => {
  const { data } = useSWR("/api/new-notification", fetchNotificationCount);
  return (
    <Link
      href="/dashboard/notifications"
      className="flex flex-row justify-center items-center gap-5 relative cursor-pointer"
    >
      <span
        className="
          absolute -top-2 -right-1 bg-red-500  rounded-full
          min-h-4 min-w-4 text-center flex justify-center items-center
          text-[10px]
        "
      >
        {data?.newCount}
      </span>

      <MdNotifications size={20} />
    </Link>
  );
};

export default NotificationIcon;
