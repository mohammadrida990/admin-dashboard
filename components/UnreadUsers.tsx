"use client";

import { markAsReadUserAction } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { mutate } from "swr";

export const UnreadUsers = ({
  users,
}: {
  users: { id: number; username: string }[];
}) => {
  const [isPending, startTransition] = useTransition();

  const handleMarkAsRead = (id: number) => {
    startTransition(async () => {
      await markAsReadUserAction(id);
      mutate("/api/new-notification");
    });
  };

  return (
    <ul className="ml-5">
      {users.map((item) => (
        <li
          key={item.id}
          className="mt-5 capitalize flex flex-row justify-center items-center px-5 gap-5"
        >
          <span>{item.username}</span>
          <hr className="flex-1 border-dashed" />
          <Button
            size="sm"
            onClick={() => handleMarkAsRead(item.id)}
            disabled={isPending}
          >
            {isPending ? "Marking..." : "Mark as read"}
          </Button>
        </li>
      ))}
    </ul>
  );
};
