import Card from "@/components/dashboard/card/Card";
import Chart from "@/components/dashboard/chart/chart";
import React from "react";
import {
  fetchTotalProducts,
  fetchTotalUsers,
  fetchWeeklyRecap,
} from "../lib/data";

const Dashboard = async () => {
  const users = await fetchTotalUsers();
  const products = await fetchTotalProducts();
  const weeklyRecap = await fetchWeeklyRecap();
  return (
    <div className="gap-5 mt-5 w-full">
      <div className="flex flex-col w-full gap-5">
        <div className="grid md:grid-cols-3 gris-cols-1 gap-5 w-full">
          <Card data={users} text="Total users" route="users" />

          <Card data={products} text="Total products" route="products" />

          <Card data={users} text="Total users" route="users" />
        </div>

        <div>
          <Chart data={weeklyRecap} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
