"use client";
import { redirect } from "next/navigation";
import React from "react";
import { MdSupervisedUserCircle } from "react-icons/md";

type Props = {
  data?: {
    totalCount: number;
    percentage: number;
  };
  text?: string;
  route?: string;
};

const Card = ({ data, text, route }: Props) => {
  return (
    <div className="flex flex-row gap-5 bg-foreground p-5 rounded-lg cursor-pointer w-full hover:bg-gray-500">
      <MdSupervisedUserCircle size={24} />

      <div
        className="flex flex-col gap-3 w-full"
        onClick={() => redirect(`/dashboard/${route}`)}
      >
        <span>{text}</span>
        <span className="font-bold text-md">{data?.totalCount}</span>
        <span className="font-light text-sm">
          {!!data && data?.percentage >= 0 ? (
            <span className="text-lime-500">{data?.percentage}%</span>
          ) : (
            <span className="text-red-500">{data?.percentage}%</span>
          )}
          more then previus week
        </span>
      </div>
    </div>
  );
};

export default Card;
