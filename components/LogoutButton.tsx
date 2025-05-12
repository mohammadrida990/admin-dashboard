"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { CgSpinner } from "react-icons/cg";
import { MdLogout } from "react-icons/md";

const LogoutButton = () => {
  const { pending } = useFormStatus();

  return (
    <button className="cursor-pointer p-3 my-2 items-center text-center flex flex-row gap-3 rounded-sm bg-none border-none w-full hover:bg-gray-500 hover:rounded-lg">
      {pending ? <CgSpinner /> : <MdLogout />}

      <span className="hidden md:block">Logout</span>
    </button>
  );
};

export default LogoutButton;
