"use client";
import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ text, style }: { text?: string; style: string }) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className={style}>
      {pending ? "Submitting..." : text}
    </Button>
  );
};

export default SubmitButton;
