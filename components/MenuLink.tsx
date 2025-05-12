"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MenuLink = ({ item }: { item: any }) => {
  const pathname = usePathname();

  return (
    <Link
      href={item.path}
      key={item.title}
      className={`flex flex-row items-center gap-3 p-3 my-2 hover:bg-gray-500 hover:rounded-lg ${
        pathname === item.path && "bg-gray-500 rounded-lg"
      }`}
    >
      <span>{item.icon}</span>

      <span className="hidden md:block">{item.title}</span>
    </Link>
  );
};

export default MenuLink;
