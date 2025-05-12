import { fetchMonthlyUserProduct, fetchProductCat } from "@/app/lib/data";
import MonthlyUsersChart from "@/components/dashboard/Reports/MonthlyUsersChart";
import ProductChart from "@/components/dashboard/Reports/ProductChart";
import React from "react";

const ReportsPage = async () => {
  const monthlyUsers = await fetchMonthlyUserProduct();
  const productCat = await fetchProductCat();
  return (
    <div className="flex flex-col">
      <MonthlyUsersChart monthlyUsers={monthlyUsers} />

      <ProductChart productCat={productCat} />
    </div>
  );
};

export default ReportsPage;
