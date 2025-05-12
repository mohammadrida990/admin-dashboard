"use client";
import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Rectangle,
} from "recharts";

type Props = {
  monthlyUsers: {
    month: string;
    product_count: number;
    user_count: number;
  }[];
};

const MonthlyUsersChart = ({ monthlyUsers }: Props) => {
  return (
    <div className="flex flex-col">
      <h1 className="my-5">Monthly user and product count </h1>

      <div className="h-[450px]">
        <ResponsiveContainer width="80%" height="90%">
          <BarChart width={100} height={40} data={monthlyUsers}>
            <YAxis />
            <XAxis dataKey="month" />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="user_count"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
            <Bar
              dataKey="product_count"
              fill="#82ca9d"
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyUsersChart;
