import { fetchUnread } from "@/app/lib/data";
import { UnReadProducts } from "@/components/UnreadProduct";
import { UnreadUsers } from "@/components/UnreadUsers";
import React from "react";

const page = async () => {
  const { unReadUsers, unReadProducts } = await fetchUnread();

  const isUsers = unReadUsers && unReadUsers.length > 0;
  const isProducts = unReadProducts && unReadProducts.length > 0;

  return (
    <div className="mt-5">
      {!isUsers && !isProducts && (
        <span className="capitalize text-center text-3xl mt-5">
          no notifications
        </span>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2  gap-5">
        {isUsers && (
          <div className="my-5 rounded-xl bg-foreground p-5">
            <p className="text-lg capitalize underline text-center">
              unRead users
            </p>

            <UnreadUsers users={unReadUsers} />
          </div>
        )}

        {isProducts && (
          <div className="my-5 rounded-xl bg-foreground p-5">
            <p className="text-lg capitalize underline text-center">
              unRead products
            </p>

            <UnReadProducts products={unReadProducts} />
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
