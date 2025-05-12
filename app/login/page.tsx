import React from "react";
import { signIn } from "@/auth";
import LoginForm from "./LoginForm";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  return (
    <div className=" relative  top-20 bg-foreground p-10 rounded-lg w-[300px] h-[500px] md:w-[500px] md:h-[500px] flex  items-center flex-col mx-auto">
      <h1 className="text-center items-center text-3xl font-bold mb-10">
        Sign in
      </h1>

      <LoginForm />

      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
        className="w-full mt-15"
      >
        <Button className="w-full bg-sky-500 hover:bg-sky-400" type="submit">
          Signin with Google
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
