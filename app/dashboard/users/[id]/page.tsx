import { updateUserDetailsAction } from "@/app/lib/actions";
import { getUserDetails } from "@/app/lib/data";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import React from "react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const UserDetails = async ({ params }: Props) => {
  const { id } = await params;
  const user = await getUserDetails(id);
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-5 w-[100%] ">
      <div className="hidden md:block md:col-span-3 bg-foreground p-5 rounded-lg font-bold text-secondary h-max">
        <div className="relative w-full h-[300px] overflow-hidden mb-5">
          <Image
            src={user?.img || "/assets/no-iamge.png"}
            alt=""
            fill
            priority
            className="object-cover"
          />
        </div>
        {user?.username}
      </div>

      <div className="md:col-span-9 bg-foreground rounded-lg p-5 w-full">
        <form
          action={updateUserDetailsAction}
          className=" flex flex-col w-full "
        >
          <input type="hidden" name="id" value={user?.id} />
          <div className="p-3 my-1 flex flex-col w-full">
            <label>Username</label>
            <Input
              type="text"
              name="username"
              className="w-full"
              placeholder="john-cena"
              defaultValue={user?.username}
            />
          </div>

          <div className="p-3 my-1 flex flex-col">
            <label>Email</label>
            <Input
              type="text"
              name="email"
              placeholder="test@test.com"
              defaultValue={user?.email}
            />
          </div>

          <div className="p-3 my-1 flex flex-col">
            <label>Phone</label>
            <Input
              type="text"
              name="phone"
              placeholder="rida rida"
              defaultValue={user?.phone || ""}
            />
          </div>

          <div className="p-3 my-1 flex flex-col">
            <label>Address</label>
            <Input
              type="text"
              name="address"
              placeholder="lebanon"
              defaultValue={user?.address || ""}
            />
          </div>

          <div className="p-3 my-1 flex flex-col">
            <label>is admin</label>
            <Select
              name="isAdmin"
              aria-required
              defaultValue={user?.isAdmin ? "true" : "false"}
              required
            >
              <SelectTrigger className="w-full p-3">
                <SelectValue placeholder="isAdmin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="p-3 my-1 flex flex-col">
            <label>is active</label>
            <Select
              name="isActive"
              aria-required
              defaultValue={user?.isActive ? "true" : "false"}
              required
            >
              <SelectTrigger className="w-full p-3">
                <SelectValue placeholder="isActive" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <SubmitButton style="w-full p-7" text="Submit" />
        </form>
      </div>
    </div>
  );
};

export default UserDetails;
