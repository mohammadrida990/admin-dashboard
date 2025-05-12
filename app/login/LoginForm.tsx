"use client";

import React, { useActionState } from "react";
import { authenticate } from "../lib/actions";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/SubmitButton";

const LoginForm = () => {
  const [errorMessage, dispatch] = useActionState(authenticate, undefined);

  return (
    <>
      <form
        action={dispatch}
        className="flex flex-col justify-center items-center w-full gap-5"
      >
        <Input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full"
        />

        <Input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full"
        />

        <SubmitButton style="bg-purple-500 w-full" text="Login" />
      </form>

      <p className="text-red-500">{errorMessage}</p>
    </>
  );
};

export default LoginForm;
