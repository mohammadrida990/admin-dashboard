"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { MdSearch } from "react-icons/md";
import { useDebouncedCallback } from "use-debounce";

const Search = ({ placeholder }: { placeholder: string }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const params = new URLSearchParams(searchParams);
      if (e.target.value) {
        if (e.target.value.length > 2) {
          params.set("q", e.target.value);
          router.replace(`${pathname}?${params}`);
        }
      } else {
        params.delete("q");
        router.replace(`${pathname}?${params}`);
      }
    },
    300
  );

  return (
    <div className=" flex flex-row p-3 rounded-lg bg-gray-500 w-fit justify-between items-center gap-2">
      <MdSearch />

      <input
        className="bg-transparent border-none outline-none w-[100px] md:w-[200px]"
        placeholder={placeholder}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
