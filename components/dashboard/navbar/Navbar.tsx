"use client";

import { usePathname } from "next/navigation";
import React from "react";
import NotificationIcon from "./NotificationIcon";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-row justify-between items-center bg-foreground p-5 rounded-lg">
      <div className="text-secondary font-bold capitalize">
        {pathname.split("/").at(-1)}
      </div>

      <div className="flex justify-center items-center gap-5">
        <NotificationIcon />
      </div>
    </div>
  );
};

export default Navbar;
