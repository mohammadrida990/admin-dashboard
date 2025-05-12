import useSWR from "swr";

import React from "react";
import { MdNotifications } from "react-icons/md";

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
    <div className="flex flex-row justify-center items-center gap-5">
      {data?.newUserCount}
      <MdNotifications size={20} />
    </div>
  );
};

export default NotificationIcon;
