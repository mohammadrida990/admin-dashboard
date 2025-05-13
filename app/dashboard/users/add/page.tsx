"use client";
import { addUserAction } from "@/app/lib/actions";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React, { useActionState } from "react";

const AddUserPage = () => {
  const [errorMessage, dispatch] = useActionState(addUserAction, undefined);
  const handleSubmit = async (formData: FormData) => {
    await dispatch(formData);
  };

  return (
    <div className="bg-foreground p-5 rounded-lg mt-5 w-full container">
      <p className="text-red-500 text-center mb-5">{errorMessage?.error}</p>
      <form
        action={handleSubmit}
        className="flex flex-col justify-between gap-5 w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-7">
          <Input
            type="text"
            placeholder="Username"
            name="username"
            required
            className="w-full p-7"
            aria-required
          />

          <Input
            type="text"
            placeholder="Email"
            name="email"
            required
            className=" p-7"
            aria-required
          />

          <Input
            type="password"
            placeholder="Password"
            name="password"
            required
            className=" p-7"
            aria-required
          />

          <Input
            type="phone"
            placeholder="Phone"
            name="phone"
            className=" p-7"
            aria-required
            required
          />

          <Select name="isAdmin" aria-required required>
            <SelectTrigger className="w-full p-7">
              <SelectValue placeholder="isAdmin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Yes</SelectItem>
              <SelectItem value="false">No</SelectItem>
            </SelectContent>
          </Select>

          <Select name="isActive" aria-required required>
            <SelectTrigger className="w-full p-7">
              <SelectValue placeholder="isActive" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Yes</SelectItem>
              <SelectItem value="false">No</SelectItem>
            </SelectContent>
          </Select>

          <Textarea
            name="address"
            id="address"
            rows={15}
            placeholder="Address"
            aria-required
            required
            className="p-7 w-full min-h-[150px]"
          />
        </div>

        <SubmitButton style="w-full p-7" text="Submit" />
      </form>
    </div>
  );
};

export default AddUserPage;
