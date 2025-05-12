import Navbar from "@/components/dashboard/navbar/Navbar";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import React, { PropsWithChildren } from "react";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex  h-screen ">
      <div className="p-5 bg-foreground ">
        <Sidebar />
      </div>

      <div className="w-full p-5">
        <Navbar />

        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
