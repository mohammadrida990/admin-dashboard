import React from "react";
import {
  MdDashboard,
  MdReport,
  MdShoppingBag,
  MdSupervisedUserCircle,
} from "react-icons/md";
import Image from "next/image";
import { logout } from "@/app/lib/actions";
import MenuLink from "@/components/MenuLink";
import { auth } from "@/auth";
import LogoutButton from "@/components/LogoutButton";

const data = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Products",
        path: "/dashboard/products",
        icon: <MdShoppingBag />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Reports",
        path: "/dashboard/reports",
        icon: <MdReport />,
      },
    ],
  },
];
const Sidebar = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user }: any = await auth();
  return (
    <div className="top-2.5 sticky transition-all duration-700">
      <div className="flex flex-row gap-5 mb-5 items-center">
        <Image
          src={user?.image?.trim() ? user?.image : "/assets/no-iamge.png"}
          alt=""
          priority
          className="rounded-full object-cover transition-all duration-700 hidden md:block w-[50px] h-[50px]"
          width={50}
          height={50}
        />

        <div className="flex flex-col">
          <span className="capitalize">{user.name}</span>

          <span className="text-xs text-secondary">Admin</span>
        </div>
      </div>

      <ul className="flex flex-col gap-5">
        {data.map((cat, index) => (
          <li key={index} className="flex flex-col gap-4">
            <span className=" transition-all duration-700 text-secondary font-bold text-sm hidden md:block">
              {cat.title}
            </span>

            <div className="">
              {cat.list.map((sub) => (
                <MenuLink key={sub.title} item={sub} />
              ))}
            </div>
          </li>
        ))}
      </ul>

      <form action={logout}>
        <LogoutButton />
      </form>
    </div>
  );
};

export default Sidebar;
