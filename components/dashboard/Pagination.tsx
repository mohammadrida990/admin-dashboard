"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Pagination = ({ count }: { count: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);
  const ITEM_PER_PAGE = 4;
  const page = searchParams.get("page") || "1";

  const hasPrev = ITEM_PER_PAGE * (parseInt(page) - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (parseInt(page) - 1) + ITEM_PER_PAGE < count;

  const handle = (type: string) => {
    if (type === "prev") {
      params.set("page", (parseInt(page) - 1).toString());
      router.replace(`${pathname}?${params}`);
    } else {
      params.set("page", (parseInt(page) + 1).toString());
      router.replace(`${pathname}?${params}`);
    }
  };

  return (
    <div className="flex justify-between items-center mt-5">
      <button
        disabled={!hasPrev}
        onClick={() => handle("prev")}
        className={` p-2 rounded-lg ${
          !hasPrev ? "bg-gray-400" : "bg-purple-500"
        }`}
      >
        Previous
      </button>

      <button
        onClick={() => handle("next")}
        disabled={!hasNext}
        className={` p-2 rounded-lg ${!hasNext ? "bg-gray-400" : "bg-sky-500"}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
